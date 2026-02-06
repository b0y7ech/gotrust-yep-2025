"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Award, Star, Trophy, Sparkles, Shield, CheckCircle2 } from "lucide-react";
import SlideTemplate from "../SlideTemplate";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

// Performance Star Winner
const performanceStarWinner = {
    name: "TRẦN TIẾN ĐẠT",
    title: "Performance Star 2025",
    image: "/images/tran_tien_dat.jpg",
};

// Employee of the Year Nominees
const nominees = [
    { id: 1, name: "TRẦN TIẾN ĐẠT", role: "Developer", image: "/images/tran_tien_dat.jpg" },
    { id: 2, name: "NGUYỄN THIÊN HỮU", role: "Technical", image: "/images/nguyen_thien_huu.jpg", isWinner: true },
    { id: 3, name: "VÕ THỊ THẢO", role: "CSKH", image: "/images/vo_thi_thao.jpg" },
    { id: 4, name: "NGUYỄN HOÀNG THÁI", role: "Developer", image: "/images/nguyen_hoang_thai.jpg" },
];

// Trust Hash Generator
function generateTrustHash() {
    const chars = "0123456789abcdef";
    let hash = "0x";
    for (let i = 0; i < 16; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
}

// Trust Hash Component - continuously changing
function TrustHash() {
    const [hash, setHash] = useState(generateTrustHash());

    useEffect(() => {
        const interval = setInterval(() => {
            setHash(generateTrustHash());
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className="font-mono text-[10px] text-cyan-400/60">
            {hash}
        </span>
    );
}

// Golden Digital Rain Component
function GoldenRain() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        height: `${20 + Math.random() * 40}px`,
                        background: `linear-gradient(to bottom, rgba(255,215,0,0.8), transparent)`,
                    }}
                    initial={{ y: -50, opacity: 0 }}
                    animate={{
                        y: ["0%", "100%"],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
}

// Radar Scan Component
function RadarScan({ onComplete }: { onComplete: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onComplete, 2000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="absolute inset-0 pointer-events-none z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                animate={{ y: [0, 400, 0] }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />
        </motion.div>
    );
}

// Electric Glow Card - for Performance Star
function ElectricGlowCard({ person, show }: { person: typeof performanceStarWinner; show: boolean }) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 100 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    className="relative"
                >
                    {/* Electric glow effect */}
                    <motion.div
                        className="absolute inset-[-20px] rounded-3xl"
                        style={{
                            background: "radial-gradient(circle, rgba(0,200,255,0.3) 0%, transparent 70%)",
                            filter: "blur(20px)",
                        }}
                        animate={{
                            opacity: [0.5, 1, 0.5],
                            scale: [0.95, 1.05, 0.95],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                    <div className="relative w-96 rounded-3xl overflow-hidden bg-[#0a1828]/70 backdrop-blur-xl border-2 border-cyan-400/50">
                        {/* Electric border animation */}
                        <motion.div
                            className="absolute inset-0 rounded-3xl pointer-events-none"
                            style={{
                                backgroundImage: "linear-gradient(90deg, transparent, rgba(0,200,255,0.5), transparent)",
                                backgroundSize: "200% 100%",
                            }}
                            animate={{
                                backgroundPosition: ["200% 0%", "-200% 0%"],
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Content */}
                        <div className="relative p-8">
                            {/* Award badge */}
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-slate-400 via-cyan-300 to-slate-400 rounded-full z-10">
                                <span className="text-xs font-bold text-gray-900 tracking-wider">⭐ PERFORMANCE STAR ⭐</span>
                            </div>

                            {/* Photo */}
                            <div className="relative w-44 h-44 mx-auto mt-6 rounded-full overflow-hidden border-4 border-cyan-400/40">
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-tr from-cyan-400/30 to-transparent"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                />
                                <div className="absolute inset-2 rounded-full overflow-hidden">
                                    <Image
                                        src={person.image}
                                        alt={person.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Name */}
                            <h3 className="text-2xl font-bold text-white text-center mt-6 tracking-wider">
                                {person.name}
                            </h3>
                            <p className="text-base text-cyan-400/80 text-center mt-2">
                                {person.title}
                            </p>

                            {/* GoTRUST Logo */}
                            <div className="flex justify-center mt-6">
                                <Image
                                    src="/images/gotrust.png"
                                    alt="GoTRUST"
                                    width={100}
                                    height={30}
                                    className="h-6 w-auto object-contain opacity-60"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Nominee Card with floating animation
function NomineeCard({
    nominee,
    index,
    isWinnerRevealed,
    isScanning,
}: {
    nominee: typeof nominees[0];
    index: number;
    isWinnerRevealed: boolean;
    isScanning: boolean;
}) {
    const isWinner = nominee.isWinner;
    const shouldDim = isWinnerRevealed && !isWinner;
    const shouldEnlarge = isWinnerRevealed && isWinner;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
                opacity: shouldDim ? 0.3 : 1,
                y: 0,
                scale: shouldEnlarge ? 1.6 : 1,
                zIndex: shouldEnlarge ? 50 : 10,
            }}
            transition={{
                type: "spring",
                stiffness: 80,
                damping: 15,
                delay: index * 0.15,
            }}
            className="relative"
        >
            {/* Floating animation container */}
            <motion.div
                animate={{
                    y: [-8 - index * 2, 8 + index * 2, -8 - index * 2],
                }}
                transition={{
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3,
                }}
            >
                <div
                    className={`relative w-48 rounded-xl overflow-hidden backdrop-blur-xl transition-all duration-500 ${shouldEnlarge
                        ? "bg-gradient-to-br from-amber-900/60 via-yellow-900/40 to-amber-900/60 border-2 border-amber-400"
                        : "bg-[#0a1828]/60 border border-cyan-400/20"
                        }`}
                >
                    {/* Winner congratulations border animation */}
                    {shouldEnlarge && (
                        <motion.div
                            className="absolute inset-0 rounded-xl pointer-events-none"
                            style={{
                                background: "conic-gradient(from 0deg, #ffd700, #ff8c00, #ffd700, #ffa500, #ffd700)",
                                padding: "2px",
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="absolute inset-[2px] rounded-xl bg-[#0a1828]" />
                        </motion.div>
                    )}

                    {/* Scanning highlight */}
                    {isScanning && (
                        <motion.div
                            className="absolute inset-0 bg-cyan-400/20"
                            animate={{ opacity: [0, 0.5, 0] }}
                            transition={{ duration: 0.5, repeat: 4 }}
                        />
                    )}

                    {/* Content */}
                    <div className="relative p-4">
                        {/* Photo */}
                        <div className={`relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 bg-[#0a1828] ${shouldEnlarge ? "border-amber-400" : "border-cyan-400/30"
                            }`}>
                            <Image
                                src={nominee.image}
                                alt={nominee.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Name */}
                        <h4 className={`text-sm font-bold text-center mt-3 tracking-wider ${shouldEnlarge ? "text-amber-300" : "text-white"
                            }`}>
                            {nominee.name}
                        </h4>
                        <p className="text-[10px] text-white/50 text-center mt-1">
                            {nominee.role}
                        </p>

                        {/* Trust Hash */}
                        <div className="mt-3 text-center">
                            <TrustHash />
                        </div>
                    </div>

                    {/* Winner badge */}
                    {shouldEnlarge && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-full shadow-lg"
                        >
                            <span className="text-[10px] font-black text-amber-900 tracking-wider flex items-center gap-1">
                                <Trophy className="w-3 h-3" /> WINNER
                            </span>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

// Verification Effect Component
function VerificationEffect({ show }: { show: boolean }) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-24 left-1/2 -translate-x-1/2 z-40"
                >
                    <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-emerald-900/60 backdrop-blur-xl border border-emerald-400/40">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1 }}
                        >
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        </motion.div>
                        <div>
                            <p className="text-[10px] text-emerald-400/80 font-mono">IDENTITY VERIFIED</p>
                            <p className="text-xs text-emerald-300 font-medium">
                                Excellence Award Confirmed on GoTRUST Ledger
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function Slide4() {
    const [phase, setPhase] = useState<"performance" | "nominees" | "scanning" | "winner">("performance");
    const [showPerformanceStar, setShowPerformanceStar] = useState(false);

    const handleShowWinner = () => {
        setShowPerformanceStar(true);
    };

    const handleNextSection = () => {
        setPhase("nominees");
        setShowPerformanceStar(false);
    };

    const handleRevealWinner = () => {
        setPhase("scanning");
    };

    const handleScanComplete = useCallback(() => {
        setPhase("winner");
    }, []);

    return (
        <SlideTemplate id="slide-4">
            {/* Background with data flow */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#030508]">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a1828]/50 via-[#030508] to-[#030508]" />

                {/* Data flow lines */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
                        style={{
                            top: `${20 + i * 15}%`,
                            left: 0,
                            right: 0,
                        }}
                        animate={{
                            opacity: [0.1, 0.3, 0.1],
                            x: [-100, 100, -100],
                        }}
                        transition={{
                            duration: 8 + i * 2,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                    />
                ))}

                {/* Product names floating in background */}
                {["Trạm công dân số", "MediPay", "EduPay", "CiviPay"].map((name, i) => (
                    <motion.div
                        key={name}
                        className="absolute text-white/5 text-2xl font-bold pointer-events-none"
                        style={{
                            left: `${10 + i * 25}%`,
                            top: `${30 + (i % 2) * 40}%`,
                        }}
                        animate={{
                            y: [-20, 20, -20],
                            opacity: [0.03, 0.08, 0.03],
                        }}
                        transition={{
                            duration: 8 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                    >
                        {name}
                    </motion.div>
                ))}

                {/* Golden rain when winner revealed */}
                {phase === "winner" && <GoldenRain />}
            </div>

            {/* Logo */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
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

            {/* Section Title with sweep effect */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 text-center mt-4"
            >
                <AnimatePresence mode="wait">
                    {phase === "performance" && (
                        <motion.div
                            key="performance"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.h1
                                className="text-3xl md:text-4xl font-black tracking-wider"
                                style={{
                                    backgroundImage: "linear-gradient(90deg, #64748b, #00c8ff, #64748b)",
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
                                THE GOTRUST PERFORMANCE STAR
                            </motion.h1>
                            <div className="flex items-center justify-center gap-2 mt-2">
                                <Star className="w-4 h-4 text-cyan-400" />
                                <span className="text-white/50 text-sm">Excellence in Performance</span>
                                <Star className="w-4 h-4 text-cyan-400" />
                            </div>
                        </motion.div>
                    )}

                    {(phase === "nominees" || phase === "scanning" || phase === "winner") && (
                        <motion.div
                            key="employee"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.h1
                                className="text-3xl md:text-4xl font-black tracking-wider"
                                style={{
                                    backgroundImage: phase === "winner"
                                        ? "linear-gradient(90deg, #ffd700, #fff, #ffd700)"
                                        : "linear-gradient(90deg, #64748b, #00c8ff, #64748b)",
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
                                GOTRUST - EMPLOYEE OF THE YEAR
                            </motion.h1>
                            <div className="flex items-center justify-center gap-2 mt-2">
                                <Trophy className="w-4 h-4 text-amber-400" />
                                <span className="text-white/50 text-sm">
                                    {phase === "winner" ? "Congratulations!" : "The Nominees"}
                                </span>
                                <Trophy className="w-4 h-4 text-amber-400" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Main Content */}
            <div className="relative z-10 flex-1 flex items-center justify-center">
                {/* Performance Star Section */}
                {phase === "performance" && (
                    <div className="flex flex-col items-center">
                        <ElectricGlowCard person={performanceStarWinner} show={showPerformanceStar} />

                        {!showPerformanceStar && (
                            <motion.button
                                onClick={handleShowWinner}
                                className="px-8 py-3 rounded-xl font-bold text-sm tracking-wider bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex items-center gap-3"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Sparkles className="w-5 h-5" />
                                SHOW WINNER
                            </motion.button>
                        )}

                        {showPerformanceStar && (
                            <motion.button
                                onClick={handleNextSection}
                                className="mt-8 px-8 py-3 rounded-xl font-bold text-sm tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center gap-3"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                            >
                                <Trophy className="w-5 h-5" />
                                EMPLOYEE OF THE YEAR →
                            </motion.button>
                        )}
                    </div>
                )}

                {/* Nominees Section */}
                {(phase === "nominees" || phase === "scanning" || phase === "winner") && (
                    <div className="relative">
                        {/* Radar scan effect */}
                        {phase === "scanning" && <RadarScan onComplete={handleScanComplete} />}

                        {/* Nominees grid */}
                        <div className="flex items-center justify-center gap-6 flex-wrap">
                            {nominees.map((nominee, index) => (
                                <NomineeCard
                                    key={nominee.id}
                                    nominee={nominee}
                                    index={index}
                                    isWinnerRevealed={phase === "winner"}
                                    isScanning={phase === "scanning"}
                                />
                            ))}
                        </div>

                        {/* Verification effect */}
                        <VerificationEffect show={phase === "winner"} />
                    </div>
                )}
            </div>

            {/* Action Button */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="relative z-10 flex justify-center pb-4"
            >
                {phase === "nominees" && (
                    <motion.button
                        onClick={handleRevealWinner}
                        className="px-10 py-4 rounded-2xl font-bold text-base tracking-wider flex items-center gap-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-amber-900 shadow-lg shadow-amber-500/30"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            boxShadow: [
                                "0 10px 40px rgba(245,158,11,0.3)",
                                "0 10px 60px rgba(245,158,11,0.5)",
                                "0 10px 40px rgba(245,158,11,0.3)",
                            ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Award className="w-6 h-6" />
                        REVEAL WINNER
                        <Award className="w-6 h-6" />
                    </motion.button>
                )}

                {phase === "winner" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <motion.p
                            className="text-3xl font-bold tracking-widest"
                            style={{
                                backgroundImage: "linear-gradient(90deg, #fbbf24, #fef08a, #fbbf24)",
                                backgroundSize: "200% 100%",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                            animate={{
                                backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            🎊 CONGRATULATIONS NGUYỄN THIÊN HỮU! 🎊
                        </motion.p>
                    </motion.div>
                )}
            </motion.div>

            {/* Footer */}
            <div className="relative z-10 flex items-center justify-center text-xs text-white/30 tracking-widest">
                <span>CÔNG NGHỆ VÌ CUỘC SỐNG</span>
            </div>
        </SlideTemplate>
    );
}
