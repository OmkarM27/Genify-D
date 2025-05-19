import React from "react";
import { FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const progressPercentage = project.progress || 0;

  return (
    <Link to={`/projects/${project.id}`} className="block hover:no-underline">
      <div className="bg-white rounded-xl border border-gray-200 shadow-md p-5 hover:shadow-xl transition">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {project.title}
            </h2>
            <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium inline-block mt-1">
              {project.brand?.name || "No Brand"}
            </span>
          </div>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
              project.status === "Done"
                ? "bg-green-100 text-green-700"
                : project.status === "In Progress"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {project.status}
          </span>
        </div>

        {/* Progress */}
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1">Progress</p>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-violet-600 transition-all rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 text-right">
            {progressPercentage}%
          </p>
        </div>

        {/* Tokens */}
        <div className="text-xs text-gray-600 mb-3">
          Tokens Used:{" "}
          <span className="text-violet-600 font-medium">
            {project.tokensUsed} / {project.tokensLimit}
          </span>
        </div>

        {/* Contributors */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex -space-x-2 overflow-hidden">
            {project.team?.slice(0, 3).map((member) => (
              <img
                key={member.id}
                src={member.avatarUrl}
                alt={member.name}
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            ))}
            {project.team?.length > 3 && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                +{project.team.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <FiClock className="w-4 h-4" />
            <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
