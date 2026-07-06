"use client";

import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Elegant slide up for text elements
    gsap.fromTo('.about-anim', 
      { opacity: 0, y: 40 },
      { 
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        }
      }
    );

    // Number counters snap setup
    gsap.utils.toArray<HTMLElement>('.stat-num').forEach(el => {
      const target = parseFloat(el.dataset.val || "0");
      gsap.fromTo(el, 
        { textContent: 0 },
        { 
          textContent: target, duration: 2, ease: "power2.out", snap: { textContent: 1 },
          scrollTrigger: { trigger: el, start: "top 85%" }
        }
      );
    });
  }, { scope: container });

  return (
    <section id="about" ref={container} className="relative bg-black py-40 px-6 md:px-24 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-0 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-16 lg:flex-row">
          
          <div className="flex flex-col justify-between lg:w-1/2 relative">
            <h2 className="about-anim text-6xl font-black uppercase leading-[0.9] tracking-tighter text-white md:text-8xl relative inline-block">
              I design<br/>
              <span className="text-transparent text-stroke-white text-stroke-2">systems,</span><br/>
              not just<br/>
              <span className="text-orange-500">endpoints.</span>
            </h2>

            <div className="about-anim mt-16 lg:mt-auto glass p-8 rounded-3xl relative overflow-hidden group">
              {/* Internal abstract hover gradient */}
              <div className="absolute -inset-10 bg-gradient-to-r from-orange-500/20 to-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              {/* Counter Stats within glass */}
              <div className="relative z-10 grid grid-cols-3 gap-6 text-white border-b border-white/10 pb-8">
                <div>
                  <div className="text-4xl font-black text-transparent text-stroke-blue text-stroke-2 stat-num" data-val="4">0</div>
                  <div className="mt-2 text-[10px] text-neutral-400 uppercase tracking-widest leading-tight">Projects<br/>shipped</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-transparent text-stroke-blue text-stroke-2"><span className="stat-num" data-val="2">0</span>+</div>
                  <div className="mt-2 text-[10px] text-neutral-400 uppercase tracking-widest leading-tight">Years in<br/>stack</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-transparent text-stroke-blue text-stroke-2 stat-num" data-val="3">0</div>
                  <div className="mt-2 text-[10px] text-neutral-400 uppercase tracking-widest leading-tight">AI systems<br/>built</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="relative z-10 mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="#work" className="group relative overflow-hidden flex items-center justify-center rounded-xl border border-orange-500/50 bg-orange-500/10 px-8 py-4 text-xs font-bold uppercase tracking-widest text-orange-500 transition-all hover:border-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                  <span className="absolute inset-0 bg-orange-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out z-0"/>
                  <span className="relative z-10 group-hover:text-black transition-colors">View My Work</span>
                </a>
                <a href="resume/bio_resume_cv_akr.pdf" className="group relative flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-transparent px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white/5 hover:border-white/40">
                  <span>Download Resume</span>
                  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1 group-hover:text-blue-500" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center text-lg leading-relaxed text-neutral-300 lg:w-1/2">
            <p className="about-anim mb-8 text-xl font-light">
              Backend engineering isn't just about making APIs work — it's about making them work under pressure, at <span className="font-bold text-white">scale</span>, without falling apart at 3am.
            </p>
            <p className="about-anim mb-8 text-neutral-400">
              I'm Aman, a pre-final year B.Tech Electrical Engineering student building full-stack systems that handle real load. My stack centers on Node.js, MongoDB, Redis, and BullMQ — layered with AI capabilities through RAG pipelines, LangGraph agents, and vector search via Qdrant.
            </p>
            <p className="about-anim mb-12 text-neutral-400">
              I've contributed to open source through GSSoC, and I'm actively seeking backend SDE internship roles where I can ship real features on real systems.
            </p>

            {/* Stat Row */}
            <div className="about-anim flex flex-wrap gap-4 border-t border-white/10 pt-8 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
              <span className="rounded-lg border border-white/10 bg-black px-4 py-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:border-orange-500/50 hover:text-orange-500 transition-colors">GSSoC Contributor</span>
              <span className="rounded-lg border border-white/10 bg-black px-4 py-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:border-blue-500/50 hover:text-blue-500 transition-colors">4 Production Projects</span>
              <span className="rounded-lg border border-white/10 bg-black px-4 py-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:border-orange-500/50 hover:text-orange-500 transition-colors">Node.js + AI Stack</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
