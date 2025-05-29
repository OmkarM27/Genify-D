import React, { useState } from 'react';
import { Copy, Download, Save } from 'lucide-react';

const LinkedInPostGenerator: React.FC = () => {
  const [form, setForm] = useState({
    topic: '',
    audience: '',
    style: 'Thought Leader',
    tone: 'Professional',
    hashtags: '',
    file: null,
  });

  const [output, setOutput] = useState('');

  const handleChange = (e: any) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setForm(prev => ({ ...prev, file: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleGenerate = () => {
    const post = `
🔹 Topic: ${form.topic}
🔹 Audience: ${form.audience}
🔹 Style: ${form.style}
🔹 Tone: ${form.tone}

Crafted with intention. Ready to resonate.
${form.hashtags ? `\n\n#${form.hashtags.split(',').join(' #')}` : ''}
    `.trim();
    setOutput(post);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-8">LinkedIn Post Generator</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg space-y-4">
          <input
            name="topic"
            value={form.topic}
            onChange={handleChange}
            placeholder="Post Topic"
            required
            className="w-full p-3 bg-white/10 text-white placeholder-gray-400 rounded-lg border focus:border-purple-500"
          />

          <input
            name="audience"
            value={form.audience}
            onChange={handleChange}
            placeholder="Target Audience"
            required
            className="w-full p-3 bg-white/10 text-white placeholder-gray-400 rounded-lg border focus:border-purple-500"
          />

          <select
            name="style"
            value={form.style}
            onChange={handleChange}
            className="w-full p-3 bg-white/10 text-white rounded-lg border focus:border-purple-500"
          >
            <option>Thought Leader</option>
            <option>Storytelling</option>
            <option>Bold</option>
            <option>Informative</option>
          </select>

          <select
            name="tone"
            value={form.tone}
            onChange={handleChange}
            className="w-full p-3 bg-white/10 text-white rounded-lg border focus:border-purple-500"
          >
            <option>Professional</option>
            <option>Inspirational</option>
            <option>Friendly</option>
          </select>

          <input
            name="hashtags"
            value={form.hashtags}
            onChange={handleChange}
            placeholder="Hashtag Preferences (comma separated)"
            className="w-full p-3 bg-white/10 text-white placeholder-gray-400 rounded-lg border focus:border-purple-500"
          />

          <div>
            <label className="block text-sm text-gray-300 mb-1">Upload Brand Docs (optional)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleChange}
              className="w-full text-sm bg-white/10 text-gray-400 file:bg-purple-600 file:text-white file:border-none file:rounded-full file:px-4 file:py-2 rounded-lg cursor-pointer"
            />
            {form.file && <p className="text-xs text-gray-400 mt-1">Selected: {form.file.name}</p>}
          </div>

          <button
            onClick={handleGenerate}
            className="w-full py-3 mt-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:opacity-90 text-white font-semibold rounded-full transition"
          >
            Generate Post
          </button>
        </div>

        {/* Output Display Section */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg flex flex-col transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Generated LinkedIn Post</h2>
            <div className="flex gap-3 text-gray-300">
              <button title="Copy"><Copy size={18} /></button>
              <button title="Download"><Download size={18} /></button>
              <button title="Save"><Save size={18} /></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto border border-white/10 rounded-lg p-4 bg-white/5 text-sm text-gray-300 whitespace-pre-wrap min-h-[300px]">
            {output ? output : <p className="italic text-gray-500">Your LinkedIn post will appear here.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInPostGenerator;
