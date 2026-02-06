"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";
import SlideTemplate from "../SlideTemplate";
import Image from "next/image";
import { useState, useEffect } from "react";

// Heart-shaped positions for 10 images
// Arranged to form a heart shape - LARGE SIZE
const heartPositions = [
    // Top row - 2 images at heart curves
    { top: "2%", left: "22%", size: 200, delay: 0 },
    { top: "2%", left: "52%", size: 200, delay: 0.1 },
    // Second row - extends wider
    { top: "18%", left: "5%", size: 180, delay: 0.2 },
    { top: "15%", left: "38%", size: 220, delay: 0.3 },
    { top: "18%", left: "68%", size: 180, delay: 0.4 },
    // Third row - middle
    { top: "38%", left: "12%", size: 190, delay: 0.5 },
    { top: "36%", left: "55%", size: 190, delay: 0.6 },
    // Fourth row - narrowing
    { top: "55%", left: "22%", size: 170, delay: 0.7 },
    { top: "55%", left: "50%", size: 170, delay: 0.8 },
    // Bottom point
    { top: "72%", left: "38%", size: 160, delay: 0.9 },
];

// Photo component with hover effect
function HeartPhoto({
    src,
    position,
    index
}: {
    src: string;
    position: typeof heartPositions[0];
    index: number;
}) {
    return (
        <motion.div
            className="absolute"
            style={{
                top: position.top,
                left: position.left,
                width: position.size,
                height: position.size,
            }}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: position.delay + 0.5,
            }}
            whileHover={{ scale: 1.2, zIndex: 50, rotate: 5 }}
        >
            {/* Glow effect */}
            <motion.div
                className="absolute inset-[-10px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(255,107,107,0.4) 0%, transparent 70%)",
                    filter: "blur(10px)",
                }}
                animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [0.9, 1.1, 0.9],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3,
                }}
            />

            {/* Photo container */}
            <div
                className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/30 shadow-xl"
                style={{
                    boxShadow: "0 10px 30px rgba(255,107,107,0.3)",
                }}
            >
                <Image
                    src={src}
                    alt={`GoTRUST Family ${index + 1}`}
                    fill
                    className="object-cover"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-red-500/10" />
            </div>

            {/* Heart badge for some photos */}
            {index % 3 === 0 && (
                <motion.div
                    className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center shadow-lg"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                >
                    <Heart className="w-4 h-4 text-white" fill="white" />
                </motion.div>
            )}
        </motion.div>
    );
}

// Floating hearts background
function FloatingHearts() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-pink-500/30"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        fontSize: `${16 + Math.random() * 24}px`,
                    }}
                    animate={{
                        y: [-20, -100],
                        x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 100],
                        opacity: [0, 0.6, 0],
                        scale: [0.5, 1, 0.8],
                    }}
                    transition={{
                        duration: 4 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                    }}
                >
                    ❤️
                </motion.div>
            ))}
        </div>
    );
}

export default function Slide7() {
    const [showPhotos, setShowPhotos] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowPhotos(true), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <SlideTemplate id="slide-7">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-b from-[#1a0a2e] via-[#2d1b46] to-[#0d1b2a]">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-red-500/5" />

                {/* Floating hearts */}
                <FloatingHearts />

                {/* Sparkle particles */}
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                        }}
                    />
                ))}
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
                    width={160}
                    height={48}
                    className="h-10 w-auto object-contain"
                />
            </motion.div>

            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative z-10 text-center mt-2"
            >
                <h1 className="text-3xl md:text-4xl font-black tracking-wider">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-red-400 to-pink-400">
                        GIA ĐÌNH GOTRUST
                    </span>
                </h1>
            </motion.div>

            {/* Main Content - Heart Mosaic */}
            <div className="relative z-10 flex-1 flex items-center justify-center">
                <div className="relative w-[900px] h-[700px]">
                    {/* Large heart shape outline (optional decoration) */}
                    <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <defs>
                                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#ec4899" />
                                    <stop offset="100%" stopColor="#ef4444" />
                                </linearGradient>
                            </defs>
                            <path
                                d="M50 88.9C23.5 71.4 10 57.1 10 40.3c0-12.1 9.8-22 21.8-22 7.6 0 14.9 3.9 18.2 9.5C53.3 22.2 60.6 18.3 68.2 18.3c12 0 21.8 9.9 21.8 22C90 57.1 76.5 71.4 50 88.9z"
                                fill="url(#heartGradient)"
                                opacity="0.3"
                            />
                        </svg>
                    </motion.div>

                    {/* Photos */}
                    {showPhotos && heartPositions.map((pos, index) => (
                        <HeartPhoto
                            key={index}
                            src={`/images/thanks/${index + 1}.jpg`}
                            position={pos}
                            index={index}
                        />
                    ))}

                    {/* Central heart icon */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2, type: "spring" }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <Heart className="w-16 h-16 text-red-500 drop-shadow-2xl" fill="currentColor" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Message */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="relative z-10 text-center pb-4"
            >
                <motion.div
                    className="inline-block px-10 py-4 rounded-2xl bg-gradient-to-r from-pink-500/20 via-red-500/20 to-pink-500/20 backdrop-blur-sm border border-pink-500/30"
                    animate={{
                        boxShadow: [
                            "0 0 30px rgba(236,72,153,0.2)",
                            "0 0 50px rgba(236,72,153,0.4)",
                            "0 0 30px rgba(236,72,153,0.2)",
                        ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <div className="flex items-center gap-4">
                        <Sparkles className="w-6 h-6 text-pink-400" />
                        <div>
                            <motion.h2
                                className="text-2xl md:text-3xl font-black tracking-wider"
                                style={{
                                    background: "linear-gradient(90deg, #f472b6, #fbbf24, #f472b6)",
                                    backgroundSize: "200% 100%",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                                animate={{
                                    backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                CÙNG NHAU BỨT PHÁ 2026
                            </motion.h2>
                            <p className="text-white/60 text-sm mt-1 tracking-widest">
                                Stronger Together 💪
                            </p>
                        </div>
                        <Sparkles className="w-6 h-6 text-pink-400" />
                    </div>
                </motion.div>
            </motion.div>

            {/* Footer */}
            <div className="relative z-10 flex items-center justify-center pb-2 text-xs text-white/30 tracking-widest">
                <span>❤️ CÔNG NGHỆ VÌ CUỘC SỐNG ❤️</span>
            </div>
        </SlideTemplate>
    );
}
