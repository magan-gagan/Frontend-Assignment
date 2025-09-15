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

    // Highlight each word by increasing opacity
    wordRefs.current.forEach((word, i) => {
      tl.to(word, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      }, "+=0.1");
    });

    // Animate cards after words
    cardsRef.current.forEach((card) => {
      tl.fromTo(
        card,
        { x: 300, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 },
        "+=0.5"
      );
    });

    // Fade out text AFTER cards
    tl.to(wordRefs.current, {
      opacity: 0,
      duration: 1,
      stagger: 0.05,
    }, "+=0.5");
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
      className="h-screen bg-black text-white flex flex-col items-center justify-center"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-gray-200 leading-relaxed text-center flex flex-wrap justify-center">
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

      <div className="flex flex-row space-x-8 w-full max-w-6xl justify-center mt-12">
        <div
          ref={addToCardRefs}
          className="p-6 bg-gray-800 rounded-xl shadow-lg opacity-0 flex flex-col justify-between items-center text-center min-h-[300px]"
        >
          {/* Icon Grid */}
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center text-black text-xl">🎯</div>
            <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center text-black text-xl">🧩</div>
            <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center text-black text-xl">🎮</div>
            <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center text-black text-xl">🃏</div>
            <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center text-black text-xl">🧠</div>
            <div className="w-12 h-12 border-4 border-orange-500 border-b-blue-500 bg-white rounded-md flex items-center justify-center text-black text-xl">
              🎳
            </div>
          </div>

          {/* Description */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Choose a game</h3>
            <p className="text-gray-300">
              Browse our collection of interactive games that fits your audience
            </p>
          </div>
        </div>
        <div
          ref={addToCardRefs}
          className="p-6 bg-gray-800 rounded-xl shadow-lg opacity-0 flex flex-col justify-between items-center text-center min-h-[300px]"
        >
          {/* Image */}
          <img
            src="/customize.jpg" // Make sure this image exists in your public/images folder
            className="w-full h-40 object-cover rounded-md mb-4"
          />

          {/* Icon Grid */}
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            <div className="w-12 h-12"></div>
            <div className="w-12 h-12"></div>
            <div className="w-12 h-12"></div>
            <div className="w-12 h-12"></div>
            <div className="w-12 h-12"></div>
            <div className="w-12 h-12"></div>
          </div>

          {/* Description */}
          <div className="text-center mt-4">
            <h3 className="text-2xl font-bold text-white mb-2">Customize & Configure</h3>
            <p className="text-gray-300">
              Set up triggers, rewards and visual elements without code.
            </p>
          </div>
        </div>


        <div
          ref={addToCardRefs}
          className="p-6 bg-gray-800 rounded-xl shadow-lg opacity-0 flex flex-col justify-between items-center text-center min-h-[300px]"
        >
          {/* Rectangle Icon */}
          <div className="w-60 h-12 bg-orange-500 rounded-3xl flex items-center justify-center text-white text-xl shadow-md self-center mt-12">
            Play now
          </div>

          {/* Description */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Deploy Instantly</h3>
            <p className="text-gray-300">
              Add a single line of code and start boosting engagement immediately.
            </p>
          </div>
        </div>





      </div>
    </section>
  );
}
