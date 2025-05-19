import React, { useEffect, useState } from "react";


import { motion, AnimatePresence } from "framer-motion";

const sections = [
  "Voice & Tone",
  "Visual Identity",
  "Messaging",
  "Audience",
  "Knowledge Base",
  "Templates",
  "Campaigns",
  "Tool Sync",
  "Consistency AI",
];




const tabMotion = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
};

const Brand = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTone, setSelectedTone] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [sample1, setSample1] = useState("");
  const [sample2, setSample2] = useState("");
  const userEmail = "omkar@example.com"; // Replace with actual logged-in email if available
  useEffect(() => {
  const fetchPreferences = async () => {
    try {
      const res = await fetch(`/api/brand/preferences?email=${userEmail}`);
      const data = await res.json();
      setSelectedTone(data.tone || "");
      setSelectedStyle(data.style || "");
      const [s1, s2] = (data.sample || "").split("\n");
      setSample1(s1 || "");
      setSample2(s2 || "");
    } catch (err) {
      console.error("❌ Failed to load preferences", err);
    }
  };

  if (userEmail) fetchPreferences();
}, [userEmail]);


  const savePreferences = async () => {
    try {
      await axios.post("/api/brand/preferences", {
        user_email: userEmail,
        tone: selectedTone,
        style: selectedStyle,
        sample: sample1 + "\n" + sample2,
      });
      alert("✅ Preferences saved");
    } catch (err) {
      console.error("Failed to save preferences", err);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div className="space-y-6">
            {/* Tone Selector */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                🎙️ Define Brand Tone
              </h3>
              <p className="text-white/60 text-sm mb-4">
                Select one or more tones that best describe your brand’s voice.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "Professional",
                  "Friendly",
                  "Bold",
                  "Empathetic",
                  "Gen Z",
                ].map((tone, i) => (
                  <button
                    key={i}
                    className={`px-4 py-2 rounded-full border ${
                      selectedTone === tone
                        ? "bg-purple-600 text-white border-purple-500"
                        : "bg-white/10 text-white/70 border-white/20"
                    }`}
                    onClick={() => setSelectedTone(tone)}
                  >
                    {tone}
                  </button>
                ))}

                <input
                  type="text"
                  placeholder="Custom tone..."
                  className="bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm border border-white/20"
                />
              </div>
            </div>

            {/* Writing Style */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                🧠 Writing Style
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  "Casual",
                  "Formal",
                  "Short & Punchy",
                  "Elaborate",
                  "With Emojis",
                  "Without Emojis",
                ].map((style, i) => (
                  <button
                    key={i}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedStyle === style
                        ? "bg-purple-600 text-white border-purple-500"
                        : "bg-white/10 text-white/70 border-white/20"
                    }`}
                    onClick={() => setSelectedStyle(style)}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Examples */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                ✍️ Sample Content
              </h3>
              <p className="text-white/60 text-sm mb-2">
                Give us 1–2 examples of how your brand speaks.
              </p>
              <textarea
                rows={4}
                placeholder="E.g., 'Welcome to Genify...'"
                className="..."
                value={sample1}
                onChange={(e) => setSample1(e.target.value)}
              />

              <textarea
                rows={4}
                placeholder="Another example..."
                className="..."
                value={sample2}
                onChange={(e) => setSample2(e.target.value)}
              />
            </div>

            {/* Voice Personas */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                👤 Voice Personas
              </h3>
              <p className="text-white/60 text-sm mb-2">
                Select or name a style preset for easy switching.
              </p>
              <div className="flex gap-3 flex-wrap">
                {[
                  "Sassy Startup",
                  "Corporate Boss",
                  "Educator",
                  "Tech Savvy",
                ].map((persona, i) => (
                  <div
                    key={i}
                    className="bg-white/10 text-white/70 px-4 py-2 rounded-lg border border-white/20 text-sm hover:bg-purple-600 hover:text-white transition"
                  >
                    {persona}
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Add Persona Name..."
                  className="bg-white/10 text-white/80 px-4 py-2 rounded-lg text-sm border border-white/20"
                />
                {/* Save Preferences */}
                <div className="pt-4">
                  <button
                    onClick={async () => {
                      try {
                        await fetch("/api/brand/preferences", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            user_email: userEmail,
                            tone: selectedTone,
                            style: selectedStyle,
                            sample: `${sample1}\n${sample2}`,
                          }),
                        });
                        alert("✅ Preferences saved!");
                      } catch (error) {
                        console.error("❌ Failed to save preferences:", error);
                        alert("Something went wrong. Please try again.");
                      }
                    }}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="bg-white/5 rounded-2xl p-6 shadow-lg border border-white/10 space-y-10">
            {/* Brand Colors */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span role="img">🎨</span> Brand Colors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["Primary", "Secondary", "Accent"].map((label, i) => {
                  const defaultColor =
                    i === 0 ? "#7c3aed" : i === 1 ? "#3b82f6" : "#10b981";
                  return (
                    <div key={i} className="space-y-2">
                      <label className="block text-sm text-white/80">
                        {label} Color
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          defaultValue={defaultColor}
                          className="w-10 h-10 border border-white/20 rounded-full"
                        />
                        <input
                          type="text"
                          defaultValue={defaultColor}
                          className="flex-1 bg-white/10 text-white px-3 py-2 rounded-lg border border-white/20"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Brand Fonts */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span role="img">🔤</span> Brand Fonts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-white/80 mb-1">
                    Heading Font
                  </label>
                  <select className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20">
                    <option>Inter</option>
                    <option>Poppins</option>
                    <option>Roboto</option>
                    <option>Playfair Display</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-white/80 mb-1">
                    Body Font
                  </label>
                  <select className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20">
                    <option>Inter</option>
                    <option>Lato</option>
                    <option>Open Sans</option>
                    <option>Montserrat</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Logo Upload */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span role="img">🖼️</span> Logo Uploads
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-white/80 mb-1">
                    Light Logo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/80 mb-1">
                    Dark Logo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20"
                  />
                </div>
              </div>
            </div>

            {/* Favicon & Watermark */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span role="img">🧼</span> Favicon & Watermark
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-white/80 mb-1">
                    Favicon
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/80 mb-1">
                    Image Watermark
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-800">
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              📝 Messaging & CTAs
            </h3>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Mission */}
              <div>
                <label className="block text-gray-400 font-medium mb-1">
                  Mission Statement
                </label>
                <textarea
                  rows={3}
                  placeholder="What’s your brand’s core mission?"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              {/* Vision */}
              <div>
                <label className="block text-gray-400 font-medium mb-1">
                  Vision Statement
                </label>
                <textarea
                  rows={3}
                  placeholder="Where is your brand headed?"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              {/* Core Values */}
              <div className="md:col-span-2">
                <label className="block text-gray-400 font-medium mb-1">
                  Core Values
                </label>
                <input
                  type="text"
                  placeholder="e.g. Integrity, Innovation, Customer-first"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* CTAs */}
              <div className="md:col-span-2">
                <label className="block text-gray-400 font-medium mb-1">
                  Standard Calls-To-Action
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Book a Demo, Start Free Trial, Subscribe Now"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-800">
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              👥 Target Audience
            </h3>

            <div className="space-y-6">
              {/* Primary Audience */}
              <div>
                <label className="block text-gray-400 font-medium mb-1">
                  Primary Audience Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your core audience: age, region, needs..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              {/* Segments */}
              <div>
                <label className="block text-gray-400 font-medium mb-1">
                  Audience Segments
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gen Z creators, marketing managers, startup founders"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Pain Points */}
              <div>
                <label className="block text-gray-400 font-medium mb-1">
                  Pain Points & Needs
                </label>
                <textarea
                  rows={3}
                  placeholder="What problems do your users commonly face?"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              {/* Buyer Personas */}
              <div>
                <label className="block text-gray-400 font-medium mb-1">
                  Buyer Personas (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Describe or upload key personas for AI customization"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-800">
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              📚 Brand Knowledge Base
            </h3>

            <div className="space-y-6">
              {/* Industry Terms */}
              <div>
                <label className="block text-gray-400 font-medium mb-1">
                  Industry Terms / Jargon
                </label>
                <textarea
                  rows={3}
                  placeholder="Add common terminology, acronyms, or technical language..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              {/* Must-use Phrases */}
              <div>
                <label className="block text-gray-400 font-medium mb-1">
                  Must-use Phrases
                </label>
                <textarea
                  rows={2}
                  placeholder='E.g. "Powered by Creators", "Content that Converts"'
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              {/* Do’s and Don’ts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-green-400 font-medium mb-1">
                    Do’s
                  </label>
                  <textarea
                    rows={3}
                    placeholder="What your AI content should always follow or include"
                    className="w-full bg-gray-800 border border-green-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-red-400 font-medium mb-1">
                    Don’ts
                  </label>
                  <textarea
                    rows={3}
                    placeholder="What your brand should avoid in tone, wording, or message"
                    className="w-full bg-gray-800 border border-red-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  />
                </div>
              </div>

              {/* SEO Keywords */}
              <div>
                <label className="block text-gray-400 font-medium mb-1">
                  SEO Keywords (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Add your top SEO keywords for AI to prioritize"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Competitor Voice to Avoid */}
              <div>
                <label className="block text-gray-400 font-medium mb-1">
                  Competitor Tone to Avoid
                </label>
                <input
                  type="text"
                  placeholder='e.g. "Avoid sounding like [Competitor]"'
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-md text-white">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              ✨ Template Library
            </h3>

            <div className="mb-8">
              <p className="text-gray-400 mb-2">
                Save reusable prompts and branded layout templates.
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded-lg text-sm font-medium">
                + New Template
              </button>
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Blog Intro Prompt",
                  type: "Prompt",
                  description: "Hook for blog articles that matches Gen Z tone",
                  tags: ["Prompt", "Blog", "Gen Z"],
                },
                {
                  title: "Instagram Quote Post",
                  type: "Layout",
                  description: "Bold text-based layout with image background",
                  tags: ["Social", "Layout", "Inspo"],
                },
                {
                  title: "Ad Copy Generator",
                  type: "Prompt",
                  description: "CTA-driven format for high-performing ads",
                  tags: ["Ad", "CTA", "Prompt"],
                },
              ].map((template, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:shadow-lg transition duration-300 flex flex-col justify-between"
                >
                  <div>
                    <h4 className="font-semibold text-lg">{template.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      {template.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {template.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-purple-700/30 text-purple-300 text-xs px-2 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Toggle switch (optional) */}
            <div className="mt-8 flex items-center justify-between">
              <p className="text-gray-400">Apply Templates Automatically</p>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
        );

      case 6:
        return <div>📂 Campaigns & Projects (Theme + Visual)</div>;
      case 7:
        return <div>🔄 Tool Sync (CRM, Social, Zapier)</div>;
      case 8:
        return <div>📈 Consistency Checker (AI-powered Suggestions)</div>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full px-6 py-8 overflow-y-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Brand Center</h1>
      <p className="text-sm text-white/60 mb-6">
        Define your brand’s voice, visuals, audience, and more to generate AI
        content that truly fits.
      </p>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-3 mb-6 border-b border-white/10 pb-2">
        {sections.map((section, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              index === activeTab
                ? "bg-purple-600 text-white"
                : "bg-white/10 text-white/70 hover:bg-white/20"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Animated Content */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} {...tabMotion}>
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Brand;
