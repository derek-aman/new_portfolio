"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------
// Skill Card Definitions & Canvas Texture Art Generators
// -------------------------------------------------------------
interface SkillCard {
  title: string;
  category: string;
  color1: string;
  color2: string;
  desc: string[];
  drawIcon: (ctx: CanvasRenderingContext2D, color2: string) => void;
}

const skills: SkillCard[] = [
  {
    title: "Node.js",
    category: "Backend Engine",
    color1: "#011a14",
    color2: "#00ff87",
    desc: ["Highly concurrent engine", "Event-driven asynchronous design", "Scalable streaming API support"],
    drawIcon: (ctx, color2) => {
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-45, -35); ctx.lineTo(0, 0);
      ctx.moveTo(45, -35); ctx.lineTo(0, 0);
      ctx.moveTo(-35, 40); ctx.lineTo(0, 0);
      ctx.moveTo(35, 40); ctx.lineTo(0, 0);
      ctx.moveTo(0, -50); ctx.lineTo(0, 0);
      ctx.stroke();
      
      const drawNode = (x: number, y: number, r: number, fillWhite: boolean) => {
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2);
        ctx.fillStyle = fillWhite ? "#ffffff" : color2;
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      };
      drawNode(0, 0, 11, true);
      drawNode(-45, -35, 7, false);
      drawNode(45, -35, 7, false);
      drawNode(-35, 40, 7, false);
      drawNode(35, 40, 7, false);
      drawNode(0, -50, 9, false);
    }
  },
  {
    title: "TypeScript",
    category: "Language",
    color1: "#010e1a",
    color2: "#00b0ff",
    desc: ["Strict type system design", "Static validation layers", "Robust modular architecture"],
    drawIcon: (ctx) => {
      ctx.lineWidth = 3;
      ctx.strokeRect(-40, -40, 80, 80);
      ctx.fillStyle = "#ffffff";
      ctx.font = "900 38px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("TS", 0, 2);
    }
  },
  {
    title: "MongoDB",
    category: "Database",
    color1: "#011c09",
    color2: "#00e676",
    desc: ["High-performance JSON docs", "Complex aggregate processing", "Distributed schema clustering"],
    drawIcon: (ctx) => {
      ctx.lineWidth = 2.5;
      const drawCylinder = (y: number) => {
        ctx.beginPath();
        ctx.ellipse(0, y, 32, 9, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-32, y);
        ctx.lineTo(-32, y + 14);
        ctx.arc(0, y + 14, 32, Math.PI, 0, true);
        ctx.lineTo(32, y);
        ctx.stroke();
      };
      drawCylinder(-25);
      drawCylinder(0);
      drawCylinder(25);
    }
  },
  {
    title: "Redis",
    category: "State & Cache",
    color1: "#1d0205",
    color2: "#ff3d00",
    desc: ["Sub-millisecond latency", "Pub/sub event streaming", "Distributed lock mechanics"],
    drawIcon: (ctx, color2) => {
      ctx.lineWidth = 1.5;
      for (let x = -2; x <= 2; x++) {
        for (let y = -2; y <= 2; y++) {
          const isActive = Math.sin(x * 1.5 + y * 0.8) > 0;
          ctx.fillStyle = isActive ? "#ffffff" : color2 + "22";
          ctx.fillRect(x * 16 - 6, y * 16 - 6, 12, 12);
          ctx.strokeRect(x * 16 - 6, y * 16 - 6, 12, 12);
        }
      }
    }
  },
  {
    title: "LangGraph",
    category: "AI Agents",
    color1: "#12021c",
    color2: "#c678ff",
    desc: ["Stateful multi-agent loops", "Recursive token analysis", "Cognitive branching logic"],
    drawIcon: (ctx, _color2) => {
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, 36, 0, Math.PI * 2);
      ctx.stroke();
      
      const drawCircle = (x: number, y: number, char: string) => {
        ctx.fillStyle = _color2;
        ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 9px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(char, x, y);
      };
      drawCircle(0, -36, "R");
      drawCircle(31, 18, "A");
      drawCircle(-31, 18, "G");
    }
  },
  {
    title: "Qdrant",
    category: "Vector Store",
    color1: "#011626",
    color2: "#00d2ff",
    desc: ["High-dimension vector indexing", "Cosine similarity scoring", "RAG document synthesis"],
    drawIcon: (ctx) => {
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-40, 0); ctx.lineTo(40, 0);
      ctx.moveTo(0, -40); ctx.lineTo(0, 40);
      ctx.stroke();
      
      const drawArrow = (x: number, y: number) => {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, Math.PI * 2);
        ctx.fill();
      };
      drawArrow(24, -28);
      drawArrow(-28, -14);
      drawArrow(14, 28);
    }
  },
  {
    title: "BullMQ",
    category: "Queues",
    color1: "#1f1402",
    color2: "#ffab00",
    desc: ["Asynchronous job streams", "Redis-backed rate limiting", "Fault-tolerant retry loops"],
    drawIcon: (ctx) => {
      ctx.lineWidth = 3;
      ctx.strokeRect(-40, -10, 20, 20);
      ctx.strokeRect(-10, -10, 20, 20);
      ctx.strokeRect(20, -10, 20, 20);
      
      ctx.beginPath();
      ctx.moveTo(-50, 16); ctx.lineTo(50, 16);
      ctx.stroke();
      
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(-7, -7, 14, 14);
    }
  },
  {
    title: "Docker",
    category: "DevOps",
    color1: "#011124",
    color2: "#00a2ff",
    desc: ["Isolated service images", "Multi-stage compile pipelines", "Orchestrated scaling layers"],
    drawIcon: (ctx) => {
      ctx.lineWidth = 2.5;
      ctx.strokeRect(-30, 5, 25, 15);
      ctx.strokeRect(5, 5, 25, 15);
      ctx.strokeRect(-12.5, -15, 25, 15);
      
      ctx.beginPath();
      ctx.moveTo(-17.5, 5); ctx.lineTo(-17.5, 20);
      ctx.moveTo(17.5, 5); ctx.lineTo(17.5, 20);
      ctx.moveTo(0, -15); ctx.lineTo(0, 0);
      ctx.stroke();
    }
  },
  {
    title: "Next.js",
    category: "Frontend",
    color1: "#080808",
    color2: "#ffffff",
    desc: ["Hybrid server rendering", "Streaming layouts & suspense", "Edge route optimization"],
    drawIcon: (ctx) => {
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-25, 30);
      ctx.lineTo(-25, -30);
      ctx.lineTo(25, 30);
      ctx.lineTo(25, -30);
      ctx.stroke();
    }
  },
  {
    title: "Tailwind CSS",
    category: "Styling",
    color1: "#01171d",
    color2: "#00f3ff",
    desc: ["Fluid utility design systems", "Adaptive media scaling", "Subtle micro-animations"],
    drawIcon: (ctx) => {
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = -40; x <= 40; x += 1.5) {
        const y1 = Math.sin(x * 0.1) * 15 - 10;
        if (x === -40) ctx.moveTo(x, y1);
        else ctx.lineTo(x, y1);
      }
      ctx.stroke();
      ctx.beginPath();
      for (let x = -40; x <= 40; x += 1.5) {
        const y2 = Math.sin(x * 0.1 + Math.PI) * 15 + 10;
        if (x === -40) ctx.moveTo(x, y2);
        else ctx.lineTo(x, y2);
      }
      ctx.stroke();
    }
  }
];

