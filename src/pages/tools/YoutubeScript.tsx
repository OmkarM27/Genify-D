import React, { useState } from 'react';
import { Copy, Download, Save } from 'lucide-react';

const YouTubeScriptGenerator: React.FC = () => {
  const [form, setForm] = useState({
    topic: '',
    goal: '',
    tone: 'Engaging',
    length: '5 Minutes',
    audience: '',
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
    const { topic, goal, tone, length, audience } = form;
    setOutput(
      `🎬 Topic: ${topic}\n🎯 Goal: ${goal}\n🗣️ Tone: ${tone}\n⏱️ Length: ${length}\n👥 Audience: ${audience}\n\n[Intro...]\n[Main Content...]\n[Outro...]\n\nYour script will be structured based on the above inputs.`
    );
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-8">YouTube Script Generator</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Form Column */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-md space-y-4">
          <input
            name="topic"
            value={form.topic}
            onChange={handleChange}
            placeholder="Video Topic (required)"
            className="w-full p-3 bg-white/10 text-white rounded-lg placeholder-gray-400 border focus:border-purple-500"
          />
          <input
            name="goal"
            value={form.goal}
            onChange={handleChange}
            placeholder="Script Goal (e.g., educate, entertain)"
            className="w-full p-3 bg-white/10 text-white rounded-lg placeholder-gray-400 border focus:border-purple-500"
          />
          <input
            name="audience"
            value={form.audience}
            onChange={handleChange}
            placeholder="Target Audience"
            className="w-full p-3 bg-white/10 text-white rounded-lg placeholder-gray-400 border focus:border-purple-500"
          />
          <select
            name="tone"
            value={form.tone}
            onChange={handleChange}
            className="w-full p-3 bg-white/10 text-white rounded-lg border focus:border-purple-500"
          >
            <option>Engaging</option>
            <option>Informative</option>
            <option>Conversational</option>
            <option>Dramatic</option>
          </select>
          <select
            name="length"
            value={form.length}
            onChange={handleChange}
            className="w-full p-3 bg-white/10 text-white rounded-lg border focus:border-purple-500"
          >
            <option>2 Minutes</option>
            <option>5 Minutes</option>
            <option>10 Minutes</option>
            <option>Long-form (15+ min)</option>
          </select>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Upload Brand Assets (optional)</label>
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
            className="w-full mt-2 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:opacity-90 text-white font-semibold rounded-full transition"
          >
            Generate Script
          </button>
        </div>

        {/* Output Column */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-md flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Generated Script</h2>
            <div className="flex gap-3 text-gray-300">
              <button title="Copy"><Copy size={18} /></button>
              <button title="Download"><Download size={18} /></button>
              <button title="Save"><Save size={18} /></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto border border-white/10 rounded-lg p-4 bg-white/5 text-sm text-gray-300 whitespace-pre-wrap min-h-[300px]">
            {output ? output : <p className="italic text-gray-500">Your YouTube script will appear here.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeScriptGenerator;
