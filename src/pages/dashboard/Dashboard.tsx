import React, { useEffect, useState } from "react";
import {
  Sparkles,
  Lock,
  SendHorizonal,
  Edit3,
  Calendar,
  BarChart2,
} from "lucide-react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Content Studio",
    description: "Manage AI tools for articles, blogs, and posts.",
    icon: <Edit3 size={20} />,
    cta: "+ Generate Content",
    link: "/hub/content-studio",
    locked: false,
  },
  {
    title: "Engagement Hub",
    description: "Plan and run outreach or campaigns.",
    icon: <Calendar size={20} />,
    cta: "+ Launch Campaign",
    link: "/hub/engagement",
    locked: false,
  },
  {
    title: "SEO & Blogs",
    description: "Optimize content with SEO workflows.",
    icon: <BarChart2 size={20} />,
    cta: "Coming Soon",
    locked: true,
  },
];

const suggestions = [
  "Write a blog",
  "Schedule post",
  "Create email",
  "Generate LinkedIn update",
];

const Dashboard: React.FC = () => {
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSubtitle(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const usecaseItems = [
    { title: "Blog Creator", path: "/usecases/blog", icon: "📝" },
    { title: "Article Generator", path: "/usecases/article", icon: "📄" },
    { title: "Email Campaign", path: "/usecases/email", icon: "📧" },
    { title: "Outreach Manager", path: "/usecases/outreach", icon: "📣" },
    { title: "Instagram Post", path: "/usecases/instagram", icon: "📸" },
    { title: "LinkedIn Post", path: "/usecases/linkedin", icon: "🔗" },
    { title: "YouTube Script", path: "/usecases/youtube", icon: "🎥" },
    { title: "One-Liner Generator", path: "/usecases/one-liner", icon: "💡" },
  ];

  return (
    <div className="relative min-h-screen bg-[#0B0B0D] text-white p-6 md:p-10 font-[Inter] overflow-hidden">
      <style>{`
        .dashboard-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at bottom right, rgba(120,0,255,0.05), rgba(0,0,0,0.95));
          z-index: 0;
          pointer-events: none;
        }

        .type-underline {
          animation: blink 1s step-start infinite;
          font-weight: 700;
          margin-left: 0.2rem;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }

        .top-shimmer::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 5px;
          width: 100%;
          background: linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent);
          animation: shimmer 15s infinite linear;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .glass-chip {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          color: #ccc;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          transition: all 0.3s ease;
        }

        .glass-chip:hover {
          transform: scale(1.05);
          box-shadow: 0 0 10px rgba(168,85,247,0.2);
          background: rgba(255,255,255,0.15);
        }
      `}</style>

      <div className="absolute inset-0 dashboard-bg pointer-events-none z-0" />

      {/* Top Shimmer */}
      <div className="top-shimmer absolute inset-x-0 top-0 h-[5px] z-10" />

      {/* Hero Section */}
      <div className="relative z-10 mb-10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent inline-block tracking-wide">
          Hey Tarun<span className="type-underline">|</span>
        </h1>
        {showSubtitle && (
          <p className="text-sm text-gray-400 mt-1">
            How can I help you today?
          </p>
        )}

        <div className="mt-6 max-w-xl relative">
          <input
            type="text"
            placeholder="Ask Genify anything…"
            className="w-full px-4 py-3 rounded-xl backdrop-blur-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 shadow-inner focus:ring-2 focus:ring-purple-600"
          />
          <button className="absolute right-3 top-2.5 p-2 rounded-full bg-purple-600 hover:scale-110 hover:shadow-[0_0_10px_2px_rgba(168,85,247,0.5)] transition-all duration-150">
            <SendHorizonal size={16} />
          </button>
        </div>

        <div className="flex flex-wrap mt-4 gap-2">
          {suggestions.map((sug, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-chip"
            >
              {sug}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories.map(
          ({ title, description, icon, cta, link, locked }, idx) => (
            <div
              key={idx}
              className={clsx(
                "group p-6 rounded-2xl backdrop-blur-xl transition transform hover:scale-[1.015]",
                locked
                  ? "bg-white/5 border border-white/10 opacity-50 blur-sm cursor-not-allowed"
                  : "bg-white/5 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
              )}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white group-hover:shadow-[0_0_10px_rgba(168,85,247,0.4)] transition">
                  {locked ? (
                    <Lock size={20} title="Launching in June — stay tuned." />
                  ) : (
                    icon
                  )}
                </div>
                <h2 className="text-lg font-semibold">{title}</h2>
              </div>
              <p className="text-sm text-gray-400 mb-4">{description}</p>

              {locked ? (
                <div className="text-sm text-gray-400">Coming Soon</div>
              ) : (
                <Link
                  to={link}
                  className="block w-full text-center py-2 bg-white/10 hover:bg-purple-600/60 backdrop-blur-md text-white rounded-full font-medium transition"
                >
                  {cta}
                </Link>
              )}
            </div>
          )
        )}
      </div>

      {/* Usecases Section */}
      <div className="mt-14">
        <motion.h2
  className="text-xl font-semibold mb-6 flex justify-between items-center"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <span className="flex items-center">
    Usecases<span className="ml-2 text-purple-500 animate-pulse">●</span>
  </span>
  <button
    onClick={() => setIsModalOpen(true)}
    className="text-sm bg-white/10 hover:bg-purple-600/60 px-3 py-1.5 rounded-full backdrop-blur-md text-purple-300 hover:text-white transition font-medium"
  >
    Show All
  </button>
</motion.h2>

        

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {[
            {
              title: "Instagram Post",
              description:
                "Create short-form content with hashtags and engaging tone.",
              icon: "📸",
              action: "Write Now",
            },
            {
              title: "Email Pitch",
              description: "Generate personalized outreach messages for leads.",
              icon: "✉️",
              action: "Write Now",
            },
            {
              title: "LinkedIn Update",
              description:
                "Craft a business post with CTA to boost engagement.",
              icon: "🔗",
              action: "Preview",
            },
          ].map((usecase, i) => (
            <motion.div
              key={i}
              className="p-5 rounded-2xl border border-white/10 bg-[#111] hover:bg-[#151515] transition shadow-lg relative"
              whileHover={{ scale: 1.015 }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-lg bg-gradient-to-br from-purple-500 to-indigo-500 p-2 px-3 rounded-full shadow-sm">
                  {usecase.icon}
                </div>
                <h3 className="text-md font-semibold">{usecase.title}</h3>
              </div>
              <p className="text-sm text-gray-400">{usecase.description}</p>
              <button className="absolute bottom-4 right-4 text-sm text-purple-400 hover:text-purple-300 hover:underline transition">
                {usecase.action}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[rgba(20,20,30,0.8)] backdrop-blur-xl rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto relative shadow-xl"
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setIsModalOpen(false)}
            >
              <span className="text-lg">×</span>
            </button>
            <h3 className="text-xl font-semibold mb-4 text-white">
              All Usecases
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {usecaseItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  className="flex items-center gap-3 p-4 bg-white/10 hover:bg-purple-600/20 rounded-xl transition transform hover:scale-[1.02] text-white"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.title}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      )}
      {isModalOpen && (
  <div
    className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
    onClick={() => setIsModalOpen(false)}
  >
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      onClick={(e) => e.stopPropagation()}
      className="bg-[rgba(20,20,30,0.8)] backdrop-blur-xl rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto relative shadow-xl"
    >
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        onClick={() => setIsModalOpen(false)}
      >
        ✕
      </button>
      <h3 className="text-xl font-semibold mb-4 text-white">
        All Usecases
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {usecaseItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className="flex items-center gap-3 p-4 bg-white/10 hover:bg-purple-600/20 rounded-xl transition transform hover:scale-[1.02] text-white"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.title}</span>
          </Link>
        ))}
      </div>
    </motion.div>
  </div>
)}

    </div>
  );
};

export default Dashboard;
