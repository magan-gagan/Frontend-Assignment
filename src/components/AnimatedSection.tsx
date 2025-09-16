"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedSection() {
  const wordRefs = useRef<HTMLSpanElement[]>([]);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const addToCardRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-container",
        start: "top top",
        end: "+=3000",
        scrub: true,
        pin: true,
      },
    });

    // Fade in each word
    wordRefs.current.forEach((word, i) => {
      tl.to(
        word,
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        "+=0.1"
      );
    });

    // Fade out all text
    tl.to(
      wordRefs.current,
      {
        opacity: 0,
        duration: 1,
        stagger: 0.05,
      },
      "+=0.5"
    );

    // Animate cards from right to left
    cardsRef.current.forEach((card) => {
      tl.fromTo(
        card,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
        ">"
      );
    });
  }, []);

  const words = [
    { type: "custom", content: <><span className="text-red-500">N</span><span className="text-blue-500">o</span></> },
    { type: "text", content: "developers," },
    { type: "custom", content: <><span className="text-red-500">N</span><span className="text-blue-500">o</span></> },
    { type: "text", content: "developers." },
    { type: "text", content: "Just" },
    { type: "text", content: "select," },
    { type: "text", content: "customise," },
    { type: "text", content: "and" },
    { type: "text", content: "deploy." },
    { type: "text", content: "Go" },
    { type: "text", content: "live" },
    { type: "text", content: "within" },
    { type: "text", content: "minutes," },
    { type: "text", content: "and" },
    { type: "text", content: "let" },
    { type: "text", content: "Engagement" },
    { type: "text", content: "soar." },
  ];

  return (
    <section
      id="scroll-container"
      className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-12 overflow-hidden"
    >
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl z-10">
        {/* Card 1 */}
        <div
          ref={addToCardRefs}
          className="h-[360px] p-6 bg-gray-800 rounded-xl shadow-lg opacity-0 flex flex-col items-center text-center"
        >
          <div className="flex items-center justify-center h-40 mb-4">
            <div className="grid grid-cols-3 grid-rows-2 gap-4">
              {["🎯", "🧩", "🎮", "🃏", "🧠", "🎳"].map((icon, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 bg-white rounded-md flex items-center justify-center text-black text-xl ${
                    icon === "🎳"
                      ? "border-4 border-orange-500 border-b-blue-500"
                      : ""
                  }`}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Choose a game</h3>
          <p className="text-gray-300">
            Browse our collection of interactive games that fits your audience
          </p>
        </div>

        {/* Card 2 */}
        <div
          ref={addToCardRefs}
          className="h-[360px] p-6 bg-gray-800 rounded-xl shadow-lg opacity-0 flex flex-col items-center text-center"
        >
          <div className="flex items-center justify-center h-40 mb-4">
            <img
              src="/customize.png"
              className="max-h-full object-contain rounded-md"
              alt="Customize & Configure"
            />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Customize & Configure</h3>
          <p className="text-gray-300">
            Set up triggers, rewards and visual elements without code.
          </p>
        </div>

        {/* Card 3 */}
        <div
          ref={addToCardRefs}
          className="h-[360px] p-6 bg-gray-800 rounded-xl shadow-lg opacity-0 flex flex-col items-center text-center"
        >
          <div className="flex items-center justify-center h-40 mb-4">
            <div className="w-40 h-12 bg-orange-500 rounded-3xl flex items-center justify-center text-white text-xl shadow-md">
              Play now
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Deploy Instantly</h3>
          <p className="text-gray-300">
            Add a single line of code and start boosting engagement immediately.
          </p>
        </div>
      </div>

      {/* Text */}
      <h2 className="absolute top-0 sm:top-1/2 sm:transform sm:-translate-y-1/2 mt-12 sm:mt-0 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-200 leading-relaxed text-center flex flex-wrap justify-center z-0">
        {words.map((word, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) wordRefs.current[i] = el;
            }}
            className="inline-block mx-1 opacity-10 translate-y-0"
          >
            {word.content}
          </span>
        ))}
      </h2>
    </section>
  );
}
