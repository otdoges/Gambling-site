"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Gem, Bomb } from "lucide-react";
import { useMinesGame } from "./mines-context";

interface Cell {
  revealed: boolean;
  isMine: boolean;
}

export function MinesGrid() {
  const { mines, isPlaying, setIsPlaying, gameOver, setGameOver, setMultiplier } = useMinesGame();
  const [grid, setGrid] = useState<Cell[]>(Array(25).fill({ revealed: false, isMine: false }));

  useEffect(() => {
    if (isPlaying) {
      initializeGrid();
    }
  }, [isPlaying, mines]);

  const initializeGrid = () => {
    const newGrid = Array(25).fill(null).map(() => ({
      revealed: false,
      isMine: false,
    }));

    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const randomIndex = Math.floor(Math.random() * 25);
      if (!newGrid[randomIndex].isMine) {
        newGrid[randomIndex].isMine = true;
        minesPlaced++;
      }
    }

    setGrid(newGrid);
    setMultiplier(1);
  };

  const handleCellClick = (index: number) => {
    if (!isPlaying || grid[index].revealed) return;

    const newGrid = [...grid];
    newGrid[index] = { ...newGrid[index], revealed: true };

    if (newGrid[index].isMine) {
      setGameOver(true);
      setIsPlaying(false);
      // Reveal all mines
      newGrid.forEach((cell, i) => {
        if (cell.isMine) {
          newGrid[i] = { ...cell, revealed: true };
        }
      });
    } else {
      setMultiplier((prev) => prev * 1.2);
    }

    setGrid(newGrid);
  };

  return (
    <div className="grid grid-cols-5 gap-3">
      {grid.map((cell, index) => (
        <Button
          key={index}
          onClick={() => handleCellClick(index)}
          disabled={!isPlaying || cell.revealed}
          className={`
            w-full h-24 p-0 rounded-lg transition-all duration-200
            ${cell.revealed 
              ? cell.isMine 
                ? "bg-red-500 hover:bg-red-600" 
                : "bg-[#00FF00] hover:bg-[#00DD00]"
              : "bg-[#0F1923] hover:bg-[#1F2933] border-[#2A3C48]"}
            ${!isPlaying && !cell.revealed ? "opacity-75" : ""}
          `}
        >
          {cell.revealed && (
            cell.isMine ? (
              <Bomb className="w-12 h-12 text-white" />
            ) : (
              <Gem className="w-12 h-12 text-white" />
            )
          )}
        </Button>
      ))}
    </div>
  );
}