export function Marquee() {
  const items = [
    "NODE.JS", "MONGODB", "REDIS", "SOCKET.IO", "BULLMQ", "JWT", 
    "LANGCHAIN", "QDRANT", "GROQ LLAMA", "LANGGRAPH", "DOCKER", 
    "REACT.JS", "EXPRESS", "REST APIs", "JAVA"
  ];

  return (
    <div className="relative flex w-full overflow-hidden border-y border-white/10 bg-black py-4">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Render twice for continuous loop */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center">
            {items.map((item, j) => (
              <span key={j} className="mx-4 flex items-center text-sm font-semibold uppercase tracking-widest text-neutral-400">
                {item}
                <span className="mx-4 text-neutral-700">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
