import React, { useState } from 'react';
import { Copy, Download, Save } from 'lucide-react';

const InstagramPostGenerator: React.FC = () => {
  const [form, setForm] = useState({
    prompt: '',
    platform: 'Instagram',
    tone: 'Playful',
    length: 'Medium',
    includeHashtags: false,
    imageStyle: '',
    file: null,
  });

  const [output, setOutput] = useState('');

  const handleChange = (e: any) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setForm(prev => ({ ...prev, file: files[0] }));
    } else if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: checked }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleGenerate = () => {
    const hashtags = form.includeHashtags ? '\n#Genify #InstaAI #SmartCaption' : '';
    setOutput(
      `📸 Platform: ${form.platform}\n🎭 Tone: ${form.tone}\n✏️ Length: ${form.length}\n🖼️ Style: ${form.imageStyle}\n\nGenerated caption for:\n"${form.prompt}"${hashtags}`
    );
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-8">Instagram Post Generator</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Form Column */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-md space-y-4 transition-all duration-300">
          <input
            name="prompt"
            value={form.prompt}
            onChange={handleChange}
            placeholder="Caption Prompt (e.g., 'Promote our new summer drink')"
            required
            className="w-full p-3 bg-white/10 text-white placeholder-gray-400 rounded-lg border focus:border-purple-500"
          />
          <select
            name="platform"
            value={form.platform}
            onChange={handleChange}
            className="w-full p-3 bg-white/10 text-white rounded-lg border focus:border-purple-500"
          >
            <option>Instagram</option>
            <option>Reels</option>
            <option>Stories</option>
          </select>
          <select
            name="tone"
            value={form.tone}
            onChange={handleChange}
            className="w-full p-3 bg-white/10 text-white rounded-lg border focus:border-purple-500"
          >
            <option>Playful</option>
            <option>Bold</option>
            <option>Professional</option>
            <option>Emotional</option>
          </select>
          <select
            name="length"
            value={form.length}
            onChange={handleChange}
            className="w-full p-3 bg-white/10 text-white rounded-lg border focus:border-purple-500"
          >
            <option>Short</option>
            <option>Medium</option>
            <option>Long</option>
          </select>
          <label className="flex items-center gap-3 text-sm text-gray-300">
            <input
              type="checkbox"
              name="includeHashtags"
              checked={form.includeHashtags}
              onChange={handleChange}
              className="accent-purple-600"
            />
            Include Hashtags?
          </label>
          <input
            name="imageStyle"
            value={form.imageStyle}
            onChange={handleChange}
            placeholder="Image Style (optional)"
            className="w-full p-3 bg-white/10 text-white placeholder-gray-400 rounded-lg border focus:border-purple-500"
          />
          <div>
            <label className="block text-sm text-gray-300 mb-1">Upload Brand Assets (optional)</label>
            <input
              type="file"
              accept=".jpg,.png,.pdf,.docx"
              onChange={handleChange}
              className="w-full text-sm bg-white/10 text-gray-400 file:bg-purple-600 file:text-white file:border-none file:rounded-full file:px-4 file:py-2 rounded-lg cursor-pointer"
            />
            {form.file && <p className="text-xs text-gray-400 mt-1">Selected: {form.file.name}</p>}
          </div>

          <button
            onClick={handleGenerate}
            className="w-full mt-2 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:opacity-90 text-white font-semibold rounded-full transition"
          >
            Generate Caption
          </button>
        </div>

        {/* Output Preview Column */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-md flex flex-col transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Generated Instagram Caption</h2>
            <div className="flex gap-3 text-gray-300">
              <button title="Copy"><Copy size={18} /></button>
              <button title="Download"><Download size={18} /></button>
              <button title="Save"><Save size={18} /></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto border border-white/10 rounded-lg p-4 bg-white/5 text-sm text-gray-300 whitespace-pre-wrap min-h-[300px]">
            {output ? output : <p className="italic text-gray-500">Your generated caption will appear here.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramPostGenerator;
