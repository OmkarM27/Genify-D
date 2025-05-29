import React, { useState, useEffect, useRef } from "react";
import { Copy, Download, Save, ChevronUp } from "lucide-react";
import clsx from "clsx";

const EmailCampaignGenerator: React.FC = () => {
  const [form, setForm] = useState({
    subject: "",
    goal: "",
    audience: "",
    tone: "",
    keywords: "",
    file: null as File | null,
  });

  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingTitle, setTypingTitle] = useState(true);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fullTitle = "Genify AI writing...";
    if (typingTitle) {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedTitle(fullTitle.slice(0, index + 1));
        index++;
        if (index === fullTitle.length) {
          clearInterval(interval);
          setTimeout(() => {
            setTypingTitle(false);
          }, 1000);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [typingTitle]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, files } = e.target as any;
    if (type === "file") {
      setForm((prev) => ({ ...prev, file: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("http://localhost:8000/generate/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          new_project_name: "Email Campaign", // ✅ default project
        }),
      });

      const data = await res.json();
      if (data.content) {
        setOutput(data.content);
      } else {
        setOutput("❌ Failed to generate email.");
      }
    } catch (err) {
      console.error(err);
      setOutput("❌ Error occurred while generating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0B0B0D] text-white font-[Inter] p-6 md:p-10 overflow-hidden">
      <style>{`
        .email-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(91,33,182,0.15), rgba(9,9,11,0.7));
          z-index: 0;
        }
        .email-bg::after {
          content: "";
          position: absolute;
          width: 160%;
          height: 160%;
          top: -20%;
          left: -30%;
          background: radial-gradient(circle, rgba(128,0,255,0.08) 0%, transparent 60%),
                      radial-gradient(circle, rgba(0,200,255,0.06) 0%, transparent 50%);
          animation: floatBlobs 60s ease-in-out infinite alternate;
          opacity: 0.08;
          z-index: 0;
        }
        @keyframes floatBlobs {
          0% { transform: translate(0, 0); }
          50% { transform: translate(20px, -10px); }
          100% { transform: translate(-10px, 20px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .card-glass {
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>

      {/* Animated Background */}
      <div className="absolute inset-0 email-bg pointer-events-none z-0" />

      {/* Animated Title */}
      <div className="relative z-10 mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent inline-flex items-center gap-2">
          <span
            className="transition-transform hover:rotate-12 hover:scale-110 duration-300 inline-block"
            role="img"
            aria-label="email"
          >
            📧
          </span>
          {typingTitle ? (
            <span className="text-white">
              {displayedTitle}
              <span className="animate-blink">|</span>
            </span>
          ) : (
            "Email Campaign Generator"
          )}
        </h1>
        {!typingTitle && (
          <p className="text-sm text-gray-400 mt-1">
            Craft hyper-personalized campaigns in seconds with AI
          </p>
        )}
      </div>

      <div className="relative z-10 grid md:grid-cols-2 gap-6 items-start">
        {/* Form */}
        <div className="card-glass rounded-2xl p-6 shadow-xl space-y-6">
          <h2 className="text-lg font-semibold text-purple-300">
            📬 Campaign Configuration
          </h2>
          {[
            {
              label: "Subject Line",
              name: "subject",
              placeholder: "e.g., Introducing Genify to growth teams",
            },
            {
              label: "Campaign Goal",
              name: "goal",
              placeholder: "e.g., Book a demo call",
            },
            {
              label: "Target Audience",
              name: "audience",
              placeholder: "e.g., Startup founders, marketing leads",
            },
            {
              label: "Personalization Keywords",
              name: "keywords",
              placeholder: "ROI stat, client name, use case",
            },
          ].map(({ label, name, placeholder }) => (
            <div key={name} className="group relative">
              <input
                name={name}
                value={(form as any)[name]}
                onChange={handleChange}
                placeholder=" "
                required
                className="w-full p-3 bg-white/10 text-white placeholder-transparent rounded-lg border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 peer transition-all"
              />
              <label className="absolute left-3 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">
                {label}
              </label>
            </div>
          ))}
          <div>
            <label className="text-sm text-gray-300">
              Tone of Voice (optional)
            </label>
            <select
              name="tone"
              value={form.tone}
              onChange={handleChange}
              className="w-full p-3 bg-white/10 text-white rounded-lg border border-white/10 focus:border-purple-500"
            >
              <option value="">Select tone...</option>
              <option value="Confident">Confident</option>
              <option value="Friendly">Friendly</option>
              <option value="Helpful">Helpful</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-300">
              Upload File (optional)
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleChange}
              className="w-full bg-white/10 text-gray-400 file:bg-purple-600 file:text-white file:border-none file:rounded-full file:px-4 file:py-2 rounded-lg cursor-pointer"
            />
            {form.file && (
              <p className="text-xs text-gray-400 mt-1">
                Selected: {form.file.name}
              </p>
            )}
          </div>
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
              "Generate Email"
            )}
          </button>
        </div>

        {/* Output */}
        <div className="card-glass rounded-2xl p-6 shadow-xl flex flex-col mt-0 md:mt-[4px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Generated Email</h2>
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
            className="flex-1 overflow-y-auto border border-white/10 rounded-lg p-4 bg-white/5 text-sm text-gray-300 prose prose-invert max-h-[70vh] whitespace-pre-wrap scroll-smooth shadow-inner"
          >
            {loading ? (
              <div className="italic text-gray-400 flex items-center animate-pulse">
                Generating email<span className="animate-blink ml-1">|</span>
              </div>
            ) : output ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: output.replace(/\n/g, "<br />"),
                }}
              />
            ) : (
              <p className="italic text-gray-500 animate-pulse">
                Your generated email will appear here.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailCampaignGenerator;
