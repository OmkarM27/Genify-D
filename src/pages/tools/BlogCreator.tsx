import React, { useState, useRef, useEffect } from "react";
import { Copy, Download, Save, ChevronUp, RefreshCcw } from "lucide-react";
import clsx from "clsx";

const shimmerKeyframes = `
@keyframes shimmer {
  0% { background-position: -500px 0; }
  100% { background-position: 500px 0; }
}
@keyframes pulseFade {
  0%, 100% { opacity: 0.6 }
  50% { opacity: 1 }
}
@keyframes blink {
  0%, 100% { opacity: 1 }
  50% { opacity: 0 }
}
`;

const BlogCreator: React.FC = () => {
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem("blogForm");
    return saved
      ? JSON.parse(saved)
      : {
          title: "",
          goal: "",
          audience: "",
          tone: "",
          keywords: "",
          generateImage: false,
          imageDesc: "",
          file: null as File | null,
        };
  });

  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("blogForm", JSON.stringify(form));
  }, [form]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, files, checked } = e.target as any;
    if (type === "file") {
      setForm((prev) => ({ ...prev, file: files[0] }));
    } else if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setOutput("");

    try {
      const response = await fetch("http://localhost:8000/generate/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          goal: form.goal,
          audience: form.audience,
          tone: form.tone || "Neutral",
          keywords: form.keywords,
          generateImage: form.generateImage,
          imageDesc: form.imageDesc,
          length: "long-form",
          new_project_name: "My Blog Project", // ✅ this is required!
        }),
      });

      const data = await response.json();
      setOutput(data.content || "⚠️ No blog content returned.");
    } catch (error) {
      console.error("❌ Blog generation failed", error);
      setOutput("Something went wrong while generating your blog.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    localStorage.removeItem("blogForm");
    setForm({
      title: "",
      goal: "",
      audience: "",
      tone: "",
      keywords: "",
      generateImage: false,
      imageDesc: "",
      file: null,
    });
    setOutput("");
  };

  return (
    <div className="relative min-h-screen bg-[#0B0B0D] text-white font-[Inter] p-6 md:p-10 overflow-hidden">
      <style>{shimmerKeyframes}</style>

      {/* Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full animate-pulseFade bg-gradient-radial from-purple-800/20 via-transparent to-indigo-900/20 opacity-20 blur-3xl" />
      </div>

      <h1 className="text-3xl font-bold mb-6 relative z-10">Blog Creator</h1>

      <div className="relative z-10 grid md:grid-cols-2 gap-6 items-start">
        {/* Left: Form Area */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-xl space-y-6 animate-fadeIn">
          <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            ⚙️ Blog Configuration
          </h2>

          {[
            {
              label: "Title or Topic",
              name: "title",
              placeholder: "e.g., How AI is transforming enterprise content",
            },
            {
              label: "Content Goal",
              name: "goal",
              placeholder: "e.g., Educate B2B teams on GenAI workflows",
            },
            {
              label: "Target Audience",
              name: "audience",
              placeholder: "e.g., Marketing heads, founders, PMMs",
            },
            {
              label: "Important Keywords",
              name: "keywords",
              placeholder: "e.g., GenAI, AI writers, blog automation",
            },
          ].map(({ label, name, placeholder }) => (
            <div key={name} className="space-y-1 group">
              <label className="text-sm text-gray-300 group-hover:text-gray-100 transition">
                {label}
              </label>
              <input
                name={name}
                value={(form as any)[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full p-3 bg-white/10 text-white placeholder-gray-400 rounded-lg border-l-4 border-transparent group-hover:border-purple-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
              />
            </div>
          ))}

          {/* Tone & Image Options */}
          <div>
            <label className="text-sm text-gray-300">
              Tone of Voice (optional)
            </label>
            <select
              name="tone"
              value={form.tone}
              onChange={handleChange}
              className="w-full p-3 bg-white/10 text-white rounded-lg border-l-4 border-transparent hover:border-purple-400 focus:border-purple-500"
            >
              <option value="">Select tone...</option>
              <option value="Professional">Professional</option>
              <option value="Educational">Educational</option>
              <option value="Friendly">Friendly</option>
            </select>
          </div>

          <label className="flex items-center gap-3 text-sm text-gray-300">
            <input
              type="checkbox"
              name="generateImage"
              checked={form.generateImage}
              onChange={handleChange}
              className="accent-purple-600"
            />
            Generate Image?
          </label>

          {form.generateImage && (
            <div>
              <label className="text-sm text-gray-300">Image Description</label>
              <input
                name="imageDesc"
                value={form.imageDesc}
                onChange={handleChange}
                placeholder="e.g., AI-generated classroom scene"
                className="w-full p-3 bg-white/10 text-white placeholder-gray-400 rounded-lg border-l-4 hover:border-purple-400 focus:border-purple-500"
              />
            </div>
          )}

          {/* File Upload */}
          <div>
            <label className="text-sm text-gray-300">
              Upload Brand Docs (optional)
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleChange}
              className="w-full bg-white/10 text-gray-400 file:bg-purple-600 file:text-white file:border-none file:rounded-full file:px-4 file:py-2 rounded-lg cursor-pointer"
            />
            {form.file && (
              <p className="text-xs text-gray-400 mt-1">
                Uploaded: {form.file.name}
              </p>
            )}
          </div>

          {/* CTA + Reset */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className={clsx(
              "w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-full text-lg transition transform",
              loading
                ? "opacity-60 cursor-wait"
                : "hover:scale-105 hover:shadow-xl"
            )}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full border-2 border-t-transparent border-white h-5 w-5" />
                Generating...
              </div>
            ) : (
              "Generate Blog"
            )}
          </button>

          <button
            onClick={resetForm}
            className="flex items-center gap-2 mx-auto mt-2 text-sm text-gray-400 hover:text-white transition"
          >
            <RefreshCcw size={14} /> Reset Form
          </button>
        </div>

        {/* Right: Output Section */}
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col animate-fadeIn mt-0 md:mt-[4px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Generated Output</h2>
            <div className="flex gap-3 text-gray-300">
              {[Copy, Download, Save].map((Icon, idx) => (
                <button
                  key={idx}
                  className="hover:scale-110 transition-transform"
                  title={Icon.name}
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          <div
            ref={outputRef}
            className="relative flex-1 overflow-y-auto border border-white/10 rounded-lg p-4 bg-white/5 text-sm text-gray-300 prose prose-invert max-h-[70vh] whitespace-pre-wrap scroll-smooth custom-scroll shadow-inner"
          >
            {loading ? (
              <div className="italic text-gray-400 flex items-center animate-pulse">
                Generating<span className="animate-blink ml-1">|</span>
              </div>
            ) : output ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: output.replace(/\n/g, "<br />"),
                }}
              />
            ) : (
              <p className="italic text-gray-500 animate-pulse">
                Your AI-generated blog will appear here.
              </p>
            )}

            {!!output && (
              <button
                className="absolute bottom-4 right-4 p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition transform hover:scale-110 shadow-lg"
                onClick={() =>
                  outputRef.current?.scrollTo({ top: 0, behavior: "smooth" })
                }
              >
                <ChevronUp size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCreator;
