import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SendHorizonal } from "lucide-react";

const ChatPage = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const initial = location.state?.message || "";
  const [messages, setMessages] = useState(
    initial ? [{ type: "user", contentType: "text", text: initial }] : []
  );
  const [input, setInput] = useState("");
  const [tonePrefs, setTonePrefs] = useState(null);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    const fetchTone = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/brand/preferences?email=omkar@example.com"
        );
        const data = await res.json();
        setTonePrefs(data);
      } catch (err) {
        console.error("Tone fetch failed", err);
      }
    };

    fetchTone();
  }, []);

  const fetchBotReply = async (userText: string) => {
    try {
      setMessages((prev) => [
        ...prev,
        {
          sender: "user",
          text: userText,
          timestamp: new Date().toISOString(),
        },
      ]);

      setLoading(true);

      // 1. Fetch brand tone/style/sample from backend
      const userEmail = "omkar@example.com"; // (or from useUser().email)
      const prefRes = await fetch(`/api/brand/preferences?email=${userEmail}`);
      const preferences = await prefRes.json();

      const payload = {
        prompt: userText,
        tone: preferences.tone || "neutral",
        style: preferences.style || "default",
        sample: preferences.sample || "",
      };

      console.log("📤 Prompt being sent to LLM:", payload);

      // 2. Send prompt with tone/style to backend
      const res = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      const taskId = data.task_id;
      if (!taskId) throw new Error("No task ID returned");

      setMessages((prev) => [
        ...prev,
        {
          sender: "system",
          text: `✅ Prompt received. Processing...`,
          taskId,
        },
      ]);

      // 3. Poll result
      let tries = 0;
      while (tries < 10) {
        const resultRes = await fetch(
          `http://localhost:8000/generate/result/${taskId}`
        );
        const resultData = await resultRes.json();

        if (resultData.status === "completed") {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: resultData.output.response,
              timestamp: new Date().toISOString(),
            },
          ]);
          break;
        }

        await new Promise((resolve) => setTimeout(resolve, 1500));
        tries++;
      }

      setLoading(false);
    } catch (err) {
      console.error("❌ Error fetching bot reply:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "system",
          text: "❌ Still processing, please try again.",
        },
      ]);
      setLoading(false);
    }
  };
  const handleSend = () => {
    if (!input.trim()) return;
    fetchBotReply(input.trim());
    setInput(""); // Clear input
  };
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const renderMessageContent = (msg: Message) => {
    if (msg.text) {
      return (
        <div
          className={`px-4 py-2 rounded-lg text-sm ${
            msg.sender === "user"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {msg.text}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center px-4 pt-10 pb-24 relative">
      <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-purple-700/30 via-indigo-600/10 to-transparent blur-2xl pointer-events-none" />
      <h1 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
        Hello, Omkar
      </h1>

      <div className="w-full max-w-3xl bg-[#121212] rounded-2xl p-6 border border-[#2a2a2a] shadow-xl flex flex-col space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`max-w-[85%] px-4 py-3 text-sm rounded-xl ${
                msg.sender === "user"
                  ? "self-end bg-gradient-to-br from-purple-700 to-indigo-700 text-white"
                  : "self-start bg-[#222] text-gray-200"
              }`}
            >
              {renderMessageContent(msg)}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>

      <div className="fixed bottom-6 w-full max-w-3xl px-4">
        <div className="flex items-center group bg-[#1a1a1a] border border-[#333] rounded-full px-4 py-2 focus-within:ring-2 ring-purple-700 transition-all duration-200 shadow-md">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type your thoughts..."
            className="flex-1 px-3 py-2 bg-transparent text-white placeholder:text-gray-400 text-base focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="ml-2 p-2 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 hover:scale-105 transition-transform duration-200"
          >
            <SendHorizonal
              size={18}
              className="text-white group-hover:rotate-45 transition-transform duration-300"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
