import React, { useEffect, useState } from 'react';
import { PenSquare, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const tools = [
  {
    title: 'Blog Creator',
    description: 'Craft long-form blog posts tailored for SEO and audience engagement.',
    icon: PenSquare,
    link: '/tools/blog-creator',
  },
  {
    title: 'Article Generator',
    description: 'Generate short, sharp articles with AI-powered precision and clarity.',
    icon: FileText,
    link: '/tools/article-generator',
  },
];

const ContentStudio: React.FC = () => {
  const [subtitleVisible, setSubtitleVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSubtitleVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0B0B0D] text-white font-[Inter] p-6 md:p-10 overflow-hidden">
      {/* Background animation */}
      <style>{`
        .studio-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 40%, rgba(128,0,255,0.07), transparent 60%),
                      radial-gradient(circle at 70% 60%, rgba(0,128,255,0.05), transparent 70%);
          animation: floatBg 60s ease-in-out infinite alternate;
          z-index: 0;
          opacity: 0.08;
        }

        @keyframes floatBg {
          0% { transform: translate(0, 0); }
          50% { transform: translate(20px, -10px); }
          100% { transform: translate(-15px, 15px); }
        }

        .glow-ai {
          position: relative;
          display: inline-block;
        }
        .glow-ai::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border-radius: 0.25rem;
          background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%);
          animation: glowPulse 3s infinite;
          pointer-events: none;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
      <div className="absolute inset-0 studio-bg pointer-events-none z-0" />

      {/* Header */}
      <div className="relative z-10 mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
          Content Studio
        </h1>
        {subtitleVisible && (
          <p className="text-sm text-gray-400 mt-2 animate-fadeIn">
            Create and manage your <span className="glow-ai">AI</span>-powered content with precision.
          </p>
        )}
      </div>

      {/* Grid of Cards */}
      <motion.div
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
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
            className="glass-card p-6 rounded-2xl shadow-xl transition transform hover:scale-[1.015] hover:shadow-purple-500/30 bg-white/5 backdrop-blur-xl border border-white/10"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-500 p-3 rounded-xl">
                <tool.icon size={28} className="text-white" />
              </div>
              <h2 className="text-xl font-semibold">{tool.title}</h2>
            </div>
            <p className="text-sm text-gray-400 mb-6">{tool.description}</p>
            <Link
              to={tool.link}
              className="w-full block text-center py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full font-medium transition hover:shadow-md hover:brightness-110"
            >
              Start Writing
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ContentStudio;
