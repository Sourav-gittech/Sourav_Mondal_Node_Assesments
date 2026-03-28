"use client"

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LandingPage = () => {
  const router = useRouter();
    const [started, setStarted] = useState(false);

    const handleGetStarted = () => {
        setStarted(true);              
        router.push("/products"); 
    };

    return (
        <div className="h-screen w-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center overflow-hidden">

            {/* Background floating shapes */}
            <motion.div
                className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"
                animate={{ y: [0, 40, 0], x: [0, 30, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
            />

            {/* Main content */}
            <motion.div
                className="relative z-10 text-center px-6"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Brand */}
                <motion.h1
                    className="text-5xl md:text-6xl font-extrabold text-white mb-4"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    Shopsy
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    className="text-lg md:text-xl text-blue-100 max-w-xl mx-auto mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Discover premium fashion, trending styles, and everyday essentials —
                    all in one place.
                </motion.p>

                {/* CTA Button */}
                <motion.button
                    onClick={handleGetStarted}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-full shadow-xl hover:bg-blue-50 transition cursor-pointer"
                >
                    {started ? "Loading..." : "Get Started"}
                </motion.button>
            </motion.div>
        </div>
    );
};

export default LandingPage;