// Helper to generate dynamic canvas texture
const generateCardTexture = (card: SkillCard) => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 360;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  // Draw card panel
  ctx.save();
  
  // Clean base background
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, card.color1);
  grad.addColorStop(1, "#030303");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Background Grid Overlay
  ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
  ctx.lineWidth = 1;
  const gridSize = 16;
  for (let x = 0; x < canvas.width; x += gridSize) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += gridSize) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
  }

  // Radial glow spot in middle right
  const glow = ctx.createRadialGradient(
    canvas.width - 120, canvas.height / 2, 20,
    canvas.width - 120, canvas.height / 2, 160
  );
  glow.addColorStop(0, card.color2 + "3a");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw custom vector design
  ctx.save();
  ctx.translate(canvas.width - 130, canvas.height / 2);
  ctx.strokeStyle = card.color2;
  ctx.fillStyle = card.color2;
  ctx.shadowColor = card.color2;
  ctx.shadowBlur = 20;
  card.drawIcon(ctx, card.color2);
  ctx.restore();

  // Glass card framing highlights
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 4;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Draw texts
  ctx.fillStyle = card.color2;
  ctx.font = "900 10px monospace";
  ctx.letterSpacing = "4px";
  ctx.fillText(card.category.toUpperCase(), 35, 60);

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 28px sans-serif";
  ctx.letterSpacing = "-0.5px";
  ctx.fillText(card.title.toUpperCase(), 35, 102);

  // Divider line
  ctx.strokeStyle = "rgba(255, 255, 255, 0.07)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(35, 122);
  ctx.lineTo(240, 122);
  ctx.stroke();

  // Details
  ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
  ctx.font = "11px sans-serif";
  let yPos = 150;
  card.desc.forEach(line => {
    ctx.fillText(line, 35, yPos);
    yPos += 18;
  });

  // Footer label
  ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
  ctx.font = "900 8px monospace";
  ctx.letterSpacing = "2px";
  ctx.fillText("PROD.ENGINE // STACK CONFIG.0" + (skills.indexOf(card) + 1), 35, canvas.height - 35);

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
};

