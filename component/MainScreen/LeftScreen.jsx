"use client";

import { useState, useRef } from "react";

export default function LeftScreen() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const textareaRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  // Color fallbacks (used via inline style) so colors show even if Tailwind misses them
  const colors = {
    panelBg: "#000000",            // black panel
    titleBlue: "#60a5fa",         // roughly tailwind blue-400
    userBg: "#1e3a8a",            // blue-ish (tailwind blue-800)
    userText: "#ffffff",
    aiBg: "#2b2b2f",              // dark gray for AI bubble
    aiText: "#a7f3d0",            // light green-ish for AI text
    codeBg: "#1e1e1e",            // code editor bg
    codeHeaderBg: "#2d2d2d",      // header bar (VSCode-like)
    codeBorder: "#3a3a3a",
    codeText: "#d4d4d4",          // light code text
    inputBg: "#0f1724",           // input background
    buttonBlueStart: "#2563eb",
    buttonBlueEnd: "#1e40af",
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const prompt = message;
    setChat((prev) => [...prev, { role: "user", content: prompt }]);
    setMessage("");
    setIsTyping(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer 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",
          "HTTP-Referer": "<YOUR_SITE_URL>",
          "X-Title": "<YOUR_SITE_NAME>",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b:free",
          messages: [...chat, { role: "user", content: prompt }],
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      const aiReply = data.choices?.[0]?.message?.content || "🤖 No response received.";

      setChat((prev) => [...prev, { role: "assistant", content: aiReply }]);
    } catch (error) {
      setChat((prev) => [
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

  // Parse and render code blocks with VSCode-ish styling
  const renderMessage = (text) => {
    // Regex matches ```lang\ncode```
    const regex = /```(\w+)?\n([\s\S]*?)```/g;
    const elements = [];
    let lastIndex = 0;
    let match;
    let keyCounter = 0;

    while ((match = regex.exec(text)) !== null) {
      const [fullMatch, lang, code] = match;

      if (match.index > lastIndex) {
        const beforeText = text.slice(lastIndex, match.index);
        elements.push(
          <p key={`t-${keyCounter++}`} className="whitespace-pre-wrap leading-relaxed mb-2" style={{ color: colors.aiText }}>
            {beforeText}
          </p>
        );
      }

      elements.push(
        <div
          key={`c-${keyCounter++}`}
          style={{
            backgroundColor: colors.codeBg,
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 6px 18px rgba(0,0,0,0.45)",
            border: `1px solid ${colors.codeBorder}`,
            margin: "12px 0",
          }}
        >
          <div
            style={{
              backgroundColor: colors.codeHeaderBg,
              padding: "6px 12px",
              fontSize: 12,
              color: "#9CA3AF",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', 'Courier New', monospace",
              borderBottom: `1px solid ${colors.codeBorder}`,
            }}
          >
            {lang ? `${lang} code` : "code"}
          </div>

          <pre
            style={{
              padding: 16,
              color: colors.codeText,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', 'Courier New', monospace",
              fontSize: 13,
              overflowX: "auto",
              margin: 0,
              whiteSpace: "pre",
            }}
          >
            <code>{code.trim()}</code>
          </pre>
        </div>
      );

      lastIndex = regex.lastIndex;
    }

    // trailing text
    if (lastIndex < text.length) {
      elements.push(
        <p key={`t-end-${keyCounter++}`} className="whitespace-pre-wrap leading-relaxed" style={{ color: colors.aiText }}>
          {text.slice(lastIndex)}
        </p>
      );
    }

    return elements;
  };

  return (
    <section
      className="w-full md:w-1/5 border-r flex flex-col py-6 px-4 space-y-4"
      style={{ backgroundColor: colors.panelBg, minHeight: "100vh" }}
    >
      {/* Title */}
      <h2
        className="text-xl font-bold text-center tracking-widest uppercase"
        style={{ color: colors.titleBlue }}
      >
        Build With GameDev
      </h2>

      {/* Chat Display */}
      <div className="flex-1 overflow-y-auto pr-1" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {chat.map((msg, idx) => {
          const isUser = msg.role === "user";
          const bubbleStyle = isUser
            ? {
                backgroundColor: colors.userBg,
                color: colors.userText,
                alignSelf: "flex-end",
              }
            : {
                backgroundColor: colors.aiBg,
                color: colors.aiText,
                alignSelf: "flex-start",
              };

          return (
            <div
              key={idx}
              className="p-3 rounded-lg text-sm max-w-full"
              style={{
                ...bubbleStyle,
                maxWidth: "100%",
                borderRadius: 10,
                boxShadow: "0 4px 10px rgba(0,0,0,0.35)",
                wordBreak: "break-word",
              }}
            >
              {isUser ? (
                <span style={{ fontWeight: 600 }}>You: {msg.content}</span>
              ) : (
                <div>
                  <span style={{ fontWeight: 700, display: "block", marginBottom: 6 }}>AI:</span>
                  <div>{renderMessage(msg.content)}</div>
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div
            className="p-3 rounded-lg text-sm"
            style={{
              backgroundColor: colors.aiBg,
              color: "#fbbf24", // yellow-ish
              alignSelf: "flex-start",
            }}
          >
            AI is thinking...
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div
        className="flex items-center gap-2 px-4 py-2 shadow-lg rounded-lg"
        style={{
          backgroundColor: colors.inputBg,
          border: `1px solid ${colors.codeBorder}`,
        }}
      >
        <textarea
          ref={textareaRef}
          rows={1}
          className="flex-1 resize-none overflow-hidden outline-none text-sm placeholder-gray-400 py-1"
          placeholder="Start building..."
          value={message}
          onChange={handleInput}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          style={{
            background: "transparent",
            color: "#E5E7EB",
            border: "none",
            padding: 6,
            fontSize: 14,
            fontFamily: "inherit",
            outline: "none",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={isTyping}
          style={{
            position: "relative",
            padding: "8px 18px",
            fontSize: 13,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            background: `linear-gradient(135deg, ${colors.buttonBlueStart}, ${colors.buttonBlueEnd})`,
            color: "#fff",
            border: "2px solid #60a5fa",
            borderRadius: 6,
            boxShadow: "0 6px 14px rgba(37,99,235,0.28)",
            cursor: isTyping ? "not-allowed" : "pointer",
            opacity: isTyping ? 0.6 : 1,
          }}
        >
          {isTyping ? "..." : "🔥 Send"}
        </button>
      </div>
    </section>
  );
}
