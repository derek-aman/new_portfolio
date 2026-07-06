"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal Line growing
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".footer-reveal-container",
        start: "top 80%",
      }
    });

    tl.to('.footer-line', { width: "100%", duration: 1.5, ease: "expo.out" })
      .fromTo('.footer-text', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1 }, "-=1");

  }, { scope: container });

  return (
    <footer id="contact" ref={container} className="relative overflow-hidden bg-black px-6 pt-32 pb-4 text-white md:px-24">
      {/* Intense Ambient Glow Behind Giant Text */}
      <div className="absolute bottom-0 left-1/2 h-[40rem] w-[80%] -translate-x-1/2 translate-y-1/2 rounded-[100%] bg-gradient-to-r from-orange-500/20 to-blue-500/20 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col">
        
        {/* Top Info block */}
        <div className="mb-32 flex flex-col items-start justify-between gap-12 md:flex-row md:items-end">
          <div className="max-w-md">
            <p className="mb-8 text-lg text-neutral-300 font-light">
              Open to internships, backend collabs, and problems that don't have a Stack Overflow answer.
            </p>
            <a 
              href="mailto:amanwork.co.in@email.com" 
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold uppercase text-white backdrop-blur-md transition-all hover:bg-white hover:text-black hover:border-white shadow-[0_0_0_rgba(249,115,22,0)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]"
            >
              <span className="relative z-10 flex items-center gap-2">Say Hello <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" /></span>
            </a>
          </div>

          <div className="flex flex-col gap-6 text-right">
            <a href="https://github.com" target="_blank" className="group flex items-center justify-end gap-2 text-2xl font-black uppercase tracking-tighter transition-all hover:text-orange-500 hover:-translate-x-2">
              GitHub <ArrowUpRight className="h-6 w-6 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
            </a>
            <a href="https://linkedin.com" target="_blank" className="group flex items-center justify-end gap-2 text-2xl font-black uppercase tracking-tighter transition-all hover:text-blue-500 hover:-translate-x-2">
              LinkedIn <ArrowUpRight className="h-6 w-6 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
            </a>
          </div>
        </div>

        {/* Giant Text */}
        <div className="footer-reveal-container relative pb-16 text-center">
          <div className="footer-line absolute top-0 left-1/2 h-[1px] w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          
          <h2 className="text-[12vw] font-black uppercase leading-[0.8] tracking-tighter mt-16 sm:text-[10vw]">
            <div className="footer-text opacity-0">LET'S BUILD</div>
            <div className="footer-text opacity-0">SOMETHING</div>
            <div className="footer-text opacity-0 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-500">REAL.</div>
          </h2>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-[10px] font-bold uppercase tracking-widest text-neutral-500 md:flex-row">
          <span>AMAN.DEV — Backend Engineer</span>
          <span>© 2025 — Built with Node.js & strong opinions</span>
          <span>Haldia, India 🇮🇳</span>
        </div>

      </div>
    </footer>
  );
}
