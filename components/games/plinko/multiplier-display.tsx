"use client";

import { MULTIPLIERS, getMultiplierColor } from './plinko-constants';

interface MultiplierDisplayProps {
  currentMultiplier: number | null;
}

export function MultiplierDisplay({ currentMultiplier }: MultiplierDisplayProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 py-1">
      {MULTIPLIERS.map((multiplier, index) => (
        <div
          key={index}
          className={`
            text-sm px-2 py-1 rounded font-bold transition-all duration-200
            ${currentMultiplier === multiplier ? 'scale-110 -translate-y-1' : ''}
          `}
          style={{
            background: getMultiplierColor(multiplier),
            color: multiplier >= 10 ? 'white' : 'black'
          }}
        >
          {multiplier}x
        </div>
      ))}
    </div>
  );
}