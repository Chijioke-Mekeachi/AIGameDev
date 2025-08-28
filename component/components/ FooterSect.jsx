"use client";
import { useState } from "react";

function Cube({ icon }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`cube ${hovered ? "hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="face front">
        <img src={icon} alt="icon" />
      </div>
      <div className="face back"></div>
      <div className="face left"></div>
      <div className="face right"></div>
      <div className="face top"></div>
      <div className="face bottom"></div>
    </div>
  );
}

export default function Footer() {
  const items = [
    { name: "GitHub", icon: "/github.png", link: "#" },
    { name: "LinkedIn", icon: "/linkedin.png", link: "#" },
    { name: "Twitter", icon: "/twitter.png", link: "#" },
    { name: "Website", icon: "/globe.svg", link: "#" },
  ];

  return (
    <footer className="mt-20 flex flex-col sm:flex-row justify-between items-center text-gray-400 text-sm font-mono pt-10 border-t border-gray-700">
      <p>&copy; 2025 by JUD-ex `Just Us Developers Extension`</p>

      <div className="flex gap-6 mt-6 sm:mt-0">
        {items.map((item, i) => (
          <a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-24 h-24 flex items-center justify-center"
          >
            <Cube icon={item.icon} />
          </a>
        ))}
      </div>

      <style jsx>{`
        .cube {
          position: relative;
          width: 80px;
          height: 80px;
          transform-style: preserve-3d;
          transform: rotateX(-20deg) rotateY(20deg);
          transition: transform 0.6s ease, scale 0.3s ease;
          animation: float 4s ease-in-out infinite;
        }
        .cube.hovered {
          transform: rotateX(-20deg) rotateY(20deg) scale(1.2);
        }
        .face {
          position: absolute;
          width: 80px;
          height: 80px;
          background: cyan;
          opacity: 0.9;
          border: 2px solid #0ff;
        }
        .face.front {
          transform: translateZ(40px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: black;
        }
        .face.front img {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }
        .face.back {
          transform: rotateY(180deg) translateZ(40px);
        }
        .face.right {
          transform: rotateY(90deg) translateZ(40px);
        }
        .face.left {
          transform: rotateY(-90deg) translateZ(40px);
        }
        .face.top {
          transform: rotateX(90deg) translateZ(40px);
        }
        .face.bottom {
          transform: rotateX(-90deg) translateZ(40px);
        }

        @keyframes float {
          0%,
          100% {
            transform: rotateX(-20deg) rotateY(20deg) translateY(0);
          }
          50% {
            transform: rotateX(-20deg) rotateY(20deg) translateY(-10px);
          }
        }
      `}</style>
    </footer>
  );
}
