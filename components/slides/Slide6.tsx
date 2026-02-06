"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, RotateCcw, Trophy, Star, Medal, Award } from "lucide-react";
import SlideTemplate from "../SlideTemplate";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";

// Prize configuration: 3 giải Ba, 2 giải Nhì, 1 giải Nhất
const prizes = [
    { id: 1, name: "GIẢI BA", count: 3, color: "from-amber-600 to-amber-700", textColor: "text-amber-100", icon: Medal },
    { id: 2, name: "GIẢI BA", count: 3, color: "from-amber-600 to-amber-700", textColor: "text-amber-100", icon: Medal },
    { id: 3, name: "GIẢI BA", count: 3, color: "from-amber-600 to-amber-700", textColor: "text-amber-100", icon: Medal },
    { id: 4, name: "GIẢI NHÌ", count: 2, color: "from-gray-300 to-gray-400", textColor: "text-gray-800", icon: Award },
    { id: 5, name: "GIẢI NHÌ", count: 2, color: "from-gray-300 to-gray-400", textColor: "text-gray-800", icon: Award },
    { id: 6, name: "GIẢI NHẤT", count: 1, color: "from-yellow-400 to-amber-500", textColor: "text-amber-900", icon: Trophy },
];

// Confetti component
function Confetti() {
    const colors = ["#ff0080", "#00c8ff", "#ffcc00", "#ff4444", "#44ff44", "#ff44ff", "#ffd700"];

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(50)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-3 h-3"
                    style={{
                        left: `${Math.random() * 100}%`,
                        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                        borderRadius: Math.random() > 0.5 ? "50%" : "0%",
                    }}
                    initial={{ y: -20, opacity: 1, rotate: 0 }}
                    animate={{
                        y: ["0%", "100vh"],
                        opacity: [1, 1, 0],
                        rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                        x: [0, (Math.random() - 0.5) * 200],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeOut",
                    }}
                />
            ))}
        </div>
    );
}

// Number Slot Component
function NumberSlot({
    isSpinning,
    finalNumber,
    onSpinComplete,
    currentPrize,
}: {
    isSpinning: boolean;
    finalNumber: number;
    onSpinComplete: () => void;
    currentPrize: typeof prizes[0] | null;
}) {
    const [displayNumber, setDisplayNumber] = useState<number>(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const spinDuration = 3000;

    useEffect(() => {
        if (isSpinning) {
            let startTime = Date.now();

            intervalRef.current = setInterval(() => {
                const elapsed = Date.now() - startTime;

                if (elapsed < spinDuration) {
                    setDisplayNumber(Math.floor(Math.random() * 60) + 1);
                } else {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }
                    setDisplayNumber(finalNumber);
                    onSpinComplete();
                }
            }, 50);

            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            };
        }
    }, [isSpinning, finalNumber, onSpinComplete]);

    const glowColor = currentPrize?.name === "GIẢI NHẤT"
        ? "rgba(255,215,0,0.5)"
        : currentPrize?.name === "GIẢI NHÌ"
            ? "rgba(192,192,192,0.5)"
            : "rgba(205,127,50,0.5)";

    return (
        <div className="relative">
            <motion.div
                className="absolute inset-[-30px] rounded-3xl"
                style={{
                    background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
                    filter: "blur(30px)",
                }}
                animate={isSpinning ? {
                    opacity: [0.5, 1, 0.5],
                    scale: [0.95, 1.05, 0.95],
                } : { opacity: 0.8 }}
                transition={{ duration: 0.3, repeat: isSpinning ? Infinity : 0 }}
            />

            <motion.div
                className="relative w-56 h-56 md:w-72 md:h-72 rounded-3xl overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, #1a0a2e 0%, #0d1b2a 50%, #1a0a2e 100%)",
                    boxShadow: `0 0 60px ${glowColor}, inset 0 0 60px rgba(0,0,0,0.5)`,
                }}
            >
                <div className="absolute inset-0 rounded-3xl p-[3px] pointer-events-none">
                    <motion.div
                        className="absolute inset-0 rounded-3xl"
                        style={{
                            background: currentPrize?.name === "GIẢI NHẤT"
                                ? "conic-gradient(from 0deg, #ffd700, #ff8c00, #ffd700, #ffa500, #ffd700)"
                                : currentPrize?.name === "GIẢI NHÌ"
                                    ? "conic-gradient(from 0deg, #c0c0c0, #e8e8e8, #c0c0c0, #a0a0a0, #c0c0c0)"
                                    : "conic-gradient(from 0deg, #cd7f32, #b87333, #cd7f32, #8b4513, #cd7f32)",
                        }}
                        animate={isSpinning ? { rotate: 360 } : {}}
                        transition={{ duration: 2, repeat: isSpinning ? Infinity : 0, ease: "linear" }}
                    />
                    <div className="absolute inset-[3px] rounded-3xl bg-[#0d1b2a]" />
                </div>

                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <motion.div
                        className="text-7xl md:text-8xl font-black"
                        style={{
                            backgroundImage: currentPrize?.name === "GIẢI NHẤT"
                                ? "linear-gradient(180deg, #ffd700 0%, #ff8c00 50%, #ffd700 100%)"
                                : currentPrize?.name === "GIẢI NHÌ"
                                    ? "linear-gradient(180deg, #e8e8e8 0%, #c0c0c0 50%, #e8e8e8 100%)"
                                    : "linear-gradient(180deg, #cd7f32 0%, #b87333 50%, #cd7f32 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                        animate={isSpinning ? { y: [-5, 5, -5] } : { scale: [1, 1.05, 1] }}
                        transition={isSpinning ? { duration: 0.1, repeat: Infinity } : { duration: 2, repeat: Infinity }}
                    >
                        {displayNumber.toString().padStart(2, '0')}
                    </motion.div>
                </div>

                <Star className="absolute top-3 left-3 w-5 h-5 text-amber-400/50" fill="currentColor" />
                <Star className="absolute top-3 right-3 w-5 h-5 text-amber-400/50" fill="currentColor" />
                <Star className="absolute bottom-3 left-3 w-5 h-5 text-amber-400/50" fill="currentColor" />
                <Star className="absolute bottom-3 right-3 w-5 h-5 text-amber-400/50" fill="currentColor" />
            </motion.div>
        </div>
    );
}

