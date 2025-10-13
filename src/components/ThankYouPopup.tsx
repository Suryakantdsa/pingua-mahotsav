"use client";
import React, { useEffect, useState } from "react";
import { X, Sparkles, Camera, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ThankYouPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("pingua_mahotsav_visited");
    if (!hasVisited) {
      setTimeout(() => setShowPopup(true), 1800);
      localStorage.setItem("pingua_mahotsav_visited", "true");
    }
  }, []);

  const handleClose = () => setShowPopup(false);

  // Floating particles data
  const floatingIcons = ["🎊", "✨", "🌸", "🎉", "❤️", "🌟", "🥳", "💫"];

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg p-4"
        >
          {/* Animated background particles - Reduced count on mobile */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[
              ...Array(
                typeof window !== "undefined" && window.innerWidth < 768
                  ? 8
                  : 15
              ),
            ].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-300/40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize:
                    typeof window !== "undefined" && window.innerWidth < 768
                      ? "16px"
                      : "20px",
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                {floatingIcons[i % floatingIcons.length]}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="relative bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 text-white rounded-3xl shadow-2xl w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto text-center overflow-hidden border-2 border-yellow-300/30"
          >
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-200 via-orange-300 to-red-400 opacity-50"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ filter: "blur(10px)", zIndex: -1 }}
            />

            {/* Close button - Responsive positioning and size */}
            <motion.button
              onClick={handleClose}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-1 sm:p-1.5 transition-all duration-200 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4 text-white group-hover:text-yellow-200" />
            </motion.button>

            {/* Main content container - Responsive padding */}
            <div className="relative z-5 p-4 sm:p-6 md:p-8">
              {/* Animated header */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  delay: 0.2,
                }}
                className="mb-3 sm:mb-4"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  className="text-3xl sm:text-4xl md:text-5xl mb-1 sm:mb-2"
                >
                  🎊
                </motion.div>
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent drop-shadow-lg leading-tight"
                >
                  Thank You for the
                  <br className="sm:hidden" /> Love & Support!
                </motion.h2>
              </motion.div>

              {/* Main message with responsive text sizes */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-3 sm:space-y-4 mb-4 sm:mb-6"
              >
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/95 font-medium px-1">
                  The{" "}
                  <span className="font-bold text-yellow-200 drop-shadow-sm whitespace-nowrap">
                    13th Pingua Mahotsav 2025
                  </span>{" "}
                  <span className="font-bold text-yellow-200 drop-shadow-sm whitespace-nowrap">
                    (6th Oct – 12th Oct){" "}
                  </span>
                  was a magical celebration of tradition, togetherness & pure
                  happiness
                </p>

                {/* Photos & Videos section - Responsive layout */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center justify-center gap-2 sm:gap-3 bg-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 backdrop-blur-sm border border-white/20"
                >
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 flex-shrink-0" />
                  <p className="text-xs sm:text-sm font-semibold text-yellow-100 leading-tight">
                    Stay tuned for photos & videos of unforgettable memories
                  </p>
                </motion.div>

                {/* 2026 Section - Responsive layout */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex items-center justify-center gap-2 sm:gap-3 bg-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 backdrop-blur-sm border border-white/20"
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 flex-shrink-0" />
                  <p className="text-base sm:text-lg md:text-xl font-bold text-yellow-200 leading-tight">
                    See You in{" "}
                    <span className="underline decoration-2">2026!</span>
                  </p>
                </motion.div>
              </motion.div>

              {/* Footer with responsive text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm text-white/80 italic flex-wrap"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  ❤️
                </motion.div>
                <span className="text-center">
                  Cherishing the memories forever
                </span>
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                    delay: 0.5,
                  }}
                >
                  ❤️
                </motion.div>
              </motion.div>
            </div>

            {/* Bottom glow effect */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-200 to-transparent rounded-full"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThankYouPopup;
