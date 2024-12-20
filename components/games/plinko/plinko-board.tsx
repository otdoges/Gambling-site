"use client";

import { useRef, useEffect } from 'react';
import { setupPlinkoPhysics } from './plinko-physics';
import { MultiplierDisplay } from './multiplier-display';

interface PlinkoGameBoardProps {
  onMultiplierHit: (multiplier: number) => void;
  currentMultiplier: number | null;
  autoPlay: boolean;
  ballCount: number;
}

export function PlinkoGameBoard({ 
  onMultiplierHit, 
  currentMultiplier,
  autoPlay,
  ballCount
}: PlinkoGameBoardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const physicsRef = useRef<ReturnType<typeof setupPlinkoPhysics>>();
  const ballsDroppedRef = useRef(0);
  const dropIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (physicsRef.current) {
        physicsRef.current.cleanup();
      }
      if (containerRef.current) {
        physicsRef.current = setupPlinkoPhysics(containerRef.current, handleMultiplierHit);
      }
    });

    resizeObserver.observe(containerRef.current);
    physicsRef.current = setupPlinkoPhysics(containerRef.current, handleMultiplierHit);

    return () => {
      resizeObserver.disconnect();
      if (physicsRef.current) {
        physicsRef.current.cleanup();
      }
      if (dropIntervalRef.current) {
        clearInterval(dropIntervalRef.current);
      }
    };
  }, []);

  const handleMultiplierHit = (multiplier: number) => {
    onMultiplierHit(multiplier);
    ballsDroppedRef.current++;

    if (autoPlay && ballsDroppedRef.current >= ballCount && dropIntervalRef.current) {
      clearInterval(dropIntervalRef.current);
      dropIntervalRef.current = null;
      ballsDroppedRef.current = 0;
    }
  };

  useEffect(() => {
    if (autoPlay && ballCount > 0) {
      ballsDroppedRef.current = 0;
      if (dropIntervalRef.current) {
        clearInterval(dropIntervalRef.current);
      }
      dropIntervalRef.current = setInterval(() => {
        if (physicsRef.current && ballsDroppedRef.current < ballCount) {
          physicsRef.current.dropBall();
        }
      }, 2000);
    } else if (!autoPlay && dropIntervalRef.current) {
      clearInterval(dropIntervalRef.current);
      dropIntervalRef.current = null;
    }

    return () => {
      if (dropIntervalRef.current) {
        clearInterval(dropIntervalRef.current);
      }
    };
  }, [autoPlay, ballCount]);

  const handleClick = () => {
    if (!autoPlay && physicsRef.current) {
      physicsRef.current.dropBall();
    }
  };

  return (
    <div className="relative w-full aspect-[4/3] bg-[#0F1923] rounded-lg overflow-hidden">
      <div ref={containerRef} className="absolute inset-0" onClick={handleClick} />
      <MultiplierDisplay currentMultiplier={currentMultiplier} />
    </div>
  );
}