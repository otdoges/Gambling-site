"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMinesGame } from "./mines-context";

export function MinesControls() {
  const {
    bet,
    setBet,
    mines,
    setMines,
    isPlaying,
    setIsPlaying,
    gameOver,
    setGameOver,
  } = useMinesGame();

  const handlePlay = () => {
    if (bet <= 0) return;
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setGameOver(false);
  };

  return (
    <Card className="bg-[#1A2C38] border-[#2A3C48] p-6 space-y-6">
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-400">Mode</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="bg-[#0F1923] border-[#2A3C48] hover:bg-[#1F2933] h-12 text-lg"
          >
            Manual
          </Button>
          <Button
            variant="outline"
            className="bg-[#0F1923] border-[#2A3C48] hover:bg-[#1F2933] h-12 text-lg opacity-50"
            disabled
          >
            Auto
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm text-gray-400">Amount</label>
        <div className="flex gap-3">
          <Input
            type="number"
            value={bet}
            onChange={(e) => setBet(Number(e.target.value))}
            className="bg-[#0F1923] border-[#2A3C48] h-12 text-lg"
          />
          <Button
            variant="outline"
            className="bg-[#0F1923] border-[#2A3C48] hover:bg-[#1F2933] h-12 text-lg"
            onClick={() => setBet(bet * 2)}
          >
            2×
          </Button>
          <Button
            variant="outline"
            className="bg-[#0F1923] border-[#2A3C48] hover:bg-[#1F2933] h-12 text-lg"
            onClick={() => setBet(bet / 2)}
          >
            ½
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm text-gray-400">Mines</label>
        <Select value={mines.toString()} onValueChange={(v) => setMines(Number(v))}>
          <SelectTrigger className="bg-[#0F1923] border-[#2A3C48] h-12 text-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 10, 15, 20].map((n) => (
              <SelectItem key={n} value={n.toString()}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={isPlaying ? handleStop : handlePlay}
        disabled={!bet && !isPlaying}
        className={`
          w-full h-14 text-lg font-bold
          ${isPlaying 
            ? "bg-red-500 hover:bg-red-600 text-white" 
            : "bg-[#00FF00] hover:bg-[#00DD00] text-black"}
        `}
      >
        {isPlaying ? "Cash Out" : "Play"}
      </Button>
    </Card>
  );
}