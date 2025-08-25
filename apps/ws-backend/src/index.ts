import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}

const users: User[] = [];

// Shape type (rect, ellipse, line, pencil, text, cursor, grab)
type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
      color: string;
      strokeWidth: number;
      bgColor: string;
      lineDashX: number;
      lineDashY: number;
    }
  | {
      type: "elip";
      centerX: number;
      centerY: number;
      radiusX: number;
      radiusY: number;
      color: string;
      strokeWidth: number;
      bgColor: string;
      lineDashX: number;
      lineDashY: number;
    }
  | {
      type: "line";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      color: string;
      strokeWidth: number;
      lineDashX: number;
      lineDashY: number;
    }
  | {
      type: "pencil";
      pencilCoords: Array<{ x: number; y: number }>;
      color: string;
      strokeWidth: number;
      lineDashX: number;
      lineDashY: number;
    }
  | {
      type: "text";
      x: number;
      y: number;
      content: string;
      color: string;
      strokeWidth: number;
      fontSize: number;
    }
  | { type: "cursor" }
  | { type: "grab" };

// --------- Sanitization helpers ----------
function sanitizeNumber(num: number, min = -10000, max = 10000) {
  if (typeof num !== "number" || isNaN(num)) return 0;
  return Math.max(min, Math.min(max, num));
}

function sanitizeString(str: string, maxLength = 500) {
  if (typeof str !== "string") return "";
  return str.replace(/[<>]/g, "").slice(0, maxLength).trim();
}

function sanitizeShape(shape: Shape): Shape | null {
  if (!shape) return null;

  const strokeLimit = { min: 0, max: 50 };
  const sizeLimit = { min: 0, max: 5000 };
  const coordLimit = { min: -10000, max: 10000 };
  const fontSizeLimit = { min: 8, max: 200 };

  switch (shape.type) {
    case "rect":
      return {
        ...shape,
        x: sanitizeNumber(shape.x, coordLimit.min, coordLimit.max),
        y: sanitizeNumber(shape.y, coordLimit.min, coordLimit.max),
        width: sanitizeNumber(shape.width, sizeLimit.min, sizeLimit.max),
        height: sanitizeNumber(shape.height, sizeLimit.min, sizeLimit.max),
        strokeWidth: sanitizeNumber(
          shape.strokeWidth,
          strokeLimit.min,
          strokeLimit.max
        ),
      };
    case "elip":
      return {
        ...shape,
        centerX: sanitizeNumber(shape.centerX, coordLimit.min, coordLimit.max),
        centerY: sanitizeNumber(shape.centerY, coordLimit.min, coordLimit.max),
        radiusX: sanitizeNumber(shape.radiusX, sizeLimit.min, sizeLimit.max),
        radiusY: sanitizeNumber(shape.radiusY, sizeLimit.min, sizeLimit.max),
      };
    case "line":
      return {
        ...shape,
        startX: sanitizeNumber(shape.startX, coordLimit.min, coordLimit.max),
        startY: sanitizeNumber(shape.startY, coordLimit.min, coordLimit.max),
        endX: sanitizeNumber(shape.endX, coordLimit.min, coordLimit.max),
        endY: sanitizeNumber(shape.endY, coordLimit.min, coordLimit.max),
      };
    case "pencil":
      if (!Array.isArray(shape.pencilCoords)) return null;
      return {
        ...shape,
        pencilCoords: shape.pencilCoords.slice(0, 1000).map((p) => ({
          x: sanitizeNumber(p.x, coordLimit.min, coordLimit.max),
          y: sanitizeNumber(p.y, coordLimit.min, coordLimit.max),
        })),
      };
    case "text":
      return {
        ...shape,
        x: sanitizeNumber(shape.x, coordLimit.min, coordLimit.max),
        y: sanitizeNumber(shape.y, coordLimit.min, coordLimit.max),
        content: sanitizeString(shape.content, 200),
        fontSize: sanitizeNumber(
          shape.fontSize,
          fontSizeLimit.min,
          fontSizeLimit.max
        ),
      };
    case "cursor":
      return { type: "cursor" };
    case "grab":
      return { type: "grab" };
    default:
      return null;
  }
}

// --------- JWT User Check ----------
function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string" || !decoded || !("userId" in decoded)) {
      return null;
    }
    return (decoded as JwtPayload).userId;
  } catch (e) {
    return null;
  }
}

wss.on("connection", (ws, request) => {
  const url = request.url;
  if (!url) return;

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";
  const userId = checkUser(token);

  if (!userId) {
    ws.close(1008, "Invalid Token");
    return;
  }

  users.push({ userId, rooms: [], ws });

  ws.on("message", async (raw) => {
    let parsedData: any;
    try {
      parsedData =
        typeof raw === "string" ? JSON.parse(raw) : JSON.parse(raw.toString());
    } catch {
      ws.send(JSON.stringify({ type: "error", message: "Invalid JSON" }));
      return;
    }

    if (parsedData.type === "join_room") {
      const user = users.find((u) => u.ws === ws);
      user?.rooms.push(parsedData.roomId);
      return;
    }

    if (parsedData.type === "leave_room") {
      const user = users.find((u) => u.ws === ws);
      if (user) {
        user.rooms = user.rooms.filter((r) => r !== parsedData.roomId);
      }
      return;
    }

    if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;
      const message: Shape = parsedData.message;

      const sanitizedMessage = sanitizeShape(message);
      if (!sanitizedMessage) {
        ws.send(JSON.stringify({ type: "error", message: "Invalid shape" }));
        return;
      }

      // Save to DB
      const chatRecord = await prismaClient.chat.create({
        data: {
          roomId: Number(roomId),
          message: JSON.stringify(sanitizedMessage),
          userId,
        },
      });

      // Broadcast sanitized shape to room
      users.forEach((u) => {
        if (u.rooms.includes(roomId)) {
          u.ws.send(
            JSON.stringify({
              type: "chat",
              message: sanitizedMessage,
              roomId,
              userId,
              chatId: chatRecord.id,
            })
          );
        }
      });
    }
  });
});