// -------------------------------------------------------------
// WebGL Shader Materials
// -------------------------------------------------------------
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  uniform float uBend;
  uniform float uRadius;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Apply cylindrical bend if uBend > 0.0
    if (uBend > 0.0) {
      // Curve plane around Y axis based on width x-coordinate
      float theta = pos.x / uRadius;
      
      float xBent = uRadius * sin(theta);
      float zBent = uRadius * (cos(theta) - 1.0);
      
      pos.x = mix(pos.x, xBent, uBend);
      pos.z = mix(pos.z, zBent, uBend);
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = -mvPosition.xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  uniform sampler2D uMap;
  uniform float uHover;
  uniform vec3 uLightDir;

  void main() {
    vec4 texColor = texture2D(uMap, vUv);
    
    // Light vectors
    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(uLightDir);
    float diff = max(dot(normal, lightDir), 0.55); // high ambient baseline

    // Specular shine for glassmorphic feedback
    vec3 viewDir = normalize(vViewPosition);
    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), 32.0);
    vec3 specular = vec3(1.0, 1.0, 1.0) * spec * (0.2 + uHover * 0.2);

    // Hover glow color
    vec3 glowColor = vec3(0.0, 0.95, 1.0) * uHover * 0.15;

    // Sample and mix with lighting
    vec3 finalColor = texColor.rgb * diff + specular + glowColor;

    gl_FragColor = vec4(finalColor, texColor.a);
  }
