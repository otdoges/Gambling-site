"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface MinesContextType {
  bet: number;
  setBet: (bet: number) => void;
  mines: number;
  setMines: (mines: number) => void;
  multiplier: number;
  setMultiplier: (multiplier: number) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  gameOver: boolean;
  setGameOver: (gameOver: boolean) => void;
}

const MinesContext = createContext<MinesContextType | undefined>(undefined);

export function MinesProvider({ children }: { children: ReactNode }) {
  const [bet, setBet] = useState(0);
  const [mines, setMines] = useState(3);
  const [multiplier, setMultiplier] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  return (
    <MinesContext.Provider
      value={{
        bet,
        setBet,
        mines,
        setMines,
        multiplier,
        setMultiplier,
        isPlaying,
        setIsPlaying,
        gameOver,
        setGameOver,
      }}
    >
      {children}
    </MinesContext.Provider>
  );
}

export function useMinesGame() {
  const context = useContext(MinesContext);
  if (!context) {
    throw new Error("useMinesGame must be used within a MinesProvider");
  }
  return context;
}