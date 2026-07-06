"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// lucide-react's "Github" icon is deprecated/removed in newer versions,
// so we use a small inline SVG instead of importing it.
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.016-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.763-1.605-2.665-.303-5.467-1.333-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23A11.5 11.5 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.624-5.48 5.92.43.372.814 1.103.814 2.222 0 1.606-.014 2.898-.014 3.293 0 .32.216.694.825.576C20.565 21.795 24 17.297 24 12c0-6.63-5.373-12-12-12z" />
    </svg>
  );
}

const projects = [
  {
    id: "01",
    title: "NETWORQ",
    category: "Full Stack Social",
    desc: "LinkedIn rebuilt: Redis caching, BullMQ queues, Socket.io.",
    color: "from-[#00f0ff]/20 to-transparent",
    accent: "text-[#00f0ff]",
    image: "/projects/network.png",
    liveLink: "https://networq-olive.vercel.app/",
    githubLink: "https://github.com/derek-aman/socialmedia"
  },
  {
    id: "02",
    title: "DOCHAT",
    category: "AI Agentic Workflow",
    desc: "RAG architecture querying Qdrant vectors with LangGraph loops.",
    color: "from-[#ff3e00]/20 to-transparent",
    accent: "text-[#ff3e00]",
    image: "/projects/doc_chat.png",
    liveLink: "https://docchat-orpin.vercel.app/",
    githubLink: "https://github.com/derek-aman/DocChat"
  },
  {
    id: "03",
    title: "BOOKING AGENT",
    category: "LLM Backend",
    desc: "Conversational unstructured data parsing to strict DB insertions.",
    color: "from-[#00f0ff]/20 to-transparent",
    accent: "text-[#00f0ff]",
    image: "/projects/agent.png",
    liveLink: null,
    githubLink: "https://github.com/derek-aman/Booking_agent"
  },
  {
    id: "04",
    title: "RETURN ANALYZER",
    category: "E-commerce AI",
    desc: "Groq LLaMA classification engine parsing massive merchant histories.",
    color: "from-[#ff3e00]/20 to-transparent",
    accent: "text-[#ff3e00]",
    image: "/projects/return_reason.png",
    liveLink: "https://return-analyzer.vercel.app/",
    githubLink: "https://github.com/derek-aman/return-analyzer"
  }
];

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const sections = gsap.utils.toArray('.horizontal-project');

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + track.offsetWidth,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={containerRef} className="bg-black relative overflow-hidden h-screen flex flex-col justify-center border-t border-white/5">

      <div className="absolute top-12 left-6 md:left-24 z-20 flex items-center gap-6">
        <h2 className="text-xl font-black uppercase tracking-widest text-white">SELECTED WORK</h2>
        <div className="h-[1px] w-24 bg-white/20" />
      </div>

      <div ref={trackRef} className="flex relative items-center h-full w-[400vw] lg:w-[300vw]">

        {projects.map((project, idx) => (
          <div key={idx} className="horizontal-project w-screen lg:w-[75vw] h-full flex flex-col justify-center px-6 md:px-24 shrink-0 relative group">

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-white/[0.02] -z-10 pointer-events-none select-none">
              {project.id}
            </div>

            <div className={`absolute top-0 bottom-0 left-0 w-1/3 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10 pointer-events-none`} />

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 h-[60vh] lg:h-[70vh] items-center justify-center w-full max-w-7xl mx-auto">

              {/* Image Block */}
              <div className="w-full lg:w-1/2 h-full rounded-2xl overflow-hidden glass relative group/image cursor-none border-white/10">
                <div className="absolute inset-0 bg-[#050505]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain opacity-80 group-hover/image:opacity-40 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Hover Reveal: Live + GitHub links */}
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center gap-4 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500">
                  {project.liveLink ? (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-white/50 text-white rounded-full px-6 py-4 font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-black transition-colors flex items-center gap-2"
                    >
                      Live <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : null}

                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white/50 text-white rounded-full px-6 py-4 font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-black transition-colors flex items-center gap-2"
                  >
                    Code <GithubIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Text Block */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-8">
                  <span className={`text-xs font-bold tracking-[0.3em] uppercase ${project.accent}`}>
                    {"// " + project.category}
                  </span>
                </div>
                <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6 group-hover:tracking-normal transition-all duration-700">
                  {project.title}
                </h3>
                <p className="text-xl md:text-2xl font-light text-neutral-400 mb-12 max-w-xl leading-relaxed">
                  {project.desc}
                </p>
                <div className="flex items-center gap-6">
                  <div className="h-[1px] w-12 bg-white/30" />
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Scroll to navigate</span>
                </div>
              </div>

            </div>

          </div>
        ))}

      </div>
    </section>
  );
}