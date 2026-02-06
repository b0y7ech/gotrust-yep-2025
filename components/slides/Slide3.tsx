"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PartyPopper, Crown, Star } from "lucide-react";
import SlideTemplate from "../SlideTemplate";
import Image from "next/image";
import { useState, useCallback } from "react";
import Tilt from "react-parallax-tilt";

// Firework component - continuous animation
function Firework({ x, delay }: { x: number; delay: number }) {
    const colors = ["#ff0080", "#00c8ff", "#ffcc00", "#ff4444", "#44ff44", "#ff44ff", "#ffd700"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    return (
        <motion.div
            className="absolute bottom-0 pointer-events-none"
            style={{ left: `${x}%` }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
                y: [0, -350 - Math.random() * 200],
                opacity: [0, 1, 1, 0],
            }}
            transition={{
                duration: 1.8,
                delay: delay,
                repeat: Infinity,
                repeatDelay: 1.5 + Math.random() * 2,
            }}
        >
            {/* Firework trail */}
            <motion.div
                className="w-1 h-12 rounded-full"
                style={{ background: `linear-gradient(to top, ${color}, transparent)` }}
            />
            {/* Explosion */}
            <motion.div
                className="absolute -top-4 left-1/2 -translate-x-1/2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: [0, 0, 2, 0],
                    opacity: [0, 0, 1, 0],
                }}
                transition={{
                    duration: 1.8,
                    delay: delay + 0.9,
                    repeat: Infinity,
                    repeatDelay: 1.5 + Math.random() * 2,
                }}
            >
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                            background: color,
                            boxShadow: `0 0 12px ${color}, 0 0 24px ${color}`,
                        }}
                        animate={{
                            x: [0, Math.cos((i * Math.PI * 2) / 12) * 60],
                            y: [0, Math.sin((i * Math.PI * 2) / 12) * 60 + 30],
                            opacity: [1, 0],
                            scale: [1, 0.3],
                        }}
                        transition={{
                            duration: 1,
                            delay: delay + 0.9,
                            repeat: Infinity,
                            repeatDelay: 1.5 + Math.random() * 2,
                        }}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
}

