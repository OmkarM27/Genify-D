import React, { useState } from "react";

const NewProjectModal = ({ isOpen, onClose, onCreate }) => {
  const [form, setForm] = useState({
    title: "",
    brand: "",
    goal: "",
    status: "To Do",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.brand) return;
    onCreate(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Create New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="e.g. Launch Campaign"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client / Brand
            </label>
            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="e.g. EcoTech"
            />
          </div>

          {/* Goal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Goal / Objective (Optional)
            </label>
            <textarea
              name="goal"
              value={form.goal}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="What is the objective of this project?"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Review</option>
              <option>Done</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-sm text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-violet-600 text-white text-sm rounded-md hover:bg-violet-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProjectModal;
