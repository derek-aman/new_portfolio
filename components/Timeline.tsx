"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Timeline() {
  const events = [
    {
      year: "2023",
      text: "Started B.Tech in Electrical Engineering, MAKAUT. Realized I preferred building software over circuits."
    },
    {
      year: "2024",
      text: "Learned MERN stack from scratch. Built first full-stack app. Shipped it. Understood why backend is where the real complexity lives."
    },
    {
      year: "2025",
      text: "Added Redis, BullMQ, Socket.io to the arsenal. Started thinking about systems, not just features. Contributed to open source via GSSoC.Built RAG pipeline with Qdrant + LangGraph. Understood that AI isn't magic — it's architecture. Shipped 4 production-level projects."
    },
    {
      year: "Now",
      text: "Actively seeking backend SDE internship. Ready to own a feature, survive a code review, and fix a bug at 2am."
    }
  ];

  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Gradient Timeline Line Fill
    gsap.fromTo('.timeline-line-glow', 
      { height: 0 },
      { 
        height: "100%", 
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1
        }
      }
    );

    // Timeline dots turning blue
    gsap.utils.toArray('.timeline-item').forEach((itemUnknown) => {
      const item = itemUnknown as HTMLElement;
      const dot = item.querySelector('.timeline-dot');
      gsap.to(dot, {
        backgroundColor: "#3b82f6",
        boxShadow: "0 0 20px rgba(59, 130, 246, 0.8)",
        borderColor: "#f97316",
        scrollTrigger: {
          trigger: item,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

      // Item slide in
      gsap.fromTo(item, 
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 85%" } }
      );
    });

  }, { scope: container });

  return (
    <section ref={container} className="bg-[#020202] py-32 px-6 md:px-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-24 text-5xl font-black uppercase tracking-tighter text-white md:text-7xl text-center">
          HOW I<br />
          <span className="text-transparent text-stroke-blue text-stroke-2">GOT HERE.</span>
        </h2>

        <div className="timeline-container relative ml-4 md:ml-[150px] pb-16">
          {/* Default Line */}
          <div className="absolute left-0 top-0 h-full w-[2px] bg-white/10" />
          
          {/* Animating Glowing Line */}
          <div className="timeline-line-glow absolute left-0 top-0 w-[2px] bg-gradient-to-b from-orange-500 via-blue-500 to-orange-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />

          {/* Events */}
          {events.map((event, idx) => (
            <div 
              key={idx}
              className="timeline-item relative mb-24 pl-12 md:pl-24 group opacity-0"
            >
              {/* Animating Node */}
              <div className="timeline-dot absolute -left-2 top-2 h-4 w-4 rounded-full border-4 border-black bg-neutral-600 transition-colors duration-300" />
              
              <div className="flex flex-col md:flex-row md:items-start md:gap-12 relative">
                {/* Glow behind text on hover */}
                <div className="absolute top-0 left-0 w-full h-full bg-blue-500/0 group-hover:bg-blue-500/5 blur-3xl transition-colors duration-500 pointer-events-none" />
                
                <div className="mb-4 text-2xl font-black tracking-tighter text-white group-hover:text-orange-500 transition-colors duration-300 md:absolute md:-left-[150px] md:mb-0 md:w-32 md:text-right">
                  {event.year}
                </div>
                <div className="glass p-6 md:p-8 rounded-2xl md:w-full group-hover:border-blue-500/30 transition-colors duration-300 relative z-10">
                  <p className="text-sm md:text-base leading-relaxed text-neutral-400 group-hover:text-neutral-200 transition-colors">
                    {event.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
