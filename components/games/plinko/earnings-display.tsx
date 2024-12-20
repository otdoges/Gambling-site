"use client";

import { motion, AnimatePresence } from "framer-motion";

interface EarningsDisplayProps {
  currentMultiplier: number | null;
  lastWinAmount: number;
  totalWinnings: number;
  ballsDropped: number;
}

export function EarningsDisplay({
  currentMultiplier,
  lastWinAmount,
  totalWinnings,
  ballsDropped
}: EarningsDisplayProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-[#1A2C38] border-[#2A3C48] rounded-lg p-4 border">
        <div className="text-sm text-gray-400">Last Win</div>
        <AnimatePresence mode="wait">
          <motion.div
            key={lastWinAmount}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-2xl font-bold"
          >
            <span className={lastWinAmount > 0 ? "text-[#00FF00]" : "text-white"}>
              ${lastWinAmount.toFixed(2)}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="bg-[#1A2C38] border-[#2A3C48] rounded-lg p-4 border">
        <div className="text-sm text-gray-400">Multiplier</div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMultiplier}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-2xl font-bold text-yellow-500"
          >
            {currentMultiplier ? `${currentMultiplier}x` : "-"}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="bg-[#1A2C38] border-[#2A3C48] rounded-lg p-4 border">
        <div className="text-sm text-gray-400">Total Profit</div>
        <AnimatePresence mode="wait">
          <motion.div
            key={totalWinnings}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-2xl font-bold"
          >
            <span className={totalWinnings > 0 ? "text-[#00FF00]" : "text-red-500"}>
              ${totalWinnings.toFixed(2)}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}