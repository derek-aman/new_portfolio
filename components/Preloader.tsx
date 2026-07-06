"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export function Preloader() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // check reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (container.current) container.current.style.display = 'none';
      window.dispatchEvent(new Event('preloader-finished'));
      return;
    }

    document.body.style.overflow = 'hidden';
    
    const obj = { p: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          gsap.to(container.current, {
            yPercent: -100,
            duration: 1.2,
            ease: "expo.inOut",
            onComplete: () => {
              document.body.style.overflow = '';
              window.dispatchEvent(new Event('preloader-finished'));
            }
          });
        }, 200);
      }
    });

    const chars = textRef.current?.querySelectorAll('.char');
    if (chars?.length) {
      tl.fromTo(chars, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" }
      );
    }

    tl.to(obj, {
      p: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        setProgress(Math.round(obj.p));
      }
    }, "-=0.5");

  }, []);

  return (
    <div ref={container} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
      <div ref={textRef} className="text-4xl font-black text-white tracking-widest flex overflow-hidden">
        {Array.from("AMAN.DEV").map((c, i) => (
          <span key={i} className="char inline-block">{c}</span>
        ))}
      </div>
      <div className="mt-4 text-xs font-mono text-neutral-500">{progress}%</div>
    </div>
  );
}
