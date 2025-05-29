import React, { useState } from 'react';
import { Copy, Download, Save } from 'lucide-react';

const OneLineGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');

  const handleGenerate = () => {
    setOutput(`💡 One-liner for: "${prompt}" → "Empowering change in one bold line."`);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-8">One-Line Generator</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left - Form */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4 shadow-md">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your topic or prompt (e.g., brand vision)"
            className="w-full p-3 bg-white/10 text-white placeholder-gray-400 rounded-lg border focus:border-purple-500"
          />
          <button
            onClick={handleGenerate}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:opacity-90 text-white font-semibold rounded-full transition"
          >
            Generate One-Liner
          </button>
        </div>

        {/* Right - Output */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-md flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Generated Line</h2>
            <div className="flex gap-3 text-gray-300">
              <button title="Copy"><Copy size={18} /></button>
              <button title="Download"><Download size={18} /></button>
              <button title="Save"><Save size={18} /></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto border border-white/10 rounded-lg p-4 bg-white/5 text-sm text-gray-300 min-h-[100px]">
            {output ? output : <p className="italic text-gray-500">Your one-liner will appear here.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneLineGenerator;
