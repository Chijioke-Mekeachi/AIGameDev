"use client";

import { useRef, useState } from "react";

export default function MidScreen() {
  const [view, setView] = useState("editor"); // 'editor' or 'preview'

  // Default starter code (HTML + CSS + JS)
  const [code, setCode] = useState(`<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: black; margin: 0; }
    canvas { display: block; margin: 0 auto; background: #222; }
  </style>
</head>
<body>
  <canvas id="gameCanvas" width="400" height="400"></canvas>
  <script>
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    let x = 200, y = 200;
    document.addEventListener("keydown", e => {
      if(e.key === "ArrowUp") y -= 10;
      if(e.key === "ArrowDown") y += 10;
      if(e.key === "ArrowLeft") x -= 10;
      if(e.key === "ArrowRight") x += 10;
    });

    function draw() {
      ctx.fillStyle = "black";
      ctx.fillRect(0,0,400,400);
      ctx.fillStyle = "red";
      ctx.fillRect(x, y, 20, 20);
      requestAnimationFrame(draw);
    }
    draw();
  </script>
</body>
</html>`);

  const textareaRef = useRef(null);

  return (
    <section className="bg-black w-full md:w-3/5 h-screen flex flex-col border-r border-gray-700">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-4 py-3 bg-gray-800 border-b border-gray-700">
        <h2 className="text-gray-300 text-lg font-semibold">Mid Screen</h2>
        <div className="space-x-2">
          <button
            onClick={() => setView("editor")}
            className={`px-4 py-1 rounded text-sm ${
              view === "editor"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Code
          </button>
          <button
            onClick={() => setView("preview")}
            className={`px-4 py-1 rounded text-sm ${
              view === "preview"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Code / Preview Area */}
      <div className="flex-1 overflow-auto p-4">
        {view === "editor" ? (
          <textarea
            ref={textareaRef}
            className="w-full h-full resize-none bg-transparent text-gray-200 outline-none font-mono text-sm"
            placeholder="Write HTML, CSS, JS..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        ) : (
          <iframe
            title="preview"
            className="w-full h-full bg-white rounded-lg"
            sandbox="allow-scripts allow-same-origin"
            srcDoc={code}
          />
        )}
      </div>
    </section>
  );
}
