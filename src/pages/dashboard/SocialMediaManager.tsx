import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook } from 'lucide-react';

const useCases = [
  {
    title: 'Instagram Post',
    description: 'Generate captions and creative for Instagram feed, reels, or stories.',
    link: '/tools/instagram-post',
    icon: Instagram,
  },
  {
    title: 'LinkedIn Update',
    description: 'Craft professional posts with a business-friendly tone and CTA.',
    link: '/tools/linkedin-post',
    icon: Linkedin,
  },
  {
    title: 'Facebook Campaign',
    description: 'Create social-first content for updates, offers, or branded messages.',
    link: '/tools/facebook-post',
    icon: Facebook,
  },
];

const SocialMediaManager: React.FC = () => {
  const [subtitleVisible, setSubtitleVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSubtitleVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0B0B0D] text-white p-6 md:p-10 font-[Inter] overflow-hidden">
      <style>{`
        .smm-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(180, 0, 255, 0.08), transparent 60%),
                      radial-gradient(circle at 60% 70%, rgba(255, 255, 255, 0.04), transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        .sparkle::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle, rgba(255,255,255,0.15), transparent 60%);
          border-radius: 0.5rem;
          animation: sparkle 4s ease-in-out infinite;
          pointer-events: none;
        }
      `}</style>

      <div
        className="absolute inset-0 smm-bg"
        onMouseMove={(e) => {
          document.documentElement.style.setProperty('--x', `${e.clientX}px`);
          document.documentElement.style.setProperty('--y', `${e.clientY}px`);
        }}
      />

      {/* Header */}
      <div className="relative z-10 mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent relative sparkle">
          Social Media Manager
        </h1>
        {subtitleVisible && (
          <p className="text-sm text-gray-400 mt-2">
            Choose a use case to start planning, writing, and launching social media content.
          </p>
        )}
      </div>

      {/* Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {useCases.map(({ title, description, link, icon: Icon }, index) => (
          <div
            key={index}
            className="group bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-md hover:shadow-purple-500/30 transition-all transform hover:scale-[1.015] relative"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-inner">
                <Icon size={24} className="text-white" />
              </div>
              <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            <p className="text-sm text-gray-400 mb-6">{description}</p>
            <Link
              to={link}
              className="w-full block text-center py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-medium transition hover:brightness-110 hover:shadow-md group-hover:animate-pulse"
            >
              Launch
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaManager;
