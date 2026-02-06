"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import Slide1 from "@/components/slides/Slide1";
import Slide2 from "@/components/slides/Slide2";
import Slide3 from "@/components/slides/Slide3";
import Slide4 from "@/components/slides/Slide4";
import Slide5 from "@/components/slides/Slide5";
import Slide6 from "@/components/slides/Slide6";
import Slide7 from "@/components/slides/Slide7";

const slides = [
  { component: Slide1, title: "YEP GoTRUST 2025" },
  { component: Slide2, title: "Hành Trình 2025" },
  { component: Slide3, title: "Khai Mạc & Vinh Danh" },
  { component: Slide4, title: "Vinh Danh Nhân Viên" },
  { component: Slide5, title: "Game Interactive" },
  { component: Slide6, title: "Bốc Thăm May Mắn" },
  { component: Slide7, title: "Closing - Gia Đình GoTRUST" },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalSlides = slides.length;

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides && !isNavigating) {
      setIsNavigating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsNavigating(false), 600);
    }
  }, [totalSlides, isNavigating]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "Home") {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToSlide(totalSlides - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide, totalSlides]);

  // Wheel navigation with debounce
  useEffect(() => {
    let wheelTimeout: NodeJS.Timeout;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        if (e.deltaY > 50) {
          nextSlide();
        } else if (e.deltaY < -50) {
          prevSlide();
        }
      }, 50);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
      clearTimeout(wheelTimeout);
    };
  }, [nextSlide, prevSlide]);

  const SlideComponent = slides[currentSlide].component;

  return (
    <main
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black text-white"
    >
      {/* Slide Content with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-full w-full"
        >
          <SlideComponent />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows - Left Side */}
      {totalSlides > 1 && (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
          {/* Previous Slide */}
          <motion.button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`group relative w-12 h-12 rounded-full border backdrop-blur-md transition-all duration-300 flex items-center justify-center ${currentSlide === 0
              ? "border-white/10 bg-white/5 cursor-not-allowed opacity-30"
              : "border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/40 hover:scale-110"
              }`}
            whileHover={currentSlide !== 0 ? { scale: 1.1 } : {}}
            whileTap={currentSlide !== 0 ? { scale: 0.95 } : {}}
          >
            <ChevronUp
              size={24}
              className={`transition-transform ${currentSlide !== 0 ? "group-hover:-translate-y-0.5" : ""
                }`}
            />
            {currentSlide !== 0 && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#0055aa]"
                initial={{ scale: 1, opacity: 0 }}
                whileHover={{ scale: 1.2, opacity: 0.5 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>

          {/* Next Slide */}
          <motion.button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className={`group relative w-12 h-12 rounded-full border backdrop-blur-md transition-all duration-300 flex items-center justify-center ${currentSlide === totalSlides - 1
              ? "border-white/10 bg-white/5 cursor-not-allowed opacity-30"
              : "border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/40 hover:scale-110"
              }`}
            whileHover={currentSlide !== totalSlides - 1 ? { scale: 1.1 } : {}}
            whileTap={currentSlide !== totalSlides - 1 ? { scale: 0.95 } : {}}
          >
            <ChevronDown
              size={24}
              className={`transition-transform ${currentSlide !== totalSlides - 1 ? "group-hover:translate-y-0.5" : ""
                }`}
            />
            {currentSlide !== totalSlides - 1 && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#FF7B00]"
                initial={{ scale: 1, opacity: 0 }}
                whileHover={{ scale: 1.2, opacity: 0.5 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        </div>
      )}

      {/* Right Side: Slide Indicators */}
      {totalSlides > 1 && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2">
          <div className="flex flex-col gap-2 p-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10">
            {slides.map((slide, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative group"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide
                    ? "bg-gradient-to-r from-[#0055aa] to-[#FF7B00]"
                    : index < currentSlide
                      ? "bg-[#0055aa]/60"
                      : "bg-white/20 hover:bg-white/40"
                    }`}
                  animate={
                    index === currentSlide
                      ? { scale: [1, 1.2, 1] }
                      : { scale: 1 }
                  }
                  transition={
                    index === currentSlide
                      ? { duration: 1.5, repeat: Infinity }
                      : {}
                  }
                />

                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 whitespace-nowrap">
                    <p className="text-[10px] font-bold text-white">
                      {index + 1}. {slide.title}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom: Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="h-1 bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-[#0055aa] via-[#00aaff] to-[#FF7B00]"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
          <motion.button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`transition-colors ${currentSlide === 0
              ? "text-white/20 cursor-not-allowed"
              : "text-white/60 hover:text-white"
              }`}
            whileHover={currentSlide !== 0 ? { x: -2 } : {}}
          >
            <ChevronLeft size={18} />
          </motion.button>

          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-white">
              {String(currentSlide + 1).padStart(2, "0")}
            </span>
            <span className="text-white/40">/</span>
            <span className="text-sm text-white/40">
              {String(totalSlides).padStart(2, "0")}
            </span>
          </div>

          <motion.button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className={`transition-colors ${currentSlide === totalSlides - 1
              ? "text-white/20 cursor-not-allowed"
              : "text-white/60 hover:text-white"
              }`}
            whileHover={currentSlide !== totalSlides - 1 ? { x: 2 } : {}}
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>
      </div>

      {/* Keyboard Hint (appears briefly) */}
      <motion.div
        className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 5, duration: 1 }}
      >
        <div className="flex items-center gap-4 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/40 text-[10px]">
          <span>←→ hoặc ↑↓ để chuyển slide</span>
          <span>•</span>
          <span>Cuộn chuột để thay đổi</span>
        </div>
      </motion.div>
    </main>
  );
}
