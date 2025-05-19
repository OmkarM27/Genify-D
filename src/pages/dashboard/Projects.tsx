import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectCard from "../../components/ui/ProjectCard";
import NewProjectModal from "../../components/ui/NewProjectModal";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
  try {
    const res = await axios.get("/api/projects");
    console.log("🚀 projects response", res.data); // Add this
    setProjects(res.data);
  } catch (err) {
    console.error("Failed to load projects", err);
  } finally {
    setIsLoading(false);
  }
};
    fetchProjects();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const filteredProjects = projects.filter(
    (project) =>
      (selectedStatus ? project.status === selectedStatus : true) &&
      (selectedBrand ? project.brand.name === selectedBrand : true)
  );

  const handleCreateProject = (newProject: any) => {
    const project = {
      id: `project-${Date.now()}`,
      progress: 0,
      tokensUsed: 0,
      tokensLimit: 5000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...newProject,
      description: newProject.goal || "",
      brand: {
        name: newProject.brand,
        color: "#9333ea",
      },
      team: [],
      tasks: [],
      aiContent: [],
    };
    setProjects((prev) => [project, ...prev]);
  };

  if (isLoading) return <p className="p-6">Loading projects...</p>;
  if (projects.length === 0) return <p className="p-6">No projects found.</p>;

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 text-sm">
            View and manage your current projects.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          + New Project
        </button>
      </div>

      {/* Filter Section */}
      <div className="bg-[#1e1e2f] p-4 rounded-xl shadow-sm flex flex-wrap items-center gap-6">
        <div>
          <label className="block text-xs text-gray-400 mb-1">
            Filter by Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#2a2a40] text-white border border-gray-600 rounded-md px-4 py-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="">All Statuses</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">
            Filter by Brand
          </label>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="bg-[#2a2a40] text-white border border-gray-600 rounded-md px-4 py-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="">All Brands</option>
            {[...new Set(projects.map((p) => p.brand.name))].map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Project List or Empty State */}
      {filteredProjects.length === 0 ? (
        <div className="text-center text-gray-500 pt-20">
          <p className="text-lg">No projects match your filters.</p>
          <p className="text-sm mt-2 text-gray-400">
            Try adjusting your filters or create a new project.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {/* Modal for Creating New Projects */}
      <NewProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </div>
  );
};

export default Projects;
