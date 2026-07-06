"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    // Use GSAP quickTo for zero-latency tracking
    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0, ease: "none" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0, ease: "none" });
    
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.15, ease: "power3" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.15, ease: "power3" });

    let isHovering = false;

    const moveMouse = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.closest("button")) {
        isHovering = true;
        gsap.to(ring, { scale: 1.5, borderColor: "#3b82f6", backgroundColor: "rgba(59, 130, 246, 0.1)", duration: 0.3 });
        gsap.to(cursor, { scale: 0, duration: 0.3 });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.closest("button")) {
        isHovering = false;
        gsap.to(ring, { scale: 1, borderColor: "rgba(255, 255, 255, 0.5)", backgroundColor: "transparent", duration: 0.3 });
        gsap.to(cursor, { scale: 1, duration: 0.3 });
      }
    };

    const handleMouseDown = () => {
      if (isHovering) {
        gsap.to(ring, { scale: 0.9, duration: 0.1 });
      } else {
        gsap.to(ring, { scale: 0.8, duration: 0.1 });
      }
    };

    const handleMouseUp = () => {
      if (isHovering) {
        gsap.to(ring, { scale: 1.5, duration: 0.3, ease: "elastic.out(1, 0.3)" });
      } else {
        gsap.to(ring, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.3)" });
      }
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500 opacity-0 md:opacity-100"
      />
      <div 
        ref={ringRef} 
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50 opacity-0 md:opacity-100"
      />
    </>
  );
}
