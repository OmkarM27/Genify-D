import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SendHorizonal, Copy } from "lucide-react";

const ChatPage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    simulateReply(input.trim());
    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const simulateReply = (text) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { sender: "user", text, time: timestamp }]);
    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "typing", text: "..." },
      ]);
    }, 500);
    setTimeout(() => {
      setMessages((prev) =>
        prev
          .filter((m) => m.sender !== "typing")
          .concat({
            sender: "bot",
            text: `Sure, here's what I found about "${text}".`,
            time: timestamp,
          })
      );
      setLoading(false);
    }, 2000);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-[Inter]">
      <style>{`
        .typing-dots span {
          display: inline-block;
          animation: blink 1.5s infinite;
        }
        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes blink {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`max-w-[60%] px-4 py-3 text-sm rounded-2xl relative group ${
                msg.sender === "user"
                  ? "ml-auto bg-gradient-to-br from-purple-500 to-indigo-500 text-white"
                  : msg.sender === "bot"
                  ? "mr-auto bg-[#1a1a1a] border border-white/10 text-gray-100"
                  : "mr-auto text-gray-400 italic typing-dots"
              }`}
            >
              {msg.sender === "typing" ? (
                <span><span>.</span><span>.</span><span>.</span></span>
              ) : (
                <>
                  <div>{msg.text}</div>
                  {msg.sender === "bot" && (
                    <button
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-xs text-gray-400 hover:text-white"
                      onClick={() => handleCopy(msg.text)}
                    >
                      <Copy size={14} />
                    </button>
                  )}
                  <div className="text-[10px] text-gray-500 text-right mt-1">{msg.time}</div>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>
      {/* Sticky Input Bar */}
      <div className="sticky bottom-0 w-full bg-gradient-to-t from-[#0a0a0a] via-black/20 to-transparent px-4 py-4 backdrop-blur-md">
        {/* Suggestion Chips */}
        <div className="flex gap-2 mb-3 flex-wrap">
          {["Summarize", "Fix grammar", "Generate caption"].map((chip, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 text-sm text-gray-300 px-4 py-1.5 rounded-full border border-white/10 hover:bg-white/20 transition"
              onClick={() => setInput(chip)}
            >
              {chip}
            </motion.button>
          ))}
        </div>

        {/* Input Field */}
        <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 shadow-lg focus-within:ring-2 ring-purple-600 transition-all">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type your thoughts..."
            className="flex-1 resize-none bg-transparent text-white placeholder:text-gray-400 text-base py-1 focus:outline-none"
            style={{ maxHeight: "100px", overflowY: "auto" }}
          />
          <motion.button
            onClick={handleSend}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-3 p-2 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white hover:shadow-[0_0_10px_rgba(168,85,247,0.5)] transition"
          >
            <SendHorizonal size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
