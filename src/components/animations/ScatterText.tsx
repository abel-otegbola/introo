'use client';

import React, { useMemo, useState, useEffect, useEffectEvent } from 'react';

interface ScatterTextProps {
  text: string;
  fontSize?: number;
  color?: string;
  fontWeight?: string;
  duration?: number;
  staggerDelay?: number;
  width?: number;
  height?: number;
}

export const ScatterText: React.FC<ScatterTextProps> = ({
  text,
  fontSize = 48,
  color = '#8263F4',
  fontWeight = 'bold',
  duration = 0.8,
  staggerDelay = 0.03,
  width = 600,
  height = 120,
}) => {
  const letters = useMemo(() => text.split(''), [text]);
  const [scatterData, setScatterData] = useState<Array<{ x: number; y: number; rotation: number; scale: number }>>([]);

  const handleScatterData = useEffectEvent(() => {
    setScatterData(
      letters.map(() => ({
        x: (Math.random() - 0.5) * 600,
        y: (Math.random() - 0.5) * 400,
        rotation: (Math.random() - 0.5) * 1080,
        scale: Math.random() * 0.3,
      }))
    );
  });
  // Generate random scatter values for each letter
  useEffect(() => {
    handleScatterData();
  }, [letters]);

  const letterWidth = fontSize * 0.6;
  const textWidth = letters.length * letterWidth;
  const startX = (width - textWidth) / 2;
  const centerY = height / 2 + fontSize / 3;

  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
      <defs>
        {/* Gradient for text */}
        <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.8 }} />
        </linearGradient>
        
        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {letters.map((letter, index) => {
        const letterX = startX + index * letterWidth;
        const scatter = scatterData[index];
        const delay = index * staggerDelay;
        
        return (
          <g key={index}>
            <text
              x={letterX}
              y={centerY}
              fontSize={fontSize}
              fontWeight={fontWeight}
              fill="url(#textGrad)"
              filter="url(#glow)"
              fontFamily="Arial, sans-serif"
              textAnchor="start"
              style={{
                animation: `scatter-${index} ${duration}s ${delay}s forwards`,
                opacity: 0,
                transform: `translate(${scatter.x}px, ${scatter.y}px) rotate(${scatter.rotation}deg) scale(${scatter.scale})`,
                transformOrigin: `${letterX}px ${centerY}px`,
              }}
            >
              {letter}
            </text>
            <style>
              {`
                @keyframes scatter-${index} {
                  0% {
                    opacity: 0;
                    transform: translate(${scatter.x}px, ${scatter.y}px) rotate(${scatter.rotation}deg) scale(${scatter.scale});
                  }
                  100% {
                    opacity: 1;
                    transform: translate(0, 0) rotate(0deg) scale(1);
                  }
                }
              `}
            </style>
          </g>
        );
      })}
    </svg>
  );
};

export default ScatterText;
