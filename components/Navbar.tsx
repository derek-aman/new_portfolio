"use client";

import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Work", href: "#work" },
  { name: "About", href: "#about" },
  { name: "Stack", href: "#stack" },
  { name: "Contact", href: "#contact" }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-[50] flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black hover:scale-105 shadow-[0_0_15px_rgba(0,240,255,0.15)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]"
      >
        <Menu className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20, x: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-6 right-6 z-[60] flex w-72 flex-col rounded-3xl border border-white/10 bg-black/90 p-8 backdrop-blur-xl origin-top-right shadow-2xl shadow-black"
          >
            <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
              <span className="text-xl font-bold tracking-widest text-white">AMAN<span className="text-neutral-500">.DEV</span></span>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white hover:text-orange-500 transition-colors"
              >
                <X className="h-8 w-8" />
              </button>
            </div>

            <div className="flex flex-col gap-8 text-sm font-medium uppercase tracking-widest text-neutral-300">
              {links.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)} 
                  className="group flex items-center gap-4 text-xl hover:text-white transition-colors"
                >
                  <span className="h-[1px] w-0 bg-orange-500 transition-all duration-300 group-hover:w-8" />
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 flex justify-between gap-4 w-full">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-neutral-500 hover:text-white transition-colors uppercase tracking-widest">Github</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-neutral-500 hover:text-white transition-colors uppercase tracking-widest">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-neutral-500 hover:text-white transition-colors uppercase tracking-widest">X/Twitter</a>
            </div>

            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)} 
              className="mt-8 flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 py-4 text-[12px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black"
            >
              AVAILABLE FOR INTERNSHIP <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
