"use client";

import { useEffect, useRef, useState } from "react";

export default function MidScreen() {
  const [view, setView] = useState("editor"); // 'editor' or 'preview'
  const playgroundRef = useRef(null);
  const pgInstance = useRef(null);


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

      {/* Code/Preview Container */}
      <div className="flex-1 overflow-hidden">
        <div id="livecodes-container" ref={playgroundRef} className="w-full h-full" />
      </div>
    </section>
  );
}