// Prize Progress Indicator
function PrizeProgress({ currentRound, results }: { currentRound: number; results: { prize: typeof prizes[0]; number: number }[] }) {
    return (
        <div className="flex flex-col gap-3 w-48">
            {/* Giải Nhất */}
            <div className={`p-3 rounded-xl border-2 transition-all ${currentRound === 5 ? "border-yellow-400 bg-yellow-500/20" : "border-white/10 bg-white/5"}`}>
                <div className="flex items-center gap-2">
                    <Trophy className={`w-5 h-5 ${currentRound === 5 ? "text-yellow-400" : "text-white/30"}`} />
                    <span className={`text-sm font-bold ${currentRound === 5 ? "text-yellow-400" : "text-white/50"}`}>GIẢI NHẤT</span>
                </div>
                <div className="mt-2 text-center">
                    {results.find(r => r.prize.id === 6)?.number ? (
                        <span className="text-2xl font-black text-yellow-400">{results.find(r => r.prize.id === 6)?.number.toString().padStart(2, '0')}</span>
                    ) : (
                        <span className="text-lg text-white/20">--</span>
                    )}
                </div>
            </div>

            {/* Giải Nhì */}
            <div className={`p-3 rounded-xl border-2 transition-all ${currentRound >= 3 && currentRound <= 4 ? "border-gray-300 bg-gray-400/20" : "border-white/10 bg-white/5"}`}>
                <div className="flex items-center gap-2">
                    <Award className={`w-5 h-5 ${currentRound >= 3 && currentRound <= 4 ? "text-gray-300" : "text-white/30"}`} />
                    <span className={`text-sm font-bold ${currentRound >= 3 && currentRound <= 4 ? "text-gray-300" : "text-white/50"}`}>GIẢI NHÌ (2)</span>
                </div>
                <div className="mt-2 flex gap-2 justify-center">
                    {[4, 5].map((id, i) => {
                        const result = results.find(r => r.prize.id === id);
                        return (
                            <span key={id} className={`text-lg font-bold ${result ? "text-gray-300" : "text-white/20"}`}>
                                {result?.number.toString().padStart(2, '0') || "--"}
                            </span>
                        );
                    })}
                </div>
            </div>

            {/* Giải Ba */}
            <div className={`p-3 rounded-xl border-2 transition-all ${currentRound <= 2 ? "border-amber-600 bg-amber-600/20" : "border-white/10 bg-white/5"}`}>
                <div className="flex items-center gap-2">
                    <Medal className={`w-5 h-5 ${currentRound <= 2 ? "text-amber-500" : "text-white/30"}`} />
                    <span className={`text-sm font-bold ${currentRound <= 2 ? "text-amber-500" : "text-white/50"}`}>GIẢI BA (3)</span>
                </div>
                <div className="mt-2 flex gap-2 justify-center">
                    {[1, 2, 3].map((id) => {
                        const result = results.find(r => r.prize.id === id);
                        return (
                            <span key={id} className={`text-lg font-bold ${result ? "text-amber-500" : "text-white/20"}`}>
                                {result?.number.toString().padStart(2, '0') || "--"}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// Winner Display Component
function WinnerDisplay({ number, prize, show }: { number: number; prize: typeof prizes[0] | null; show: boolean }) {
    if (!prize) return null;
    const Icon = prize.icon;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute bottom-44 left-1/2 -translate-x-1/2 z-30"
                >
                    <motion.div
                        className={`px-8 py-4 rounded-2xl bg-gradient-to-r ${prize.color} shadow-2xl`}
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        <div className="flex items-center gap-4">
                            <Icon className={`w-8 h-8 ${prize.textColor}`} />
                            <div className="text-center">
                                <p className={`text-xs font-bold ${prize.textColor} opacity-80 tracking-widest`}>{prize.name}</p>
                                <p className={`text-3xl font-black ${prize.textColor}`}>{number.toString().padStart(2, '0')}</p>
                            </div>
                            <Icon className={`w-8 h-8 ${prize.textColor}`} />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function Slide6() {
    const [isSpinning, setIsSpinning] = useState(false);
    const [showWinner, setShowWinner] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [winningNumber, setWinningNumber] = useState(0);
    const [currentRound, setCurrentRound] = useState(0); // 0-5 for 6 rounds
    const [results, setResults] = useState<{ prize: typeof prizes[0]; number: number }[]>([]);
    const [usedNumbers, setUsedNumbers] = useState<number[]>([]);
    const [isComplete, setIsComplete] = useState(false);

    const currentPrize = currentRound < 6 ? prizes[currentRound] : null;
    
    // Use refs to store latest values for callbacks
    const winningNumberRef = useRef(winningNumber);
    const currentPrizeRef = useRef(currentPrize);
    
    useEffect(() => {
        winningNumberRef.current = winningNumber;
    }, [winningNumber]);
    
    useEffect(() => {
        currentPrizeRef.current = currentPrize;
    }, [currentPrize]);

    const generateUniqueNumber = useCallback(() => {
        let num;
        do {
            num = Math.floor(Math.random() * 60) + 1;
        } while (usedNumbers.includes(num));
        return num;
    }, [usedNumbers]);

    const handleSpin = useCallback(() => {
        if (isSpinning || currentRound >= 6) return;

        setShowWinner(false);
        setShowConfetti(false);
        setIsSpinning(true);

        const newNumber = generateUniqueNumber();
        setWinningNumber(newNumber);
        setUsedNumbers(prev => [...prev, newNumber]);
    }, [isSpinning, currentRound, generateUniqueNumber]);

    const handleSpinComplete = useCallback(() => {
        setIsSpinning(false);
        setShowWinner(true);
        setShowConfetti(true);

        const prize = currentPrizeRef.current;
        const number = winningNumberRef.current;
        if (prize) {
            setResults(prev => [...prev, { prize, number }]);
        }
    }, []);

    const handleNextRound = useCallback(() => {
        setShowWinner(false);
        setShowConfetti(false);

        if (currentRound < 5) {
            setCurrentRound(prev => prev + 1);
        } else {
            setIsComplete(true);
        }
    }, [currentRound]);

    const handleReset = useCallback(() => {
        setCurrentRound(0);
        setResults([]);
        setUsedNumbers([]);
        setWinningNumber(0);
        setShowWinner(false);
        setShowConfetti(false);
        setIsComplete(false);
    }, []);

    return (
        <SlideTemplate id="slide-6">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#030508]">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e]/60 via-[#030508] to-[#030508]" />

                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-[200%] h-1"
                        style={{
                            background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.1), transparent)",
                            transformOrigin: "0% 50%",
                            rotate: `${i * 45}deg`,
                        }}
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    />
                ))}

                {showConfetti && <Confetti />}
            </div>

            {/* Logo */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 flex justify-center w-full">
                <Image src="/images/gotrust.png" alt="GoTRUST" width={140} height={42} className="h-9 w-auto object-contain" />
            </motion.div>

            {/* Title */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center mt-2">
                <div className="flex items-center justify-center gap-4">
                    <Gift className="w-7 h-7 text-amber-400" />
                    <h1 className="text-2xl md:text-3xl font-black tracking-wider">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300">
                            BỐC THĂM MAY MẮN
                        </span>
                    </h1>
                    <Gift className="w-7 h-7 text-amber-400" />
                </div>
                {currentPrize && !isComplete && (
                    <motion.p
                        key={currentPrize.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-lg font-bold mt-1 ${currentPrize.name === "GIẢI NHẤT" ? "text-yellow-400" :
                                currentPrize.name === "GIẢI NHÌ" ? "text-gray-300" : "text-amber-500"
                            }`}
                    >
                        {currentPrize.name} - Lượt {currentRound + 1}/6
                    </motion.p>
                )}
                {isComplete && (
                    <p className="text-lg font-bold mt-1 text-green-400">🎉 ĐÃ HOÀN THÀNH! 🎉</p>
                )}
            </motion.div>

            {/* Main Content */}
            <div className="relative z-10 flex-1 flex items-center justify-center">
                <div className="flex items-center gap-8">
                    {/* Prize Progress */}
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="hidden lg:block">
                        <PrizeProgress currentRound={currentRound} results={results} />
                    </motion.div>

                    {/* Number Slot */}
                    <NumberSlot
                        isSpinning={isSpinning}
                        finalNumber={winningNumber}
                        onSpinComplete={handleSpinComplete}
                        currentPrize={currentPrize}
                    />

                    {/* Results Panel */}
                    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="hidden lg:block w-48">
                        <h3 className="text-sm font-bold text-amber-400/80 mb-3 tracking-wider text-center">KẾT QUẢ</h3>
                        <div className="space-y-2 max-h-[300px] overflow-y-auto">
                            {results.length === 0 ? (
                                <p className="text-white/30 text-xs text-center">Chưa có</p>
                            ) : (
                                results.map((r, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`flex items-center justify-between p-2 rounded-lg bg-gradient-to-r ${r.prize.color}`}
                                    >
                                        <span className={`text-xs font-bold ${r.prize.textColor}`}>{r.prize.name}</span>
                                        <span className={`text-lg font-black ${r.prize.textColor}`}>{r.number.toString().padStart(2, '0')}</span>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Winner Display */}
            <WinnerDisplay number={winningNumber} prize={currentPrize} show={showWinner} />

            {/* Action Buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="relative z-10 flex justify-center gap-4 pb-4">
                {!isSpinning && !showWinner && !isComplete && (
                    <motion.button
                        onClick={handleSpin}
                        className={`px-10 py-3 rounded-2xl font-black text-base tracking-wider flex items-center gap-3 shadow-lg ${currentPrize?.name === "GIẢI NHẤT"
                                ? "bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 text-amber-900"
                                : currentPrize?.name === "GIẢI NHÌ"
                                    ? "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 text-gray-800"
                                    : "bg-gradient-to-r from-amber-600 via-amber-700 to-amber-600 text-amber-100"
                            }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Sparkles className="w-5 h-5" />
                        QUAY {currentPrize?.name}
                        <Sparkles className="w-5 h-5" />
                    </motion.button>
                )}

                {showWinner && !isComplete && (
                    <motion.button
                        onClick={handleNextRound}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-8 py-3 rounded-xl font-bold text-sm tracking-wider flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {currentRound < 5 ? `TIẾP TỤC → ${prizes[currentRound + 1].name}` : "KẾT THÚC"}
                    </motion.button>
                )}

                {isComplete && (
                    <motion.button
                        onClick={handleReset}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-8 py-3 rounded-xl font-bold text-sm tracking-wider flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <RotateCcw className="w-5 h-5" />
                        QUAY LẠI TỪ ĐẦU
                    </motion.button>
                )}
            </motion.div>

            {/* Footer */}
            <div className="relative z-10 flex items-center justify-center pb-2 text-xs text-white/30 tracking-widest">
                <span>🍀 3 GIẢI BA • 2 GIẢI NHÌ • 1 GIẢI NHẤT 🍀</span>
            </div>
        </SlideTemplate>
    );
}
