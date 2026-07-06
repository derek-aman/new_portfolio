"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Vibrant Quote Reveal
    gsap.fromTo('.philosophy-word',
      { y: 50, opacity: 0, rotateX: -90 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.1, ease: "back.out(1.5)", transformOrigin: "bottom center",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        }
      }
    );
  }, { scope: container });

  const line1 = "GOOD CODE IS LIKE A GOOD SYSTEM.".split(" ");
  const line2 = "INVISIBLE WHEN IT WORKS.".split(" ");

  return (
    <section ref={container} className="bg-black py-40 px-6 overflow-hidden flex items-center justify-center relative perspective-[1000px]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[20rem] bg-orange-500/10 blur-[150px] mix-blend-screen pointer-events-none" />
      
      <div className="max-w-4xl text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-black uppercase text-white leading-tight">
          <div className="mb-4">
            {line1.map((w, i) => (
              <span key={i} className="philosophy-word inline-block mr-4 text-transparent text-stroke-white text-stroke-2">
                {w}
              </span>
            ))}
          </div>
          <div>
            {line2.map((w, i) => (
              <span key={i} className="philosophy-word inline-block mr-4 text-orange-500 hover:text-blue-500 hover:scale-110 transition-all duration-300">
                {w}
              </span>
            ))}
          </div>
        </h2>
      </div>
    </section>
  );
}
