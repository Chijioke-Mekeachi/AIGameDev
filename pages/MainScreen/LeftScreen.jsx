"use client";

import { useState, useRef } from "react";

export default function LeftScreen() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const textareaRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const prompt = message;
    setChat(prev => [...prev, { role: "user", content: prompt }]);
    setMessage("");
    setIsTyping(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "HTTP-Referer": "<YOUR_SITE_URL>",
          "X-Title": "<YOUR_SITE_NAME>",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b:free",
          messages: [
            ...chat,
            { role: "user", content: prompt }
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      const aiReply = data.choices?.[0]?.message?.content || "🤖 No response received.";

      setChat(prev => [
        ...prev,
        { role: "assistant", content: aiReply },
      ]);
    } catch (error) {
      setChat(prev => [
        ...prev,
        { role: "assistant", content: `❌ Error: ${error.message}` },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleInput = (e) => {
    setMessage(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <section className="bg-black w-full md:w-1/5 border-r border-gray-700 flex flex-col py-6 px-4 space-y-4">
      {/* Title */}
      <h2 className="text-xl font-bold text-blue-400 text-center tracking-widest uppercase">
        Build With GameDev
      </h2>

      {/* Chat Display */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {chat.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg text-sm break-words max-w-full ${
              msg.role === "user"
                ? "bg-blue-800 text-white self-end"
                : "bg-gray-700 text-green-200 self-start"
            }`}
          >
            {msg.role === "user" ? `You: ${msg.content}` : `AI: ${msg.content}`}
          </div>
        ))}

        {isTyping && (
          <div className="bg-gray-700 text-yellow-300 p-3 rounded-lg text-sm animate-pulse">
            AI is thinking...
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="flex items-center gap-2 bg-gray-900 border border-blue-800 px-4 py-2 shadow-lg rounded-lg">
        <textarea
          ref={textareaRef}
          rows={1}
          className="flex-1 resize-none overflow-hidden bg-transparent outline-none text-sm text-gray-200 placeholder-gray-500 py-1"
          placeholder="Start building..."
          value={message}
          onChange={handleInput}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        {/* Free Fire-style Button (No external fonts/libraries) */}
        <button
          onClick={sendMessage}
          disabled={isTyping}
          className={`
            relative inline-block px-6 py-2 text-sm font-bold uppercase tracking-wider
            bg-gradient-to-br from-blue-500 to-blue-700
            text-white border-2 border-blue-400
            shadow-[0_0_10px_0_rgba(59,130,246,0.5)]
            rounded-sm
            transform transition-transform duration-150
            hover:scale-105 active:scale-95
            hover:shadow-[0_0_20px_2px_rgba(59,130,246,0.8)]
            disabled:opacity-50 disabled:cursor-not-allowed
            before:absolute before:inset-0 before:-z-10 before:rounded-sm
            before:bg-blue-500 before:blur-md before:opacity-20
          `}
        >
          {isTyping ? "..." : "🔥 Send"}
        </button>
      </div>
    </section>
  );
}