`;

// -------------------------------------------------------------
// Component Implementation
// -------------------------------------------------------------
export function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [layoutMode, setLayoutMode] = useState<"spiral" | "list">("spiral");

  // Transition factor state (animates with GSAP)
  const transitionsRef = useRef(skills.map(() => 0.0)); // 0.0 is spiral, 1.0 is list

  // Interaction coordinates state
  const spiralScroll = useRef(0.0);
  const targetSpiralScroll = useRef(0.0);
  const spiralYScroll = useRef(0.0);
  const targetSpiralYScroll = useRef(0.0);
  
  const listScroll = useRef(0.0);
  const targetListScroll = useRef(0.0);

  // Drag physics tracking
  const isDragging = useRef(false);
  const prevMouseX = useRef(0);
  const prevMouseY = useRef(0);

  // Screen layout size tracking
  const isMobileView = useRef(false);

  // Active hover ref index
  const hoveredIndex = useRef<number | null>(null);

  // Card reference properties holder
  const meshesRef = useRef<THREE.Mesh[]>([]);

  // Toggle layout mode function
  const handleToggle = (mode: "spiral" | "list") => {
    if (mode === layoutMode) return;
    setLayoutMode(mode);

    // Animate the transitions values with stagger
    skills.forEach((_, i) => {
      gsap.to(transitionsRef.current, {
        [i]: mode === "list" ? 1.0 : 0.0,
        duration: 1.3,
        ease: "power3.inOut",
        delay: i * 0.04
      });
    });
  };

  useEffect(() => {
    // Check mobile layout scale factor
    isMobileView.current = window.innerWidth < 768;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // ThreeJS Scene, Camera, Renderer Setup
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = isMobileView.current ? 11 : 14;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    // Subtle dark cyan space lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00f3ff, 0.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xff3d00, 0.4, 30);
    pointLight.position.set(-5, -3, 3);
    scene.add(pointLight);

    // Create curved card plane geometry
    const cardWidth = 3.2;
    const cardHeight = 2.25;
    const geometry = new THREE.PlaneGeometry(cardWidth, cardHeight, 24, 8);

    // Instantiate meshes for the 10 skills
    const cardMeshes: THREE.Mesh[] = [];
    
    skills.forEach((card) => {
      // Dynamic canvas drawing texture
      const texture = generateCardTexture(card);

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        side: THREE.DoubleSide,
        uniforms: {
          uMap: { value: texture },
          uBend: { value: 1.0 },
          uRadius: { value: isMobileView.current ? 2.5 : 4.8 },
          uHover: { value: 0.0 },
          uLightDir: { value: new THREE.Vector3(1, 1, 1.5).normalize() }
        }
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      cardMeshes.push(mesh);
    });
    
    meshesRef.current = cardMeshes;

    // Helper layout coordinates calculators
    const getSpiralPos = (idx: number, scrollOffset: number, yOffset: number) => {
      const isMobile = isMobileView.current;
      const radius = isMobile ? 2.5 : 4.8;
      const thetaSpacing = (Math.PI * 2) / 6.0; // 6 cards per full circle
      const ySpacing = isMobile ? 1.25 : 1.95;

      const theta = idx * thetaSpacing + scrollOffset;
      const x = radius * Math.sin(theta);
      const z = radius * Math.cos(theta);
      const y = -idx * ySpacing + yOffset + 0.8;

      return { x, y, z, rotX: 0.05, rotY: theta, rotZ: 0 };
    };

    const getListPos = (idx: number, yOffset: number) => {
      const isMobile = isMobileView.current;
      if (isMobile) {
        // Vertical stacked list on mobile
        const ySpacing = 1.6;
        const y = -idx * ySpacing + yOffset;
        return { x: 0, y, z: 0, rotX: 0, rotY: 0, rotZ: 0 };
      } else {
        // Double column grid on desktop
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const xSpacing = 3.9;
        const ySpacing = 2.8;

        const x = (col - 0.5) * xSpacing;
        const y = -row * ySpacing + yOffset + 1.2;
        return { x, y, z: 0, rotX: 0, rotY: 0, rotZ: 0 };
      }
    };

    // -------------------------------------------------------------
    // Page Scroll Integration (GSAP Pinning)
    // -------------------------------------------------------------
    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=3000",
      pin: true,
      scrub: 1.2,
      onUpdate: (self) => {
        const progress = self.progress; // 0.0 to 1.0
        
        targetSpiralScroll.current = progress * Math.PI * 2.8;
        targetSpiralYScroll.current = progress * 15;

        const maxScrollDist = isMobileView.current ? 17 : 12;
        targetListScroll.current = progress * maxScrollDist;
      }
    });

    // -------------------------------------------------------------
    // Raycasting & Mouse Hover Tracking
    // -------------------------------------------------------------
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging.current) {
        const deltaX = e.clientX - prevMouseX.current;
        const deltaY = e.clientY - prevMouseY.current;
        
        prevMouseX.current = e.clientX;
        prevMouseY.current = e.clientY;

        if (layoutMode === "spiral") {
          targetSpiralScroll.current += deltaX * 0.007;
          targetSpiralYScroll.current -= deltaY * 0.02;
        } else {
          targetListScroll.current -= deltaY * 0.02;
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a")) return;

      isDragging.current = true;
      prevMouseX.current = e.clientX;
      prevMouseY.current = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a")) return;

      if (e.touches.length > 0) {
        isDragging.current = true;
        prevMouseX.current = e.touches[0].clientX;
        prevMouseY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - prevMouseX.current;
      const deltaY = e.touches[0].clientY - prevMouseY.current;

      prevMouseX.current = e.touches[0].clientX;
      prevMouseY.current = e.touches[0].clientY;

      if (layoutMode === "spiral") {
        targetSpiralScroll.current += deltaX * 0.012;
        targetSpiralYScroll.current -= deltaY * 0.035;
      } else {
        targetListScroll.current -= deltaY * 0.035;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleMouseUp);

    // -------------------------------------------------------------
    // Core Render Loop (requestAnimationFrame)
    // -------------------------------------------------------------
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const render = () => {
      const time = clock.getElapsedTime();

      // Smooth inertia momentum damping (lerp)
      spiralScroll.current += (targetSpiralScroll.current - spiralScroll.current) * 0.08;
      spiralYScroll.current += (targetSpiralYScroll.current - spiralYScroll.current) * 0.08;
      listScroll.current += (targetListScroll.current - listScroll.current) * 0.08;

      // Check raycast intersections
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cardMeshes);

      let currentHoveredIdx: number | null = null;
      if (intersects.length > 0) {
        const hoveredObject = intersects[0].object as THREE.Mesh;
        currentHoveredIdx = cardMeshes.indexOf(hoveredObject);
      }

      if (currentHoveredIdx !== hoveredIndex.current) {
        if (currentHoveredIdx !== null) {
          const hoverEvt = new CustomEvent("cursorHover", { detail: { hovering: true } });
          window.dispatchEvent(hoverEvt);
        } else {
          const hoverEvt = new CustomEvent("cursorHover", { detail: { hovering: false } });
          window.dispatchEvent(hoverEvt);
        }
        hoveredIndex.current = currentHoveredIdx;
      }

      // Position, Rotate, Bend and Scale Card Meshes
      cardMeshes.forEach((mesh, index) => {
        const t = transitionsRef.current[index]; // 0 (spiral) to 1 (list)
        const isHovered = hoveredIndex.current === index;

        // Compute layout endpoints
        const spiralPos = getSpiralPos(index, spiralScroll.current, spiralYScroll.current);
        const listPos = getListPos(index, listScroll.current);

        // Lerp position based on layout transition factor t
        const targetX = THREE.MathUtils.lerp(spiralPos.x, listPos.x, t);
        const targetY = THREE.MathUtils.lerp(spiralPos.y, listPos.y, t);
        const targetZ = THREE.MathUtils.lerp(spiralPos.z, listPos.z, t);

        const targetRotX = THREE.MathUtils.lerp(spiralPos.rotX, listPos.rotX, t);
        const targetRotY = THREE.MathUtils.lerp(spiralPos.rotY, listPos.rotY, t);
        const targetRotZ = THREE.MathUtils.lerp(spiralPos.rotZ, listPos.rotZ, t);

        const targetBend = THREE.MathUtils.lerp(1.0, 0.0, t);

        // Update mesh properties
        mesh.position.set(targetX, targetY, targetZ);
        mesh.rotation.set(targetRotX, targetRotY, targetRotZ);

        // Hover scale up and subtle camera facing tilt
        const hoverVal = isHovered ? 1.0 : 0.0;
        const currentHover = (mesh.material as THREE.ShaderMaterial).uniforms.uHover.value;
        (mesh.material as THREE.ShaderMaterial).uniforms.uHover.value += (hoverVal - currentHover) * 0.15;
        (mesh.material as THREE.ShaderMaterial).uniforms.uBend.value = targetBend;

        // Optimized scale for mobile (0.6 base) vs desktop (1.0 base)
        const targetScale = isHovered 
          ? (isMobileView.current ? 0.72 : 1.15) 
          : (isMobileView.current ? 0.6 : 1.0);
        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);

        // Subtle 3D mouse look-at tilt on hover
        if (isHovered) {
          const tiltStrength = 0.22;
          mesh.rotation.x += mouse.y * tiltStrength;
          mesh.rotation.y += -mouse.x * tiltStrength;
        }

        // Add floating wave float offsets to cards in spiral mode to look fluid
        if (t < 0.9) {
          mesh.position.y += Math.sin(time * 1.5 + index * 0.8) * 0.06 * (1.0 - t);
        }
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // -------------------------------------------------------------
    // Responsive Window Resize Handler
    // -------------------------------------------------------------
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      
      isMobileView.current = window.innerWidth < 768;

      camera.aspect = w / h;
      camera.position.z = isMobileView.current ? 11 : 14;
      camera.updateProjectionMatrix();

      cardMeshes.forEach(mesh => {
        const mat = mesh.material as THREE.ShaderMaterial;
        mat.uniforms.uRadius.value = isMobileView.current ? 2.5 : 4.8;
      });

      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup Resources
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
      
      st.kill();
      renderer.dispose();
      geometry.dispose();
      cardMeshes.forEach(mesh => {
        (mesh.material as THREE.ShaderMaterial).uniforms.uMap.value.dispose();
        (mesh.material as THREE.ShaderMaterial).dispose();
      });
    };
  }, [layoutMode]);

  return (
    <section 
      id="stack" 
      ref={containerRef} 
      className="relative w-full h-screen bg-[#030303] overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 240, 255, 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.035) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        backgroundPosition: "center center"
      }}
    >
      {/* 3D WebGL Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block z-10 outline-none"
      />

      {/* TOP DECORATION: Shiny 3D-Styled CSS Smiley Orb */}
      <div className="absolute top-6 left-6 md:top-8 md:left-12 z-20 flex items-center gap-4 select-none pointer-events-auto">
        <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-400 to-green-300 shadow-[inset_0_4px_8px_rgba(255,255,255,0.75),0_10px_25px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-hidden animate-[pulse_4s_ease-in-out_infinite]">
          <div className="absolute top-[5%] left-[10%] w-[80%] h-[40%] rounded-full bg-white/20 blur-[1px]" />
          <svg className="w-6 h-6 md:w-8 md:h-8 fill-black/85" viewBox="0 0 24 24">
            <circle cx="8" cy="9.5" r="2"/>
            <circle cx="16" cy="9.5" r="2"/>
            <path d="M12 17.5c2.93 0 5.48-1.74 6.64-4.25H5.36c1.16 2.51 3.71 4.25 6.64 4.25z" />
          </svg>
        </div>
        <span className="hidden sm:inline text-[9px] font-bold text-neutral-500 uppercase tracking-[0.2em] leading-tight">
          STACK MATRIX<br/>
          <span className="text-emerald-400">ACTIVE STATE</span>
        </span>
      </div>

      {/* TOP-CENTER TOGGLER: Spiral vs List Monospace Pill */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center select-none pointer-events-auto">
        <div className="flex items-center gap-3 bg-black/45 border border-white/10 px-6 py-2.5 rounded-full backdrop-blur-md shadow-2xl">
          <button 
            onClick={() => handleToggle("spiral")}
            className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-white ${
              layoutMode === "spiral" ? "text-white glow-text" : "text-neutral-500"
            }`}
          >
            spiral
          </button>
          <span className="text-neutral-600 font-bold">•</span>
          <button 
            onClick={() => handleToggle("list")}
            className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-white ${
              layoutMode === "list" ? "text-white glow-text" : "text-neutral-500"
            }`}
          >
            list
          </button>
        </div>
      </div>

      {/* BOTTOM-LEFT: Rotating Vector Text Circle */}
      <div className="absolute bottom-8 left-6 md:left-12 z-20 select-none pointer-events-none hidden sm:block">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_24s_linear_infinite]">
            <path 
              id="textCirclePath" 
              d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" 
              fill="transparent" 
            />
            <text className="text-[6.8px] font-mono fill-neutral-500 uppercase tracking-[0.22em] font-semibold">
              <textPath href="#textCirclePath" startOffset="0%">
                stack • config • 2025 • backend engineer •
              </textPath>
            </text>
          </svg>
          <div className="absolute w-1.5 h-1.5 bg-neutral-600 rounded-full" />
        </div>
      </div>

      {/* Grid subtle glow behind standard CSS backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] bg-emerald-500/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/3 w-[50vw] h-[50vh] bg-[#ff3d00]/3 blur-[160px] pointer-events-none rounded-full" />

      {/* Inline styles for custom glows */}
      <style jsx global>{`
        .glow-text {
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </section>
  );
}
