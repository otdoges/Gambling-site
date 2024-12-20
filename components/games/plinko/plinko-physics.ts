"use client";

import Matter from 'matter-js';
import { ROWS, COLS, MULTIPLIERS, getMultiplierColor } from './plinko-constants';

export const setupPlinkoPhysics = (
  container: HTMLDivElement,
  onMultiplierHit: (multiplier: number) => void
) => {
  const engine = Matter.Engine.create({
    gravity: { x: 0, y: 2 }, // Increased gravity
    constraintIterations: 3
  });

  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  
  const render = Matter.Render.create({
    element: container,
    engine: engine,
    options: {
      width: containerWidth,
      height: containerHeight,
      wireframes: false,
      background: '#0F1923',
      pixelRatio: window.devicePixelRatio
    }
  });

  // Add walls
  const wallThickness = 20;
  const walls = [
    Matter.Bodies.rectangle(-wallThickness/2, containerHeight/2, wallThickness, containerHeight, { 
      isStatic: true,
      render: { visible: false }
    }),
    Matter.Bodies.rectangle(containerWidth + wallThickness/2, containerHeight/2, wallThickness, containerHeight, { 
      isStatic: true,
      render: { visible: false }
    })
  ];
  Matter.World.add(engine.world, walls);

  // Add pegs
  const pegRadius = 3;
  const pegRows = 11;
  const pegsPerRow = 15;
  const horizontalSpacing = containerWidth / (pegsPerRow + 1);
  const verticalSpacing = (containerHeight * 0.7) / (pegRows + 1);
  const startY = containerHeight * 0.15;

  for (let row = 0; row < pegRows; row++) {
    const offsetX = row % 2 === 0 ? 0 : horizontalSpacing / 2;
    const pegsInThisRow = row % 2 === 0 ? pegsPerRow : pegsPerRow - 1;
    
    for (let col = 0; col < pegsInThisRow; col++) {
      const peg = Matter.Bodies.circle(
        offsetX + horizontalSpacing * (col + 1),
        startY + verticalSpacing * (row + 1),
        pegRadius,
        {
          isStatic: true,
          render: {
            fillStyle: '#FFFFFF',
            shadowColor: '#FFFFFF',
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0
          },
          friction: 0.5,
          restitution: 0.3
        }
      );
      Matter.World.add(engine.world, peg);
    }
  }

  // Add multiplier zones
  const zoneHeight = containerHeight * 0.15;
  const zoneWidth = containerWidth / MULTIPLIERS.length;
  
  MULTIPLIERS.forEach((multiplier, index) => {
    const zone = Matter.Bodies.rectangle(
      zoneWidth * (index + 0.5),
      containerHeight - zoneHeight/2,
      zoneWidth * 0.95,
      zoneHeight,
      {
        isStatic: true,
        isSensor: true,
        render: {
          fillStyle: getMultiplierColor(multiplier)
        },
        label: `multiplier-${multiplier}`
      }
    );
    Matter.World.add(engine.world, zone);
  });

  Matter.Events.on(engine, 'collisionStart', (event) => {
    event.pairs.forEach((pair) => {
      const bodyA = pair.bodyA;
      const bodyB = pair.bodyB;
      
      if (bodyA.label.startsWith('multiplier-') && !bodyB.isStatic) {
        const multiplier = parseFloat(bodyA.label.split('-')[1]);
        onMultiplierHit(multiplier);
        
        setTimeout(() => {
          Matter.World.remove(engine.world, bodyB);
        }, 100);
      }
    });
  });

  const runner = Matter.Runner.create();
  Matter.Runner.run(runner, engine);
  Matter.Render.run(render);

  return {
    engine,
    render,
    dropBall: () => {
      const ball = Matter.Bodies.circle(
        containerWidth / 2,
        10,
        6,
        {
          restitution: 0.5,
          friction: 0.001,
          density: 0.002,
          render: {
            fillStyle: '#00FF00',
            shadowColor: '#00FF00',
            shadowBlur: 8,
            shadowOffsetX: 0,
            shadowOffsetY: 0
          }
        }
      );
      Matter.World.add(engine.world, ball);
    },
    cleanup: () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      if (render.canvas) {
        render.canvas.remove();
      }
    }
  };
};