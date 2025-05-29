import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Calendar, RefreshCcw, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const mockProjects = [
  {
    id: "1",
    name: "Launch Campaign",
    tone: "Confident",
    createdAt: new Date("2024-12-10"),
    updatedAt: new Date("2025-05-27"),
    items: 14,
  },
  {
    id: "2",
    name: "Tech Blog Series",
    tone: "Informative",
    createdAt: new Date("2024-11-15"),
    updatedAt: new Date("2025-05-15"),
    items: 22,
  },
  {
    id: "3",
    name: "Newsletter Roundup",
    tone: "Casual",
    createdAt: new Date("2025-01-20"),
    updatedAt: new Date("2025-05-25"),
    items: 9,
  },
  {
    id: "4",
    name: "Product Hunt Launch",
    tone: "Bold",
    createdAt: new Date("2024-10-10"),
    updatedAt: new Date("2025-05-18"),
    items: 6,
  },
];

const toneColors: Record<string, string> = {
  Confident: "text-green-400",
  Casual: "text-yellow-300",
  Informative: "text-blue-400",
  Bold: "text-pink-400",
};

const Projects: React.FC = () => {
  return (
    <div className="pt-10 pb-24 px-6 lg:px-12 max-w-[1600px] mx-auto w-full font-[Inter]">
      {/* Header with button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Your Projects</h1>
          <p className="text-sm text-gray-400 mt-1">Manage and continue where you left off.</p>
        </div>
        <Link
          to="/projects/new"
          className="px-6 py-2.5 bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-md hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
        >
          + New Project
        </Link>
      </div>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-8">
        {mockProjects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-md hover:shadow-purple-500/20 min-h-[340px] flex flex-col justify-between transition-all"
          >
            <div className="space-y-3 text-left">
              <h2 className="text-xl font-bold text-white">{project.name}</h2>
              <p className={`text-sm font-medium ${toneColors[project.tone] || "text-purple-300"}`}>
                {project.tone}
              </p>
              <div className="space-y-1 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  Created: {formatDistanceToNow(project.createdAt)} ago
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCcw size={14} />
                  Updated: {formatDistanceToNow(project.updatedAt)} ago
                </div>
              </div>
              <div className="flex items-center gap-2 text-purple-300 text-sm font-medium pt-1">
                <MessageCircle size={16} />
                {project.items} AI-generated item{project.items !== 1 && "s"}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <Link
                to={`/projects/${project.id}`}
                className="flex-1 text-sm bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded-full text-white text-center font-medium shadow hover:shadow-purple-500/20"
              >
                Continue
              </Link>
              <Link
                to={`/projects/${project.id}`}
                className="flex-1 text-sm bg-white/10 hover:bg-white/20 text-purple-300 hover:text-white transition px-4 py-2 rounded-full text-center font-medium"
              >
                Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Embedded Styles */}
      <style>
        {`
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-thumb {
            background: rgba(168, 85, 247, 0.2);
            border-radius: 9999px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(168, 85, 247, 0.3);
          }
          ::-webkit-scrollbar-track {
            background: transparent;
          }
        `}
      </style>
    </div>
  );
};

export default Projects;
