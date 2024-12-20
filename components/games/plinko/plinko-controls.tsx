"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AutoPlayConfig, RiskLevel } from "./plinko-types";

interface PlinkoControlsProps {
  amount: string;
  setAmount: (value: string) => void;
  risk: RiskLevel;
  setRisk: (value: RiskLevel) => void;
  rows: number;
  setRows: (value: number) => void;
  onPlay: () => void;
  autoPlay: AutoPlayConfig;
  setAutoPlay: (config: AutoPlayConfig) => void;
  startAutoPlay: () => void;
  stopAutoPlay: () => void;
  maxBet: number;
}

export function PlinkoControls({
  amount,
  setAmount,
  risk,
  setRisk,
  rows,
  setRows,
  onPlay,
  autoPlay,
  setAutoPlay,
  startAutoPlay,
  stopAutoPlay,
  maxBet,
}: PlinkoControlsProps) {
  const handleAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    const parts = numericValue.split('.');
    if (parts.length > 2) return;
    if (parts[1]?.length > 2) return;
    if (parseFloat(numericValue) > maxBet) return;
    setAmount(numericValue);
  };

  return (
    <div className="space-y-6 p-6 bg-[#1A2C38] rounded-lg border border-[#2A3C48]">
      <div className="flex gap-1 p-1 bg-[#0F1923] rounded-lg">
        <Button
          variant={!autoPlay.enabled ? "default" : "outline"}
          className="flex-1 rounded-md"
          onClick={() => setAutoPlay({ ...autoPlay, enabled: false })}
        >
          Manual
        </Button>
        <Button
          variant={autoPlay.enabled ? "default" : "outline"}
          className="flex-1 rounded-md"
          onClick={() => setAutoPlay({ ...autoPlay, enabled: true })}
        >
          Auto
        </Button>
      </div>

      <div className="space-y-3">
        <Label className="text-sm text-gray-400">Amount</Label>
        <div className="flex gap-2">
          <div className="flex-1 flex items-center bg-[#0F1923] rounded-lg px-3 py-2 border border-[#2A3C48]">
            <span className="text-yellow-500 mr-1">$</span>
            <input
              type="text"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
          <Button 
            variant="outline" 
            className="w-12 border-[#2A3C48] bg-[#0F1923]"
            onClick={() => handleAmountChange((parseFloat(amount) / 2).toFixed(2))}
          >
            ½
          </Button>
          <Button 
            variant="outline" 
            className="w-12 border-[#2A3C48] bg-[#0F1923]"
            onClick={() => handleAmountChange((parseFloat(amount) * 2).toFixed(2))}
          >
            2×
          </Button>
        </div>
      </div>

      {autoPlay.enabled && (
        <div className="space-y-3">
          <Label className="text-sm text-gray-400">Number of Balls</Label>
          <Input
            type="number"
            min="1"
            max="100"
            value={autoPlay.ballCount}
            onChange={(e) => setAutoPlay({ ...autoPlay, ballCount: parseInt(e.target.value) || 1 })}
            className="bg-[#0F1923] border-[#2A3C48]"
          />
          {autoPlay.ballsRemaining > 0 && (
            <div className="text-sm text-gray-400">
              Balls remaining: {autoPlay.ballsRemaining}
            </div>
          )}
        </div>
      )}

      <div className="space-y-3">
        <Label className="text-sm text-gray-400">Risk</Label>
        <Select value={risk} onValueChange={(value) => setRisk(value as RiskLevel)}>
          <SelectTrigger className="w-full bg-[#0F1923] border-[#2A3C48]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label className="text-sm text-gray-400">Rows</Label>
        <Select value={rows.toString()} onValueChange={(value) => setRows(Number(value))}>
          <SelectTrigger className="w-full bg-[#0F1923] border-[#2A3C48]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="8">8</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="16">16</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        className="w-full h-12 bg-[#00FF00] hover:bg-[#00DD00] text-black font-semibold"
        onClick={autoPlay.enabled ? (autoPlay.interval ? stopAutoPlay : startAutoPlay) : onPlay}
        disabled={parseFloat(amount) <= 0 || parseFloat(amount) > maxBet}
      >
        {autoPlay.enabled 
          ? (autoPlay.interval ? "Stop" : "Start Auto") 
          : "Play"}
      </Button>
    </div>
  );
}