// Premium Chairman VCard Component
function ChairmanVCard({ isPartyMode }: { isPartyMode: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 60, damping: 15, duration: 1 }}
            className="relative pt-12"
        >
            {/* Outer glow ring */}
            <motion.div
                className="absolute inset-[-40px] rounded-[60px] pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)",
                }}
                animate={{
                    opacity: [0.4, 0.8, 0.4],
                    scale: [0.95, 1.05, 0.95],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <Tilt
                className="parallax-tilt"
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                perspective={1500}
                scale={1.02}
                transitionSpeed={500}
                glareEnable={true}
                glareMaxOpacity={0.25}
                glareColor="#ffd700"
                glarePosition="all"
            >
                <div
                    className={`relative rounded-[40px] ${isPartyMode
                        ? "bg-gradient-to-br from-[#1a0a2e] via-[#16213e] to-[#0f3460]"
                        : "bg-gradient-to-br from-[#0d1b2a] via-[#1b263b] to-[#0d1b2a]"
                        }`}
                    style={{
                        boxShadow: isPartyMode
                            ? "0 0 80px rgba(255,215,0,0.3), 0 0 120px rgba(255,100,100,0.2), inset 0 1px 0 rgba(255,255,255,0.1)"
                            : "0 0 60px rgba(255,215,0,0.2), 0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
                    }}
                >
                    {/* Premium Golden Border */}
                    <div className="absolute inset-0 rounded-[40px] p-[3px] pointer-events-none">
                        <motion.div
                            className="absolute inset-0 rounded-[40px]"
                            style={{
                                background: "linear-gradient(135deg, #ffd700 0%, #ff8c00 25%, #ffd700 50%, #ffa500 75%, #ffd700 100%)",
                                backgroundSize: "200% 200%",
                                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                maskComposite: "exclude",
                                WebkitMaskComposite: "xor",
                                padding: "3px",
                            }}
                            animate={{
                                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                            }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    {/* Inner content container */}
                    <div className="relative px-12 py-10">
                        {/* Decorative corner ornaments */}
                        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-400/40 rounded-tl-lg" />
                        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-400/40 rounded-tr-lg" />
                        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-400/40 rounded-bl-lg" />
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-400/40 rounded-br-lg" />

                        {/* Crown Badge - Floating above card */}
                        <motion.div
                            className="absolute -top-16 left-1/2 -translate-x-1/2 z-30"
                            animate={{ y: [-4, 4, -4], rotate: [-2, 2, -2] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="relative">
                                <div className="px-8 py-3 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 rounded-full shadow-lg shadow-amber-500/40 flex items-center gap-3">
                                    <Crown className="w-6 h-6 text-amber-900" />
                                    <span className="text-sm font-black text-amber-900 tracking-[0.2em] uppercase">
                                        Chủ tịch HĐQT
                                    </span>
                                    <Crown className="w-6 h-6 text-amber-900" />
                                </div>
                                {/* Sparkle effects around badge */}
                                <motion.div
                                    className="absolute -top-2 -left-2"
                                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <Star className="w-4 h-4 text-amber-300" fill="currentColor" />
                                </motion.div>
                                <motion.div
                                    className="absolute -top-2 -right-2"
                                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                >
                                    <Star className="w-4 h-4 text-amber-300" fill="currentColor" />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Main Content Layout - Horizontal */}
                        <div className="flex items-center gap-10 mt-4">
                            {/* Profile Image Section */}
                            <div className="relative flex-shrink-0">
                                {/* Multi-layer glow */}
                                <motion.div
                                    className="absolute inset-[-30px] rounded-full"
                                    style={{
                                        background: "radial-gradient(circle, rgba(255,215,0,0.4) 0%, rgba(255,140,0,0.2) 40%, transparent 70%)",
                                        filter: "blur(20px)",
                                    }}
                                    animate={{
                                        opacity: [0.5, 0.9, 0.5],
                                        scale: [0.9, 1.1, 0.9],
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />

                                {/* Photo frame with golden ring */}
                                <div className="relative w-52 h-52 rounded-full">
                                    {/* Rotating golden ring */}
                                    <motion.div
                                        className="absolute inset-[-6px] rounded-full"
                                        style={{
                                            background: "conic-gradient(from 0deg, #ffd700, #ff8c00, #ffd700, #ffa500, #ffd700)",
                                        }}
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    />

                                    {/* Inner dark ring */}
                                    <div className="absolute inset-[3px] rounded-full bg-[#0d1b2a]" />

                                    {/* Image container */}
                                    <div className="absolute inset-[6px] rounded-full overflow-hidden">
                                        <Image
                                            src="/images/pham_tuan_anh.jpg"
                                            alt="Phạm Tuấn Anh"
                                            width={200}
                                            height={200}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Text Content Section */}
                            <div className="flex-1 text-left">
                                {/* Name with premium typography */}
                                <motion.h2
                                    className="text-4xl md:text-5xl font-black tracking-wider mb-4"
                                    style={{
                                        background: "linear-gradient(135deg, #ffd700 0%, #fff 30%, #ffd700 50%, #fff 70%, #ffd700 100%)",
                                        backgroundSize: "200% 200%",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                    animate={{
                                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    PHẠM TUẤN ANH
                                </motion.h2>

                                {/* Title with elegant styling */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-amber-400" />
                                    <p className="text-xl text-amber-200/90 font-light tracking-widest uppercase">
                                        Chủ tịch Hội đồng Quản trị
                                    </p>
                                    <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-amber-400" />
                                </div>

                                {/* Company info */}
                                <div className="flex items-center gap-4">
                                    <motion.div
                                        animate={{
                                            opacity: [0.6, 1, 0.6],
                                            scale: [0.98, 1.02, 0.98],
                                        }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    >
                                        <Image
                                            src="/images/gotrust.png"
                                            alt="GoTRUST"
                                            width={140}
                                            height={42}
                                            className="h-10 w-auto object-contain"
                                        />
                                    </motion.div>
                                    <div className="h-8 w-[1px] bg-amber-400/30" />
                                    <span className="text-white/50 text-sm tracking-wider">Year End Party 2025</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Tilt>
        </motion.div>
    );
}

export default function Slide3() {
    const [isPartyMode, setIsPartyMode] = useState(false);

    const triggerPartyMode = useCallback(() => {
        setIsPartyMode(true);
    }, []);

    return (
        <SlideTemplate id="slide-3">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#030508]">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a1828]/50 via-[#030508] to-[#030508]" />

                {/* Subtle radial gradient */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "radial-gradient(ellipse at center top, rgba(255,215,0,0.05) 0%, transparent 50%)",
                    }}
                />

                {/* Grid pattern - very subtle */}
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255, 215, 0, 0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 215, 0, 0.5) 1px, transparent 1px)
                        `,
                        backgroundSize: "100px 100px",
                    }}
                />

                {/* Continuous Fireworks in Party Mode */}
                {isPartyMode && (
                    <>
                        {[5, 15, 25, 35, 45, 55, 65, 75, 85, 95].map((x, i) => (
                            <Firework key={i} x={x} delay={i * 0.3} />
                        ))}
                    </>
                )}

                {/* Floating sparkles in party mode */}
                {isPartyMode && (
                    <>
                        {[...Array(40)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    width: `${2 + Math.random() * 4}px`,
                                    height: `${2 + Math.random() * 4}px`,
                                    background: `hsl(${Math.random() * 60 + 30}, 90%, 60%)`,
                                    boxShadow: `0 0 10px hsl(${Math.random() * 60 + 30}, 90%, 60%)`,
                                }}
                                animate={{
                                    y: [0, -80, 0],
                                    x: [0, (Math.random() - 0.5) * 50, 0],
                                    opacity: [0, 1, 0],
                                    scale: [0, 1.5, 0],
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 4,
                                }}
                            />
                        ))}
                    </>
                )}
            </div>

            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 flex justify-center w-full"
            >
                <Image
                    src="/images/gotrust.png"
                    alt="GoTRUST"
                    width={140}
                    height={42}
                    className="h-9 w-auto object-contain"
                />
            </motion.div>

            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative z-10 text-center mt-4"
            >
                <AnimatePresence mode="wait">
                    {!isPartyMode ? (
                        <motion.div
                            key="welcome"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <h1 className="text-2xl md:text-3xl font-bold text-white/80 tracking-wider mb-2">
                                ✨ TRÂN TRỌNG KÍNH MỜI ✨
                            </h1>
                            <p className="text-lg text-amber-300/70 tracking-widest">
                                Chủ tịch lên sân khấu phát biểu khai mạc
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="party"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <motion.h1
                                className="text-4xl md:text-5xl lg:text-6xl font-black"
                                animate={{ scale: [1, 1.02, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <span
                                    className="text-transparent bg-clip-text"
                                    style={{
                                        backgroundImage: "linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #ff6b6b)",
                                        backgroundSize: "200% 100%",
                                        animation: "gradient-shift 2s linear infinite",
                                    }}
                                >
                                    🎉 CHÚC MỪNG KHAI TIỆC! 🎉
                                </span>
                            </motion.h1>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Main Content - Premium Chairman Card */}
            <div className="relative z-10 flex-1 flex items-center justify-center px-8">
                <ChairmanVCard isPartyMode={isPartyMode} />
            </div>

            {/* Action Button - Only Khai Tiệc */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="relative z-10 flex justify-center pb-4"
            >
                {!isPartyMode ? (
                    <motion.button
                        onClick={triggerPartyMode}
                        className="px-10 py-4 rounded-2xl font-bold text-base tracking-wider flex items-center gap-4 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 transition-all"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            boxShadow: [
                                "0 10px 40px rgba(236,72,153,0.3)",
                                "0 10px 60px rgba(236,72,153,0.5)",
                                "0 10px 40px rgba(236,72,153,0.3)",
                            ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <PartyPopper className="w-6 h-6" />
                        <span>🍾 KHAI TIỆC!</span>
                        <PartyPopper className="w-6 h-6" />
                    </motion.button>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <motion.p
                            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-yellow-300 to-cyan-400 tracking-widest"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            🎊 GẮN KẾT & BÙNG NỔ 🎊
                        </motion.p>
                    </motion.div>
                )}
            </motion.div>
        </SlideTemplate>
    );
}
