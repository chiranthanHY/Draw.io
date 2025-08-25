import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from ".";
import cookieParser from "cookie-parser";

interface authRequest extends Request {
    user?: {
        id: string;
        nfl: string;
    };
}

export function authenticator(req: Request, res: Response, next: NextFunction) {
    const authreq = req as authRequest;

    // Check cookie or header
    let token = req.cookies['__uIt'] || req.headers['authorization'];
    if (typeof token === "string" && token.startsWith("Bearer ")) {
        token = token.slice(7);
    }

    console.log("Token received:", token);

    if (!token) {
        return res.status(401).json({ message: "Unauthenticated! please sign-in again!" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET!) as JwtPayload;
        if (!decoded.userId) throw new Error("Invalid token payload");

        authreq.user = { id: decoded.userId, nfl: decoded.nfl };
        next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        return res.status(401).json({ message: "User is unauthenticated! please sign-in again!" });
    }
}
