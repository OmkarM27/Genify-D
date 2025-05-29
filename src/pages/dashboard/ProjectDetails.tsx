import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const mockProjectDetails = {
  id: "1",
  name: "Launch Campaign",
  description: "This project handles our Q2 launch sequence across email, blog, and socials.",
  status: "Active",
  createdAt: new Date("2024-12-10"),
  updatedAt: new Date("2025-05-27"),
  content: [
    {
      id: "c1",
      type: "Email",
      tone: "Confident",
      audience: "Cold leads",
      date: "2025-05-15",
    },
    {
      id: "c2",
      type: "Blog",
      tone: "Professional",
      audience: "Tech readers",
      date: "2025-05-10",
    },
  ],
};

const ProjectDetails: React.FC = () => {
  const { id } = useParams();

  const project = mockProjectDetails;

  return (
    <div className="ml-[260px] px-10 pt-10 pb-24 max-w-[calc(100%-280px)] w-full text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-black/30 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl px-8 py-10"
      >
        {/* Overview */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <p className="text-sm text-gray-400 mt-1">{project.description}</p>
          <div className="flex items-center gap-6 mt-4 text-sm text-gray-400">
            <span>Status: <strong className="text-white">{project.status}</strong></span>
            <span>Created: {project.createdAt.toLocaleDateString()}</span>
            <span>Updated: {project.updatedAt.toLocaleDateString()}</span>
          </div>
        </div>

        {/* Content History */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Generated Content</h2>
          <div className="space-y-4">
            {project.content.map((item) => (
              <div
                key={item.id}
                className="p-4 border border-white/10 rounded-xl bg-white/5 backdrop-blur-md flex flex-col sm:flex-row justify-between items-start sm:items-center"
              >
                <div>
                  <h3 className="text-md font-medium">{item.type}</h3>
                  <p className="text-sm text-gray-400">Tone: {item.tone} • Audience: {item.audience}</p>
                </div>
                <div className="flex gap-3 mt-2 sm:mt-0">
                  <button className="text-sm text-purple-400 hover:underline">View</button>
                  <button className="text-sm text-purple-400 hover:underline">Copy</button>
                  <button className="text-sm text-purple-400 hover:underline">Export</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kanban & Team (optional, future) */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Tasks (Coming Soon)</h2>
          <div className="p-6 bg-white/5 rounded-xl text-sm text-gray-400">Kanban task board placeholder.</div>
        </div>

        {/* Analytics */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Analytics</h2>
          <div className="p-6 bg-white/5 rounded-xl text-sm text-gray-400">
            Total Items: {project.content.length} • Word count and token usage (coming soon)
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
