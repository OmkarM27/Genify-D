import React, { useState, useEffect } from 'react';

const EditProjectModal = ({ isOpen, onClose, onUpdate, initialData }) => {
  const [form, setForm] = useState({
    title: '',
    brand: '',
    goal: '',
    status: 'To Do',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        brand: initialData.brand?.name || '',
        goal: initialData.description || '',
        status: initialData.status || 'To Do',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Edit Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Goal</label>
            <textarea
              name="goal"
              value={form.goal}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectModal;
