"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export function Overlay({ scrollYProgress }: OverlayProps) {
  // Master fade
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);

  // Independent Parallax Shifts
  // AMAN drifts up slightly faster
  const amanY = useTransform(scrollYProgress, [0, 0.15], [0, -300]);
  // KUMAR drifts up a bit slower for depth
  const kumarY = useTransform(scrollYProgress, [0, 0.15], [0, -200]);

  const amanLetters = "AMAN".split("");
  const kumarLetters = "KUMAR".split("");

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 z-10 flex px-8 md:px-16 items-center justify-between"
    >
      {/* AMAN - VERTICAL LEFT COMPRESSED */}
      <motion.div 
        style={{ y: amanY }}
        className="flex flex-col text-transparent text-stroke-blue text-stroke-2 md:text-stroke-4 font-black tracking-tighter text-[12vh] md:text-[20vh] leading-[0.75] select-none"
      >
        {amanLetters.map((l, i) => (
          <span key={`aman-${i}`} className="flex items-center justify-center h-[0.85em] hover:text-white transition-colors duration-500">{l}</span>
        ))}
      </motion.div>

      {/* KUMAR - VERTICAL RIGHT COMPRESSED */}
      <motion.div 
        style={{ y: kumarY }}
        className="flex flex-col text-transparent text-stroke-orange text-stroke-2 md:text-stroke-4 font-black tracking-tighter text-[12vh] md:text-[20vh] leading-[0.75] select-none md:mr-16 mr-8"
      >
        {kumarLetters.map((l, i) => (
          <span key={`kumar-${i}`} className="flex items-center justify-center h-[0.75em] hover:text-stroke-white transition-colors duration-500">{l}</span>
        ))}
      </motion.div>

      {/* Floating Elements (Keep to anchor the design) */}
      <motion.div 
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-8 md:left-16 origin-bottom-left -rotate-90 transform uppercase tracking-[0.3em] text-[10px] text-neutral-500 pointer-events-auto flex items-center gap-3"
      >
        <div className="h-[1px] w-6 bg-neutral-500" /> SCROLL TO EXPLORE
      </motion.div>
      <div className="absolute bottom-12 right-8 md:right-32 text-[10px] font-semibold tracking-widest text-neutral-500 pointer-events-auto">
        ©2025
      </div>
    </motion.div>
  );
}
