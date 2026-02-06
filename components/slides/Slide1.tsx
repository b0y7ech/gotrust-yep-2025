"use client";

import { motion } from "framer-motion";
import { QrCode, Shield, Building2, Plane } from "lucide-react";
import SlideTemplate from "../SlideTemplate";
import Image from "next/image";
import { ReactNode } from "react";

const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

// Service cards data với vị trí
const serviceCards: {
    icon?: typeof Shield;
    logo?: string;
    title: string;
    subtitle: string;
    position: { top?: string; bottom?: string; left?: string; right?: string };
    delay: number;
}[] = [
        {
            icon: Shield,
            title: "Trạm công dân số",
            subtitle: "DIGITAL CITIZEN HUB",
            position: { top: "10%", left: "10%" },
            delay: 0,
        },
        {
            logo: "/images/MediPay_logo.png",
            title: "Y tế số MediPay",
            subtitle: "SMART HEALTHCARE",
            position: { top: "10%", right: "10%" },
            delay: 0.2,
        },
        {
            icon: Building2,
            title: "Hành chính công CiviPay",
            subtitle: "PUBLIC SERVICES",
            position: { top: "40%", left: "3%" },
            delay: 0.4,
        },
        {
            logo: "/images/EduPay_logo.png",
            title: "Giáo dục số EduPay",
            subtitle: "EDUCATION FINTECH",
            position: { top: "40%", right: "3%" },
            delay: 0.6,
        },
        {
            icon: Plane,
            title: "Trạm Du lịch số",
            subtitle: "SMART TOURISM",
            position: { bottom: "20%", left: "10%" },
            delay: 0.8,
        },
    ];

// Floating animation for cards
const floatAnimation = (delay: number) => ({
    y: [-8, 8, -8],
    transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay,
    },
});

