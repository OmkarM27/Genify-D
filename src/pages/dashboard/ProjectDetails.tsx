import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

import { FiEdit, FiShare2, FiDownload } from "react-icons/fi";
import EditProjectModal from "../../components/ui/EditProjectModal";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [projectData, setProjectData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`/api/projects/${id}`);
        setProjectData(res.data);
      } catch (err) {
        console.error("Failed to load project", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const tabs = [
    "Overview",
    "Tasks",
    "AI Content",
    "Chat",
    "Files",
    "Team",
    "Settings",
  ];
  const [activeTab, setActiveTab] = useState("Overview");
  if (isLoading) {
    return <div className="p-6">Loading project...</div>;
  }

  if (!projectData) {
    return <div className="p-6 text-red-500">Project not found.</div>;
  }

  const [isEditOpen, setIsEditOpen] = useState(false);
  

  

  return (
    <div className="bg-[#f9fafc] min-h-screen text-gray-900 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">{projectData.title}</h1>
            <span className="inline-block mt-2 bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1 rounded-full">
              {projectData.brand.name}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditOpen(true)}
              className="px-4 py-2 text-sm font-medium border rounded-lg hover:bg-gray-100"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => alert("Exporting as PDF...")}
              className="px-4 py-2 text-sm font-medium bg-white text-gray-800 rounded-lg hover:bg-gray-100 border"
            >
              📄 Export PDF
            </button>
            <button
              onClick={() => alert("Exporting as ZIP...")}
              className="px-4 py-2 text-sm font-medium bg-white text-gray-800 rounded-lg hover:bg-gray-100 border"
            >
              📁 Export ZIP
            </button>
          </div>
        </div>

        {/* Sticky Tabs */}
        <div className="sticky top-[64px] z-30 backdrop-blur-lg bg-white/90 border-b border-gray-200 shadow-md rounded-t-lg">
          <nav className="flex space-x-6 px-4 pt-4 pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm font-semibold transition-all border-b-2 ${
                  activeTab === tab
                    ? "border-violet-600 text-violet-600 shadow-sm"
                    : "border-transparent text-gray-500 hover:text-violet-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        {activeTab === "Overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-6">
              <section className="bg-white rounded-xl shadow-lg border p-6 transition hover:shadow-xl">
                <h2 className="text-lg font-semibold mb-2">Project Metadata</h2>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>
                    <strong className="font-medium text-gray-800">
                      Client / Brand:
                    </strong>{" "}
                    <span className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                      {projectData.brand.name}
                    </span>
                  </li>
                  <li>
                    <strong className="font-medium text-gray-800">
                      Status:
                    </strong>{" "}
                    <span className="inline-block px-2 py-0.5 text-xs rounded-full font-semibold bg-gray-200 text-gray-700">
                      {projectData.status}
                    </span>
                  </li>
                  <li>
                    <strong className="font-medium text-gray-800">
                      Goal / Objective:
                    </strong>
                    <p className="mt-1 text-gray-500">
                      {project.description || "Not specified"}
                    </p>
                  </li>
                  <li className="text-xs text-gray-400 pt-2">
                    Created: {projectData.created} | Last updated:{" "}
                    {projectData.updated}
                  </li>
                </ul>
              </section>
              {projectData.content && projectData.content.length > 0 && (
                <section className="bg-white rounded-xl shadow-lg border p-6 transition hover:shadow-xl mt-6">
                  <h2 className="text-lg font-semibold mb-4">
                    AI-Generated Blog Content
                  </h2>
                  {projectData.content.map((item: any) => (
                    <div
                      key={item.id}
                      className="mb-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900"
                    >
                      <div className="text-xs text-gray-500 mb-1">
                        Tone: {item.tone} | Date:{" "}
                        {new Date(item.created_at).toLocaleString()}
                      </div>
                      <pre className="whitespace-pre-wrap text-sm">
                        {item.content}
                      </pre>
                    </div>
                  ))}
                </section>
              )}

              {/* Tasks */}
              <section className="bg-white rounded-xl shadow-lg border p-6 transition hover:shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Recent Tasks</h2>
                  <button className="text-sm font-medium text-violet-600 hover:underline">
                    View all tasks
                  </button>
                </div>
                <ul className="space-y-3">
                  {project.tasks.slice(0, 3).map((task) => (
                    <li
                      key={task.id}
                      className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-md border border-gray-200"
                    >
                      <div>
                        <p className="font-medium text-sm">{task.title}</p>
                        <p className="text-xs text-gray-500">
                          {task.description}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-semibold ${
                          task.status === "Done"
                            ? "bg-green-100 text-green-700"
                            : task.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {task.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Team */}
              <section className="bg-white rounded-xl shadow-lg border p-6 transition hover:shadow-xl">
                <h2 className="text-lg font-semibold mb-4">Team</h2>
                <ul className="space-y-4">
                  {project.team.map((member) => (
                    <li key={member.id} className="flex items-center space-x-4">
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-4 text-sm font-medium border border-gray-300 rounded-lg py-2 hover:bg-gray-50">
                  Manage Team
                </button>
              </section>

              {/* AI Usage */}
              <section className="bg-white rounded-xl shadow-lg border p-6 transition hover:shadow-xl">
                <h2 className="text-lg font-semibold mb-2">AI Usage</h2>
                <p className="text-sm text-gray-600 mb-1">
                  Tokens Used:{" "}
                  <span className="text-violet-600">
                    {projectData.tokensUsed}
                  </span>{" "}
                  / {projectData.tokensLimit}
                </p>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-violet-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        (project.tokensUsed / project.tokensLimit) * 100
                      }%`,
                    }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Content Generated: {projectData.generatedItems || "items"}
                </p>
              </section>
            </div>
          </div>
        )}

        {/* Project Analytics */}
        <section className="bg-white rounded-xl shadow-lg border p-6 transition hover:shadow-xl">
          <h2 className="text-lg font-semibold mb-3">Project Analytics</h2>
          <ul className="text-sm text-gray-600 space-y-3">
            <li className="flex justify-between">
              <span>Total Words Generated</span>
              <span className="font-semibold text-gray-800">12,450</span>
            </li>
            <li className="flex justify-between">
              <span>Total AI Contents</span>
              <span className="font-semibold text-gray-800">
                {projectData.aiContent?.length}
              </span>
            </li>
            <li className="flex flex-col gap-2">
              <span className="font-medium text-gray-800">
                Content Breakdown
              </span>
              <ul className="pl-4 space-y-1 text-xs text-gray-500">
                {["Blog", "Email", "Ad", "Post"].map((type) => {
                  const count =
                    projectData.aiContent?.filter((c) => c.type === type)
                      .length || 0;
                  return (
                    <li key={type} className="flex justify-between">
                      <span>{type}</span>
                      <span className="font-medium">{count}</span>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </section>

        {/* Other Tabs Placeholder */}
        {activeTab === "Tasks" && (
          <div className="pt-6 overflow-x-auto">
            <div className="min-w-[1024px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-2">
              {["To Do", "In Progress", "Review", "Done"].map((status) => {
                const colorMap = {
                  "To Do": "text-yellow-500",
                  "In Progress": "text-blue-500",
                  Review: "text-violet-500",
                  Done: "text-green-500",
                };
                const dotColor = {
                  "To Do": "bg-yellow-400",
                  "In Progress": "bg-blue-500",
                  Review: "bg-violet-500",
                  Done: "bg-green-500",
                };

                const filtered = project.tasks.filter(
                  (t) => t.status === status
                );

                return (
                  <div
                    key={status}
                    className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 flex flex-col min-h-[500px] transition hover:shadow-xl"
                  >
                    {/* Column Header */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${dotColor[status]}`}
                        />
                        <h3
                          className={`text-sm font-semibold tracking-wide ${colorMap[status]}`}
                        >
                          {status}
                        </h3>
                      </div>
                      <span className="text-xs text-gray-400 font-mono">
                        {filtered.length}
                      </span>
                    </div>

                    {/* Task Cards */}
                    <div className="flex-1 space-y-4 overflow-y-auto pr-1">
                      {filtered.map((task) => (
                        <div
                          key={task.id}
                          className="rounded-xl border border-gray-100 shadow-sm p-4 bg-gray-50 hover:bg-white transition"
                        >
                          <h4 className="text-sm font-semibold mb-1 text-gray-800">
                            {task.title}
                          </h4>
                          <p className="text-xs text-gray-500 mb-3">
                            {task.description}
                          </p>

                          <div className="flex justify-between items-center text-xs mb-2">
                            <span
                              className={`px-2 py-0.5 rounded-full font-semibold ${
                                task.priority === "High"
                                  ? "bg-red-100 text-red-700"
                                  : task.priority === "Medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              {task.priority}
                            </span>
                            <span className="text-gray-400 font-mono">
                              {task.dueDate}
                            </span>
                          </div>

                          <div className="flex items-center -space-x-2 mt-1">
                            {task.assignees?.map((user) => (
                              <img
                                key={user.id}
                                src={user.avatarUrl}
                                alt={user.name}
                                className="w-7 h-7 rounded-full border-2 border-white shadow-sm"
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    {activeTab === "AI Content" && (
                      <div className="pt-6 px-2">
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-xl font-semibold text-gray-800">
                            AI-Generated Content
                          </h2>
                          <div className="flex items-center space-x-2">
                            <button className="flex items-center px-4 py-2 text-sm font-medium bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition">
                              + New Content
                            </button>
                            <select
                              className="text-sm border rounded-md px-3 py-2 text-gray-700"
                              onChange={(e) => {
                                const sort = e.target.value;
                                // insert sorting logic here
                                alert("Sorting by: " + sort);
                              }}
                            >
                              <option value="date">Sort by Date</option>
                              <option value="type">Sort by Content Type</option>
                              <option value="title">Sort by Title</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                          {project.aiContent.map((content) => (
                            <div
                              key={content.id}
                              className="bg-white border border-gray-200 rounded-xl shadow-md p-5 hover:shadow-xl transition group"
                            >
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center space-x-2">
                                  <span className="w-5 h-5 rounded-md bg-violet-100 text-violet-600 flex items-center justify-center text-xs">
                                    {content.type === "Email" ? "✉️" : "📝"}
                                  </span>
                                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                                    {content.type}
                                  </span>
                                </div>
                                <span className="text-xs bg-violet-100 text-violet-600 px-2 py-0.5 rounded-full font-bold">
                                  GPT-4
                                </span>
                              </div>

                              <h3 className="text-md font-semibold text-gray-800 mb-2">
                                {content.title}
                              </h3>
                              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                                {content.preview}
                              </p>
                              <p className="text-xs text-gray-400">
                                Generated on {content.date} by {content.author}
                              </p>

                              <div className="mt-4 flex justify-between items-center space-x-2">
                                <button className="flex-1 flex items-center justify-center px-3 py-2 border text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 transition">
                                  ✏️ Edit
                                </button>
                                <button className="flex-1 flex items-center justify-center px-3 py-2 border text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 transition">
                                  📋 Copy
                                </button>
                                <button className="flex items-center justify-center px-2 py-2 text-gray-400 hover:text-violet-600 transition">
                                  →
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Add Task Button */}
                    <button className="mt-4 text-sm font-medium text-violet-600 hover:text-violet-700 transition">
                      + Add Task
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <EditProjectModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          initialData={projectData}
          onUpdate={(updatedFields) => {
            setProjectData((prev) => ({
              ...prev,
              title: updatedFields.title,
              brand: { name: updatedFields.brand },
              description: updatedFields.goal,
              status: updatedFields.status,
              updated: new Date().toISOString(),
            }));
          }}
        />
      </div>
    </div> // this is the final closing div of your component
  );
};

export default ProjectDetails;
