"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const faqs = [
  {
    q: "What kind of roles are you targeting?",
    a: "Backend SDE internships — primarily Node.js, with interest in distributed systems, API design, and AI-integrated backends. Open to full-stack roles where backend is the primary focus."
  },
  {
    q: "Are you available for freelance or contract work?",
    a: "Yes, selectively. I take on backend projects where there's a real problem to solve — not just a CRUD wrapper to build."
  },
  {
    q: "What's your strongest technical area?",
    a: "Node.js + async backend architecture — specifically around Redis caching strategies, BullMQ job queues, Socket.io real-time systems, and JWT auth flows. I've debugged all of these in production-grade projects, not just tutorials."
  },
  {
    q: "How do you approach system design?",
    a: "I start with the failure cases. What breaks at scale? What breaks under concurrent load? I design for the edge, then optimize for the happy path."
  },
  {
    q: "Do you have open source experience?",
    a: "Yes — GSSoC (GirlScript Summer of Code) contributions. I've reviewed PRs, fixed real bugs, and understood what it means to write code that other people will read."
  }
];

interface FAQItemProps {
  faq: { q: string; a: string };
  isOpen: boolean;
  onClick: () => void;
}

function FAQItem({ faq, isOpen, onClick }: FAQItemProps) {
  const answerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!answerRef.current || !innerRef.current) return;
    if (isOpen) {
      const height = innerRef.current.getBoundingClientRect().height;
      gsap.to(answerRef.current, { height: height, duration: 0.5, ease: "expo.inOut" });
    } else {
      gsap.to(answerRef.current, { height: 0, duration: 0.5, ease: "expo.inOut" });
    }
  }, [isOpen]);

  return (
    <div className={`border-b border-white/10 group transition-colors duration-500 ${isOpen ? "bg-white/[0.02]" : "hover:bg-white/[0.02]"}`}>
      <button 
        onClick={onClick} 
        className="flex w-full items-center justify-between py-8 px-4 md:px-8 text-left"
      >
        <span className={`text-lg font-black uppercase tracking-tighter md:text-2xl transition-colors duration-300 ${isOpen ? 'text-orange-500' : 'text-white group-hover:text-blue-500'}`}>
          {faq.q}
        </span>
        <span className="relative flex h-8 w-8 items-center justify-center shrink-0 rounded-full border border-white/20 group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-colors">
          <span className={`absolute h-[2px] w-4 rounded-full transition-colors duration-300 ${isOpen ? "bg-orange-500" : "bg-white"}`} />
          <span className={`absolute h-4 w-[2px] rounded-full transition-all duration-300 origin-center ${isOpen ? "scale-y-0 rotate-90 bg-orange-500" : "scale-y-100 rotate-0 bg-white"}`} />
        </span>
      </button>
      <div ref={answerRef} className="overflow-hidden px-4 md:px-8" style={{ height: 0 }}>
        <div ref={innerRef} className="pb-8 pr-12">
          <p className="text-sm md:text-base leading-[1.8] text-neutral-400">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-black py-40 px-6 md:px-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 lg:flex-row lg:items-start relative">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

        <div className="lg:w-1/3 relative z-10">
          <h2 className="text-5xl font-black uppercase tracking-tighter text-white md:text-7xl sticky top-32">
            QUICK<br />
            <span className="text-transparent text-stroke-blue text-stroke-2">ANSWERS.</span>
          </h2>
        </div>

        <div className="flex w-full flex-col lg:w-2/3 border-t border-white/10 relative z-10">
          {faqs.map((faq, idx) => (
            <FAQItem 
              key={idx} 
              faq={faq} 
              isOpen={openIndex === idx} 
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
