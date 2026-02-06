"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Play, ChevronLeft, ChevronRight, Music, Zap } from "lucide-react";
import SlideTemplate from "../SlideTemplate";
import Image from "next/image";
import { useState } from "react";

// Game data with YouTube video IDs
const games = [
    {
        id: 1,
        title: "GAME 1",
        subtitle: "Đuổi Hình Bắt Chữ",
        videoId: "uU_68jJDQvA",
        color: "from-pink-500 to-purple-600",
        bgColor: "bg-pink-500/10",
    },
    {
        id: 2,
        title: "GAME 2",
        subtitle: "Đuổi Hình Bắt Chữ",
        videoId: "m9lEiJB7TAw",
        color: "from-cyan-500 to-blue-600",
        bgColor: "bg-cyan-500/10",
    },
    {
        id: 3,
        title: "GAME 3",
        subtitle: "Đuổi Hình Bắt Chữ",
        videoId: "OFD1WVlkpPk",
        color: "from-amber-500 to-orange-600",
        bgColor: "bg-amber-500/10",
    },
];

// Beat animation component
function BeatPulse({ delay = 0 }: { delay?: number }) {
    return (
        <motion.div
            className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500"
            animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0.3, 0.8],
            }}
            transition={{
                duration: 0.8,
                repeat: Infinity,
                delay,
            }}
        />
    );
}

// YouTube Embed Component
function YouTubeEmbed({ videoId, isActive }: { videoId: string; isActive: boolean }) {
    return (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/50">
            {isActive ? (
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                    <img
                        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                        alt="Video thumbnail"
                        className="absolute inset-0 w-full h-full object-cover opacity-50"
                    />
                    <motion.div
                        className="relative z-10 w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Play className="w-10 h-10 text-white ml-1" fill="white" />
                    </motion.div>
                </div>
            )}
        </div>
    );
}

// Game Card Component
function GameCard({
    game,
    isActive,
    onClick,
}: {
    game: typeof games[0];
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <motion.div
            onClick={onClick}
            className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${isActive ? "ring-4 ring-white/50" : "opacity-60 hover:opacity-80"
                }`}
            whileHover={{ scale: isActive ? 1 : 1.05 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className={`p-4 ${game.bgColor} backdrop-blur-sm`}>
                <div className={`text-center bg-gradient-to-r ${game.color} bg-clip-text text-transparent`}>
                    <h3 className="text-lg font-black tracking-wider">{game.title}</h3>
                    <p className="text-xs opacity-80 text-white/60">{game.subtitle}</p>
                </div>
            </div>
        </motion.div>
    );
}

export default function Slide5() {
    const [activeGame, setActiveGame] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleGameSelect = (index: number) => {
        setActiveGame(index);
        setIsPlaying(false);
    };

    const handlePlayVideo = () => {
        setIsPlaying(true);
    };

    const nextGame = () => {
        setActiveGame((prev) => (prev + 1) % games.length);
        setIsPlaying(false);
    };

    const prevGame = () => {
        setActiveGame((prev) => (prev - 1 + games.length) % games.length);
        setIsPlaying(false);
    };

    return (
        <SlideTemplate id="slide-5">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#030508]">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e]/50 via-[#030508] to-[#030508]" />

                {/* Beat visualizer lines */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bottom-0 w-1 bg-gradient-to-t from-pink-500/50 to-transparent rounded-full"
                        style={{ left: `${5 + i * 5}%` }}
                        animate={{
                            height: [`${20 + Math.random() * 30}%`, `${50 + Math.random() * 40}%`, `${20 + Math.random() * 30}%`],
                            opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                            duration: 0.5 + Math.random() * 0.5,
                            repeat: Infinity,
                            delay: i * 0.1,
                        }}
                    />
                ))}

                {/* Floating music notes */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-2xl pointer-events-none"
                        style={{
                            left: `${10 + Math.random() * 80}%`,
                            top: `${20 + Math.random() * 60}%`,
                        }}
                        animate={{
                            y: [-20, 20, -20],
                            x: [-10, 10, -10],
                            opacity: [0.2, 0.5, 0.2],
                            rotate: [-10, 10, -10],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                    >
                        {i % 2 === 0 ? "🎵" : "🎶"}
                    </motion.div>
                ))}
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

            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 text-center mt-4"
            >
                <div className="flex items-center justify-center gap-4">
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                    >
                        <Gamepad2 className="w-8 h-8 text-pink-400" />
                    </motion.div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-wider">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
                            GAME INTERACTIVE
                        </span>
                    </h1>
                    <motion.div
                        animate={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                    >
                        <Music className="w-8 h-8 text-cyan-400" />
                    </motion.div>
                </div>
                <p className="text-white/50 text-sm mt-2 tracking-widest">
                    ĐUỔI HÌNH BẮT CHỮ THEO BEAT 🎵
                </p>
            </motion.div>

            {/* Main Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-6 px-8">
                {/* Video Player */}
                <motion.div
                    className="w-full max-w-4xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="relative">
                        {/* Navigation arrows */}
                        <motion.button
                            onClick={prevGame}
                            className="absolute left-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center z-20 hover:bg-white/20 transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronLeft className="w-6 h-6 text-white" />
                        </motion.button>

                        <motion.button
                            onClick={nextGame}
                            className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center z-20 hover:bg-white/20 transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronRight className="w-6 h-6 text-white" />
                        </motion.button>

                        {/* Video container with glow */}
                        <div className="relative">
                            <motion.div
                                className="absolute inset-[-10px] rounded-3xl"
                                style={{
                                    background: `linear-gradient(135deg, ${games[activeGame].color.includes("pink") ? "rgba(236,72,153,0.3)" : games[activeGame].color.includes("cyan") ? "rgba(6,182,212,0.3)" : "rgba(245,158,11,0.3)"}, transparent)`,
                                    filter: "blur(20px)",
                                }}
                                animate={{
                                    opacity: [0.5, 0.8, 0.5],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />

                            <div className="relative rounded-2xl overflow-hidden border-2 border-white/10" onClick={handlePlayVideo}>
                                <YouTubeEmbed videoId={games[activeGame].videoId} isActive={isPlaying} />
                            </div>
                        </div>

                        {/* Game title overlay */}
                        <motion.div
                            className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 z-10"
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <span className="text-sm font-black text-white tracking-wider flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                {games[activeGame].title}: {games[activeGame].subtitle}
                                <Zap className="w-4 h-4" />
                            </span>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Game selector */}
                <motion.div
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    {games.map((game, index) => (
                        <GameCard
                            key={game.id}
                            game={game}
                            isActive={activeGame === index}
                            onClick={() => handleGameSelect(index)}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Footer */}
            <div className="relative z-10 flex items-center justify-center pb-2 text-xs text-white/30 tracking-widest">
                <span>🎮 CHƠI GAME - NHẬN QUÀ - VUI HẾT NẤC! 🎁</span>
            </div>
        </SlideTemplate>
    );
}
