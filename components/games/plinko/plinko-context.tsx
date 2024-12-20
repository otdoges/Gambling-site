"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface PlinkoContextType {
  bet: number;
  setBet: (bet: number) => void;
  isDropping: boolean;
  setIsDropping: (isDropping: boolean) => void;
  ballsDropped: number;
  setBallsDropped: (balls: number) => void;
  totalWinnings: number;
  setTotalWinnings: (winnings: number) => void;
}

const PlinkoContext = createContext<PlinkoContextType | undefined>(undefined);

export function PlinkoProvider({ children }: { children: ReactNode }) {
  const [bet, setBet] = useState(100);
  const [isDropping, setIsDropping] = useState(false);
  const [ballsDropped, setBallsDropped] = useState(0);
  const [totalWinnings, setTotalWinnings] = useState(0);

  return (
    <PlinkoContext.Provider
      value={{
        bet,
        setBet,
        isDropping,
        setIsDropping,
        ballsDropped,
        setBallsDropped,
        totalWinnings,
        setTotalWinnings,
      }}
    >
      {children}
    </PlinkoContext.Provider>
  );
}

export function usePlinkoGame() {
  const context = useContext(PlinkoContext);
  if (!context) {
    throw new Error("usePlinkoGame must be used within a PlinkoProvider");
  }
  return context;
}