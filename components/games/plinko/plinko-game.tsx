"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Circle, Home } from "lucide-react";
import Link from "next/link";

const ROWS = 16;
const COLS = 17;
const MULTIPLIERS = [110, 41, 10, 5, 3, 1.5, 1, 0.5, 0.3, 0.5, 1, 1.5, 3, 5, 10, 41, 110];

export function PlinkoGame() {
  const [positions, setPositions] = useState<number[]>([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [isDropping, setIsDropping] = useState(false);
  const [bet, setBet] = useState(100);
  const [finalMultiplier, setFinalMultiplier] = useState(0);

  const dropBall = () => {
    if (isDropping) return;
    
    setIsDropping(true);
    setCurrentRow(0);
    setPositions([Math.floor(COLS / 2)]);
    
    let currentPos = Math.floor(COLS / 2);
    const newPositions = [currentPos];
    
    const interval = setInterval(() => {
      if (newPositions.length < ROWS) {
        currentPos += Math.random() < 0.5 ? -1 : 1;
        newPositions.push(currentPos);
        setPositions([...newPositions]);
        setCurrentRow(newPositions.length);
      } else {
        clearInterval(interval);
        setIsDropping(false);
        setFinalMultiplier(MULTIPLIERS[currentPos]);
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-[#0F1923] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Plinko</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          <Card className="bg-[#1A2C38] border-[#2A3C48] p-6">
            <div className="relative aspect-square">
              {/* Pegs */}
              {Array.from({ length: ROWS }).map((_, row) => (
                <div
                  key={row}
                  className="absolute w-full flex justify-center"
                  style={{
                    top: `${(row + 1) * (100 / (ROWS + 1))}%`,
                  }}
                >
                  {Array.from({ length: row + 2 }).map((_, col) => (
                    <div
                      key={col}
                      className="w-2 h-2 bg-white rounded-full mx-2"
                    />
                  ))}
                </div>
              ))}

              {/* Ball */}
              {positions.length > 0 && (
                <div
                  className="absolute w-4 h-4 transition-all duration-200"
                  style={{
                    left: `${(positions[currentRow] * 100) / COLS}%`,
                    top: `${(currentRow * 100) / ROWS}%`,
                  }}
                >
                  <Circle className="w-full h-full fill-[#00FF00]" />
                </div>
              )}

              {/* Multipliers */}
              <div className="absolute bottom-0 w-full flex justify-between px-4">
                {MULTIPLIERS.map((m, i) => (
                  <div
                    key={i}
                    className={`text-sm px-2 py-1 rounded ${
                      !isDropping && positions[positions.length - 1] === i
                        ? "bg-[#00FF00] text-black"
                        : "bg-[#2A3C48]"
                    }`}
                  >
                    {m}x
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="bg-[#1A2C38] border-[#2A3C48] p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Bet Amount</label>
                  <input
                    type="number"
                    value={bet}
                    onChange={(e) => setBet(Number(e.target.value))}
                    className="w-full bg-[#0F1923] border border-[#2A3C48] rounded p-2 mt-1"
                  />
                </div>

                <Button
                  onClick={dropBall}
                  disabled={isDropping}
                  className="w-full h-12 bg-[#00FF00] text-black hover:bg-[#00DD00]"
                >
                  {isDropping ? "Dropping..." : "Drop Ball"}
                </Button>
              </div>
            </Card>

            <Card className="bg-[#1A2C38] border-[#2A3C48] p-6">
              <div className="text-sm text-gray-400">Potential Win</div>
              <div className="text-2xl font-bold">
                {((bet || 0) * (finalMultiplier || 0)).toFixed(2)}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}