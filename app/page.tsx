"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Coins, Gem, Zap } from "lucide-react";
import { useState } from "react";
import { GameCard } from "@/components/game-card";

export default function Home() {
  const [balance, setBalance] = useState(10000); // Starting with 10,000 fake coins

  const games = [
    {
      title: "Mines",
      description: "Navigate through a minefield to collect gems",
      icon: <Gem className="w-8 h-8" />,
      href: "/games/mines",
    },
    {
      title: "Plinko",
      description: "Watch your ball bounce through pegs",
      icon: <Zap className="w-8 h-8" />,
      href: "/games/plinko",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">FakeBet</h1>
          <div className="flex items-center gap-4">
            <Card className="p-4 bg-primary/10">
              <div className="flex items-center gap-2">
                <Coins className="text-yellow-500" />
                <span className="font-bold">{balance.toLocaleString()} coins</span>
              </div>
            </Card>
            <Button onClick={() => setBalance(prev => prev + 1000)}>
              Get Free Coins
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <GameCard key={game.title} {...game} />
          ))}
        </div>

        <div className="mt-12 p-6 bg-card rounded-lg">
          <h2 className="text-2xl font-bold mb-4">⚠️ Disclaimer</h2>
          <p className="text-muted-foreground">
            This is a simulation website using virtual currency for entertainment purposes only.
            No real money is involved. Gambling can be addictive and dangerous with real money.
            If you or someone you know has a gambling problem, please seek help.
          </p>
        </div>
      </div>
    </main>
  );
}