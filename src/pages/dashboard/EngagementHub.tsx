import React, { useEffect, useState } from 'react';
import { Send, Users, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const tools = [
  {
    title: 'Email Campaigns',
    description: 'Launch and track targeted email campaigns with ease.',
    icon: Send,
    link: '/tools/email-campaign-generator',
  },
  {
    title: 'Outreach Manager',
    description: 'Manage customer engagement and automate outreach workflows.',
    icon: Users,
    link: '/tools/outreach-manager',
  },
  {
    title: 'Social Media Manager',
    description: 'Plan, schedule, and publish posts across multiple platforms.',
    icon: MessageCircle,
    link: '/hub/social-media',
  },
];

const EngagementHub: React.FC = () => {
  const [subtitleVisible, setSubtitleVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSubtitleVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0B0B0D] text-white p-6 md:p-10 font-[Inter] overflow-hidden">
      {/* Scoped ambient background */}
      <style>{`
        .hub-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 40% 50%, rgba(128,0,255,0.08), transparent 60%),
                      radial-gradient(circle at 70% 60%, rgba(0,128,255,0.04), transparent 70%);
          animation: floatHub 60s ease-in-out infinite alternate;
          z-index: 0;
        }

        @keyframes floatHub {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-15px, 10px); }
          100% { transform: translate(15px, -5px); }
        }

        .hover-underline:hover::after {
          content: '';
          display: block;
          width: 100%;
          height: 2px;
          background: linear-gradient(to right, #7f5af0, #5c6ac4);
          animation: glowPulse 2s infinite;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.5 }
          50% { opacity: 1 }
        }

        .glow-border {
          border: 1px solid transparent;
          background-clip: padding-box;
          position: relative;
        }

        .glow-border::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(to right, rgba(128,0,255,0.3), rgba(0,128,255,0.2));
          -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
      `}</style>

      <div className="absolute inset-0 hub-bg pointer-events-none z-0" />

      {/* Header */}
      <div className="relative z-10 mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-violet-500 bg-clip-text text-transparent hover-underline inline-block transition">
          Engagement Hub
        </h1>
        {subtitleVisible && (
          <p className="text-sm text-gray-400 mt-2 animate-fadeIn">
            Run, manage, and optimize your outreach campaigns.
          </p>
        )}
      </div>

      {/* Tool Cards */}
      <motion.div
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            className="relative p-6 rounded-2xl glow-border bg-white/5 backdrop-blur-xl shadow-md hover:shadow-purple-500/30 transition-all transform hover:scale-[1.015]"
            whileTap={{ scale: 0.98 }}
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-500 p-3 rounded-full shadow-inner">
                <tool.icon size={26} className="text-white" />
              </div>
              <h2 className="text-xl font-semibold">{tool.title}</h2>
            </div>
            <p className="text-gray-400 text-sm mb-6">{tool.description}</p>
            <Link
              to={tool.link}
              className="w-full block text-center py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full font-medium transition hover:shadow-md hover:brightness-110"
            >
              Launch
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default EngagementHub;
