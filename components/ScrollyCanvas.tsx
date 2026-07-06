"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Overlay } from "./Overlay";

const FRAME_COUNT = 102;

export function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load images on mount
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      let loadedCount = 0;
      
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.src = `/sequence/${String(i).padStart(4, "0")}.webp`;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === FRAME_COUNT) {
            setLoaded(true);
          }
        };
        loadedImages.push(img);
      }
      setImages(loadedImages);
    };
    loadImages();
  }, []);

  // Set up scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0 to 1) to frame index (0 to 101)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Render on canvas when frameIndex or images change
  const renderCanvas = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !images[index]) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];

    // Responsive Canvas Resizing with object-fit: cover logic
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      // Canvas is taller than image
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Render first frame when loaded
  useEffect(() => {
    if (loaded && images.length > 0) {
      // Initial render resize listener
      const handleResize = () => renderCanvas(Math.round(frameIndex.get()));
      window.addEventListener("resize", handleResize);
      renderCanvas(0);
      return () => window.removeEventListener("resize", handleResize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, images]);

  // Re-render when scroll updates
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (loaded) {
      renderCanvas(Math.round(latest));
    }
  });

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Loading State */}
        {!loaded && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
            <span className="text-white text-sm tracking-widest uppercase">
              Loading Experience...
            </span>
          </div>
        )}

        {/* Text Overlays - Handled via Framer Motion inside sticky element */}
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
