import React, { useState } from 'react';

const DynamicForm = ({ fields }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const shouldShow = (field) => {
    if (!field.show_if) return true;
    const [key, val] = Object.entries(field.show_if)[0];
    return formData[key] === val;
  };

  return (
    <form className="space-y-4">
      {fields.map((field) =>
        shouldShow(field) ? (
          <div key={field.name}>
            <label className="block text-sm font-medium">{field.label}</label>
            {field.type === 'text' && (
              <input
                type="text"
                className="w-full p-2 rounded bg-white/10 text-white"
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            )}
            {field.type === 'select' && (
              <select
                className="w-full p-2 rounded bg-white/10 text-white"
                onChange={(e) => handleChange(field.name, e.target.value)}
              >
                <option value="">Select...</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}
            {field.type === 'toggle' && (
              <input
                type="checkbox"
                className="ml-2"
                onChange={(e) => handleChange(field.name, e.target.checked)}
              />
            )}
          </div>
        ) : null
      )}
      <button
        type="button"
        onClick={() => console.log('Submitting form:', formData)}
        className="mt-4 w-full p-2 rounded bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
      >
        Generate
      </button>
    </form>
  );
};

export default DynamicForm;
