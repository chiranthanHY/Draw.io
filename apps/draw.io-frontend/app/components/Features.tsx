import React from 'react';
import { Palette, Users, Download, Zap, Shield, Globe } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Palette,
      title: 'Intuitive Design',
      description: 'Create beautiful diagrams with our easy-to-use tools and templates.',
      color: 'text-pink-500'
    },
    {
      icon: Users,
      title: 'Real-time Collaboration',
      description: 'Work together with your team in real-time, anywhere in the world.',
      color: 'text-blue-500'
    },
    {
      icon: Download,
      title: 'Export Anywhere',
      description: 'Export your diagrams in multiple formats: PNG, SVG, PDF, and more.',
      color: 'text-green-500'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance ensures smooth drawing experience.',
      color: 'text-yellow-500'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data stays private. We never store your diagrams on our servers.',
      color: 'text-red-500'
    },
    {
      icon: Globe,
      title: 'Works Everywhere',
      description: 'Access Draw.io from any browser, any device, any operating system.',
      color: 'text-indigo-500'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Everything you need to
          <span className="text-indigo-600"> create</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Powerful features that make diagramming simple, collaborative, and fun.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
          >
            <div className={`${feature.color} mb-4`}>
              <feature.icon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Stats section */}
      <div className="mt-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-12 text-center">
        <h3 className="text-3xl font-bold text-white mb-8">
          Trusted by creators worldwide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-4xl font-bold text-white mb-2">2M+</div>
            <div className="text-indigo-200">Active users</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">50M+</div>
            <div className="text-indigo-200">Diagrams created</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">150+</div>
            <div className="text-indigo-200">Countries</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;