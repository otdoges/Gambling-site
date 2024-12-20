"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home } from 'lucide-react';
import Link from "next/link";
import { PlinkoControls } from "@/components/games/plinko/plinko-controls";
import { PlinkoGameBoard } from "@/components/games/plinko/plinko-board";
import { EarningsDisplay } from "@/components/games/plinko/earnings-display";
import { AutoPlayConfig, RiskLevel, GameState } from "@/components/games/plinko/plinko-types";
import { useCoins } from "@/hooks/use-coins";

const INITIAL_STATE: GameState = {
  amount: "0.00",
  risk: "medium" as RiskLevel,
  rows: 16,
  ballsDropped: 0,
  totalWinnings: 0,
  currentMultiplier: null,
  lastWinAmount: 0,
};

export default function PlinkoGame() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [autoPlay, setAutoPlay] = useState<AutoPlayConfig>({
    enabled: false,
    ballCount: 10,
    ballsRemaining: 0,
    interval: null,
  });

  const { coins, updateCoins } = useCoins();

  const handleMultiplierHit = (multiplier: number) => {
    const bet = parseFloat(gameState.amount);
    const winnings = bet * multiplier;
    const profit = winnings - bet;

    updateCoins(profit);

    setGameState(prev => ({
      ...prev,
      currentMultiplier: multiplier,
      lastWinAmount: winnings,
      totalWinnings: prev.totalWinnings + profit,
      ballsDropped: prev.ballsDropped + 1,
    }));

    if (autoPlay.enabled) {
      setAutoPlay(prev => ({
        ...prev,
        ballsRemaining: prev.ballsRemaining - 1,
      }));
    }
  };

  const handlePlay = () => {
    const bet = parseFloat(gameState.amount);
    if (bet > coins) return;
    updateCoins(-bet);
  };

  const startAutoPlay = () => {
    const totalBet = parseFloat(gameState.amount) * autoPlay.ballCount;
    if (totalBet > coins) return;
    
    updateCoins(-totalBet);
    setAutoPlay(prev => ({
      ...prev,
      ballsRemaining: prev.ballCount,
    }));
  };

  const stopAutoPlay = () => {
    setAutoPlay(prev => ({ ...prev, ballsRemaining: 0 }));
  };

  return (
    <div className="min-h-screen bg-[#0F1923] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="outline" className="gap-2 border-[#2A3C48] bg-[#1A2C38]">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <div className="text-2xl font-bold text-yellow-500">
            {coins.toLocaleString()} coins
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <PlinkoControls
            amount={gameState.amount}
            setAmount={(amount) => setGameState(prev => ({ ...prev, amount }))}
            risk={gameState.risk}
            setRisk={(risk) => setGameState(prev => ({ ...prev, risk }))}
            rows={gameState.rows}
            setRows={(rows) => setGameState(prev => ({ ...prev, rows }))}
            onPlay={handlePlay}
            autoPlay={autoPlay}
            setAutoPlay={setAutoPlay}
            startAutoPlay={startAutoPlay}
            stopAutoPlay={stopAutoPlay}
            maxBet={coins}
          />

          <div className="space-y-4">
            <div className="bg-[#1A2C38] border-[#2A3C48] rounded-lg p-6 border">
              <PlinkoGameBoard 
                onMultiplierHit={handleMultiplierHit}
                currentMultiplier={gameState.currentMultiplier}
                autoPlay={autoPlay.enabled && autoPlay.ballsRemaining > 0}
                ballCount={autoPlay.ballCount}
              />
            </div>

            <EarningsDisplay
              currentMultiplier={gameState.currentMultiplier}
              lastWinAmount={gameState.lastWinAmount}
              totalWinnings={gameState.totalWinnings}
              ballsDropped={gameState.ballsDropped}
            />
          </div>
        </div>
      </div>
    </div>
  );
}