// Orbit animation component
function OrbitingElement({ children, duration, radius, startAngle, clockwise = true }: {
    children: ReactNode;
    duration: number;
    radius: number;
    startAngle: number;
    clockwise?: boolean;
}) {
    return (
        <motion.div
            className="absolute"
            style={{
                width: radius * 2,
                height: radius * 2,
                left: `calc(50% - ${radius}px)`,
                top: `calc(45% - ${radius}px)`,
            }}
            animate={{
                rotate: clockwise ? [startAngle, startAngle + 360] : [startAngle, startAngle - 360],
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "linear",
            }}
        >
            <div
                className="absolute"
                style={{
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
            >
                <motion.div
                    animate={{ rotate: clockwise ? [0, -360] : [0, 360] }}
                    transition={{ duration, repeat: Infinity, ease: "linear" }}
                >
                    {children}
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function Slide1() {
    return (
        <SlideTemplate id="slide-1">
            {/* Deep Space Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#040810]">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a1828]/60 via-[#040810] to-[#040810]" />

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(0, 200, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 200, 255, 0.3) 1px, transparent 1px)
            `,
                        backgroundSize: '80px 80px',
                    }}
                />

                {/* Floating characters - subtle background */}
                {["Y", "E", "P", "G", "o", "T", "R", "U", "S", "T"].map((char, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-[#0a2540]/20 text-4xl font-bold pointer-events-none select-none"
                        style={{
                            left: `${5 + (i * 10)}%`,
                            top: `${25 + (i % 3) * 20}%`,
                        }}
                        animate={{
                            y: [-15, 15, -15],
                            opacity: [0.08, 0.15, 0.08],
                        }}
                        transition={{
                            duration: 6 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.3,
                        }}
                    >
                        {char}
                    </motion.div>
                ))}

                {/* Corner markers */}
                <div className="absolute top-8 right-8 w-6 h-6 border-t border-r border-[#00c8ff]/20" />
                <div className="absolute top-8 left-8 w-6 h-6 border-t border-l border-[#00c8ff]/20" />
                <div className="absolute bottom-32 right-8 w-6 h-6 border-b border-r border-[#00c8ff]/20" />
                <div className="absolute bottom-32 left-8 w-6 h-6 border-b border-l border-[#00c8ff]/20" />
            </div>

            {/* Orbiting elements around the center */}
            <div className="pointer-events-none absolute inset-0">
                {/* Orbit ring 1 - dots */}
                <OrbitingElement duration={30} radius={280} startAngle={0} clockwise>
                    <div className="w-2 h-2 bg-[#00c8ff]/40 rounded-full" />
                </OrbitingElement>
                <OrbitingElement duration={30} radius={280} startAngle={120} clockwise>
                    <div className="w-2 h-2 bg-[#00c8ff]/40 rounded-full" />
                </OrbitingElement>
                <OrbitingElement duration={30} radius={280} startAngle={240} clockwise>
                    <div className="w-2 h-2 bg-[#00c8ff]/40 rounded-full" />
                </OrbitingElement>

                {/* Orbit ring 2 - larger dots */}
                <OrbitingElement duration={45} radius={380} startAngle={45} clockwise={false}>
                    <div className="w-3 h-3 bg-[#00c8ff]/20 rounded-full" />
                </OrbitingElement>
                <OrbitingElement duration={45} radius={380} startAngle={165} clockwise={false}>
                    <div className="w-3 h-3 bg-[#00c8ff]/20 rounded-full" />
                </OrbitingElement>
                <OrbitingElement duration={45} radius={380} startAngle={285} clockwise={false}>
                    <div className="w-3 h-3 bg-[#00c8ff]/20 rounded-full" />
                </OrbitingElement>

                {/* Orbit ring 3 - small diamonds */}
                <OrbitingElement duration={60} radius={450} startAngle={90}>
                    <div className="w-4 h-4 bg-[#00c8ff]/10 rotate-45" />
                </OrbitingElement>
                <OrbitingElement duration={60} radius={450} startAngle={270}>
                    <div className="w-4 h-4 bg-[#00c8ff]/10 rotate-45" />
                </OrbitingElement>
            </div>

            {/* Header - Logo GoTRUST */}
            <motion.div
                initial="hidden"
                animate="show"
                variants={fadeIn}
                className="relative z-10 flex flex-col items-center pt-2"
            >
                {/* Logo from image */}
                <motion.div
                    className="h-16 mb-2"
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Image
                        src="/images/Logo.png"
                        alt="GoTRUST"
                        width={180}
                        height={64}
                        className="h-full w-auto object-contain"
                    />
                </motion.div>
            </motion.div>

            {/* Main Content - Center Title with Surrounding Cards */}
            <div className="relative z-10 flex-1 flex items-center justify-center">
                {/* Service Cards - positioned around the edges */}
                {serviceCards.map(({ icon: Icon, logo, title, subtitle, position, delay }, index) => (
                    <motion.div
                        key={title}
                        className="absolute z-20"
                        style={{
                            ...position,
                            ...(position.left === "50%" ? { transform: "translateX(-50%)" } : {}),
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + delay, duration: 0.6 }}
                    >
                        <motion.div
                            className="w-44 p-5 rounded-2xl bg-[#0a1828]/60 backdrop-blur-md border border-[#00c8ff]/10 hover:border-[#00c8ff]/30 transition-all cursor-pointer"
                            animate={floatAnimation(delay)}
                            whileHover={{ scale: 1.05, y: -10 }}
                        >
                            <div className="w-12 h-12 rounded-xl bg-[#00c8ff]/10 border border-[#00c8ff]/20 flex items-center justify-center mb-4 mx-auto overflow-hidden">
                                {logo ? (
                                    <Image
                                        src={logo}
                                        alt={title}
                                        width={32}
                                        height={32}
                                        className="w-8 h-8 object-contain"
                                    />
                                ) : Icon ? (
                                    <Icon className="w-6 h-6 text-[#00c8ff]" />
                                ) : null}
                            </div>
                            <h3 className="text-sm font-bold text-white text-center mb-1">{title}</h3>
                            <p className="text-[10px] text-white/40 text-center tracking-wider">{subtitle}</p>
                        </motion.div>
                    </motion.div>
                ))}

                {/* Center Title */}
                <motion.div
                    className="text-center z-10"
                    initial="hidden"
                    animate="show"
                    variants={fadeUp}
                >
                    <motion.h1
                        className="text-7xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tight"
                        style={{ fontStyle: 'italic' }}
                    >
                        <motion.span
                            className="block"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            YEAR END
                        </motion.span>
                        <motion.span
                            className="block"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            PARTY
                        </motion.span>
                        <motion.span
                            className="block text-[#00c8ff]"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                textShadow: [
                                    "0 0 30px rgba(0,200,255,0.4)",
                                    "0 0 60px rgba(0,200,255,0.7)",
                                    "0 0 30px rgba(0,200,255,0.4)",
                                ],
                            }}
                            transition={{
                                delay: 0.6,
                                duration: 0.8,
                                textShadow: { duration: 3, repeat: Infinity }
                            }}
                        >
                            2025
                        </motion.span>
                    </motion.h1>
                </motion.div>
            </div>

            {/* Bottom Panel - Check-in Portal */}
            <motion.div
                className="relative z-10 w-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
            >
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#0a1828]/40 backdrop-blur-md border border-white/5">
                    {/* QR Code Section */}
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                            <QrCode className="w-12 h-12 text-[#040810]" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white tracking-wider">CHECK-IN PORTAL</h4>
                            <p className="text-xs text-white/50">
                                Vui lòng check-in và nhận <span className="text-[#00c8ff] font-bold">Số may mắn</span> tại quầy tiếp đón
                            </p>
                        </div>
                    </div>

                    {/* Status Indicators */}
                    <div className="hidden md:flex items-center gap-8">
                        <div>
                            <p className="text-[10px] text-white/40 tracking-wider mb-1">SYSTEM STATUS</p>
                            <div className="flex items-center gap-2">
                                <motion.div
                                    className="w-2 h-2 rounded-full bg-green-500"
                                    animate={{ opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <span className="text-xs font-bold text-green-500">ONLINE</span>
                            </div>
                        </div>

                        <div>
                            <p className="text-[10px] text-white/40 tracking-wider mb-1">LOCATION</p>
                            <p className="text-xs font-bold text-white">ABYSS GATE • LEVEL 42</p>
                        </div>

                        <div>
                            <p className="text-[10px] text-white/40 tracking-wider mb-1">COORDINATES</p>
                            <p className="text-xs font-medium text-white/70">10.7626 N / 106.6602 E</p>
                        </div>
                    </div>

                    {/* Scan Button */}
                    <motion.button
                        className="px-6 py-3 rounded-lg border border-[#00c8ff] text-[#00c8ff] font-bold text-sm tracking-wider flex items-center gap-2 hover:bg-[#00c8ff]/10 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <QrCode className="w-4 h-4" />
                        SCAN PORTAL
                    </motion.button>
                </div>
            </motion.div>
        </SlideTemplate>
    );
}
