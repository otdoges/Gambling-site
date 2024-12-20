"use client";

import { MinesGrid } from "./mines-grid";
import { MinesControls } from "./mines-controls";
import { Card } from "@/components/ui/card";
import { useMinesGame } from "./mines-context";

export function MinesGame() {
  const { multiplier, bet } = useMinesGame();

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <Card className="bg-[#1A2C38] border-[#2A3C48] p-6">
            <MinesGrid />
          </Card>
        </div>
        
        <div className="w-full lg:w-96 space-y-4">
          <MinesControls />
          
          <Card className="bg-[#1A2C38] border-[#2A3C48] p-4">
            <div className="text-sm text-gray-400">Potential Win</div>
            <div className="text-2xl font-bold">
              {((bet || 0) * multiplier).toFixed(2)}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}