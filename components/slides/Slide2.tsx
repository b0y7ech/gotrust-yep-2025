"use client";

import { motion, AnimatePresence } from "framer-motion";
import { VolumeX, Volume2, Play, Flag, Users, Rocket, Award, Globe } from "lucide-react";
import SlideTemplate from "../SlideTemplate";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

// Milestone data với thời gian xuất hiện (giây)
const milestones = [
    { time: 5, icon: Rocket, date: "JAN 2025", title: "NRF USA Showcase" },
    { time: 20, icon: Globe, date: "MAR 2025", title: "Tech Expansion v2.0" },
    { time: 45, icon: Flag, date: "OCT 2025", title: "CiviPay Launch" },
    { time: 75, icon: Users, date: "DEC 2025", title: "1M Users Milestone" },
    { time: 100, icon: Award, date: "DEC 2025", title: "MasterCard Partner" },
];

// Border Beam Animation Component
function BorderBeam() {
    return (
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            {/* Top beam */}
            <motion.div
                className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#00c8ff] to-transparent"
                style={{ width: "30%" }}
                animate={{ left: ["0%", "70%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            {/* Right beam */}
            <motion.div
                className="absolute top-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-[#00c8ff] to-transparent"
                style={{ height: "30%" }}
                animate={{ top: ["0%", "70%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
            />
            {/* Bottom beam */}
            <motion.div
                className="absolute bottom-0 right-0 h-[2px] bg-gradient-to-l from-transparent via-[#00c8ff] to-transparent"
                style={{ width: "30%" }}
                animate={{ right: ["0%", "70%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
            />
            {/* Left beam */}
            <motion.div
                className="absolute bottom-0 left-0 w-[2px] bg-gradient-to-t from-transparent via-[#00c8ff] to-transparent"
                style={{ height: "30%" }}
                animate={{ bottom: ["0%", "70%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 3 }}
            />
        </div>
    );
}

// Milestone Badge Component
function MilestoneBadge({ icon: Icon, date, title, position }: {
    icon: typeof Rocket;
    date: string;
    title: string;
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
    const positionClasses = {
        "top-left": "top-4 left-4",
        "top-right": "top-4 right-4",
        "bottom-left": "bottom-16 left-4",
        "bottom-right": "bottom-16 right-4",
    };

    return (
        <motion.div
            className={`absolute ${positionClasses[position]} z-20`}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0a1828]/80 backdrop-blur-md border border-[#00c8ff]/20">
                <div className="w-10 h-10 rounded-lg bg-[#00c8ff]/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#00c8ff]" />
                </div>
                <div>
                    <p className="text-[10px] text-[#00c8ff] font-bold tracking-wider">{date}</p>
                    <p className="text-sm text-white font-medium">{title}</p>
                </div>
            </div>
        </motion.div>
    );
}

export default function Slide2() {
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [activeMilestones, setActiveMilestones] = useState<number[]>([]);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Handle video time update
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime);

            // Check milestones
            const newActiveMilestones = milestones
                .filter((m, i) =>
                    video.currentTime >= m.time &&
                    video.currentTime < m.time + 8 &&
                    !activeMilestones.includes(i)
                )
                .map((_, i) => milestones.findIndex(m => video.currentTime >= m.time && video.currentTime < m.time + 8));

            if (newActiveMilestones.length > 0) {
                setActiveMilestones(prev => [...prev, ...newActiveMilestones.filter(i => !prev.includes(i))]);

                // Remove milestone after 8 seconds
                setTimeout(() => {
                    setActiveMilestones(prev => prev.filter(i => !newActiveMilestones.includes(i)));
                }, 8000);
            }
        };

        const handleLoadedMetadata = () => {
            setDuration(video.duration);
        };

        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("loadedmetadata", handleLoadedMetadata);

        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, [activeMilestones]);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <SlideTemplate id="slide-2">
            {/* Deep Space Background with blur */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#040810]">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a1828]/40 via-[#040810] to-[#040810]" />

                {/* Grid pattern - more subtle */}
                <div className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(0, 200, 255, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 200, 255, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: '80px 80px',
                    }}
                />

                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-[#00c8ff]/30 rounded-full"
                        style={{
                            left: `${10 + (i * 12)}%`,
                            top: `${20 + (i % 4) * 20}%`,
                        }}
                        animate={{
                            y: [-20, 20, -20],
                            opacity: [0.1, 0.4, 0.1],
                        }}
                        transition={{
                            duration: 5 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                    />
                ))}
            </div>

            {/* Logo Only */}
            <motion.div
                initial="hidden"
                animate="show"
                variants={fadeIn}
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

            {/* Main Title */}
            <motion.div
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="relative z-10 text-center mt-6"
            >
                <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight"
                    style={{ fontStyle: 'italic' }}
                    animate={{
                        textShadow: [
                            "0 0 20px rgba(0,200,255,0.3)",
                            "0 0 40px rgba(0,200,255,0.5)",
                            "0 0 20px rgba(0,200,255,0.3)",
                        ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <span className="text-[#00c8ff]">HÀNH TRÌNH 2025:</span>{" "}
                    <span className="text-white">NHỮNG NỖ LỰC & BỨT PHÁ</span>
                </motion.h1>

                {/* Decorative line */}
                <motion.div
                    className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00c8ff] to-transparent mx-auto mt-4"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.div>

            {/* Video Container with Floating Effect */}
            <motion.div
                className="relative z-10 flex-1 flex items-center justify-center py-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                <motion.div
                    className="relative w-full max-w-7xl px-4"
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                    {/* Glass Container */}
                    <div className="relative rounded-2xl overflow-hidden bg-[#0a1828]/40 backdrop-blur-xl border border-[#00c8ff]/20 p-1">
                        {/* Border Beam Effect */}
                        <BorderBeam />

                        {/* Video Element */}
                        <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
                            <video
                                ref={videoRef}
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                                muted={isMuted}
                                playsInline
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                            >
                                <source src="/videos/Video_Hành_Trình_GoTRUST.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            {/* Play Overlay (when paused) */}
                            {!isPlaying && (
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
                                    onClick={togglePlay}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <motion.div
                                        className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                                    </motion.div>
                                </motion.div>
                            )}

                            {/* Milestone Badges Overlay */}
                            <AnimatePresence>
                                {activeMilestones.map((milestoneIndex) => {
                                    const milestone = milestones[milestoneIndex];
                                    const positions: ("top-left" | "top-right" | "bottom-left" | "bottom-right")[] = ["top-left", "top-right", "bottom-left", "bottom-right"];
                                    return (
                                        <MilestoneBadge
                                            key={milestoneIndex}
                                            icon={milestone.icon}
                                            date={milestone.date}
                                            title={milestone.title}
                                            position={positions[milestoneIndex % 4]}
                                        />
                                    );
                                })}
                            </AnimatePresence>

                            {/* Progress Bar */}
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-white/60 font-mono">{formatTime(currentTime)}</span>
                                    <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-[#00c8ff] to-[#00a0cc]"
                                            style={{ width: `${(currentTime / duration) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-white/60 font-mono">{formatTime(duration)}</span>
                                </div>
                            </div>

                            {/* Unmute Button */}
                            <motion.button
                                onClick={toggleMute}
                                className="absolute bottom-14 right-4 w-10 h-10 rounded-full bg-[#0a1828]/80 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#0a1828] transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isMuted ? (
                                    <VolumeX className="w-5 h-5 text-white/70" />
                                ) : (
                                    <Volume2 className="w-5 h-5 text-[#00c8ff]" />
                                )}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Bottom Text */}
            <motion.div
                initial="hidden"
                animate="show"
                variants={fadeIn}
                className="relative z-10 flex items-center justify-center gap-4"
            >
                <motion.div
                    className="flex items-center gap-4 text-sm tracking-[0.2em]"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 4, repeat: Infinity }}
                >
                    <span className="text-white/60 uppercase">Số hóa dựa trên sự tin cậy</span>
                    <motion.span
                        className="text-[#00c8ff]"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        →
                    </motion.span>
                    <span className="text-white uppercase font-bold">Công nghệ vì cuộc sống</span>
                </motion.div>

                {/* Decorative dot */}
                <motion.div
                    className="w-3 h-3 rounded-full bg-[#00c8ff] ml-4"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.div>
        </SlideTemplate>
    );
}
