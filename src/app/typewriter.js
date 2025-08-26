"use client";
import { useEffect } from "react";

export default function Typewriter() {
  useEffect(() => {
    const texts = [
      "Explore amazing games created with HTML, CSS & JavaScript",
      "Play, learn, and have fun with your favorite games",
      "Build your own games and share them with friends",
      "Challenge yourself and enjoy endless entertainment",
    ];

    let currentText = 0;
    let currentChar = 0;
    let isDeleting = false;

    const speed = 100;
    const deleteSpeed = 50;
    const pause = 2000;
    const element = document.getElementById("typewriter");

    function type() {
      const fullText = texts[currentText];

      if (isDeleting) {
        currentChar--;
        element.textContent = fullText.substring(0, currentChar);
        if (currentChar === 0) {
          isDeleting = false;
          currentText = (currentText + 1) % texts.length;
          setTimeout(type, 500);
        } else {
          setTimeout(type, deleteSpeed);
        }
      } else {
        currentChar++;
        element.textContent = fullText.substring(0, currentChar);
        if (currentChar === fullText.length) {
          isDeleting = true;
          setTimeout(type, pause);
        } else {
          setTimeout(type, speed);
        }
      }
    }

    type();
  }, []);

  return null; // this component only triggers the typewriter effect
}
