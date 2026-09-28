import React from 'react';

interface MatchRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const MatchRing: React.FC<MatchRingProps> = ({
  score,
  size = 46,
  strokeWidth = 4,
  className = '',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#FDE68A"
          strokeWidth={strokeWidth}
          fill="transparent"
          opacity="0.4"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F59E0B"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <span className="absolute text-[11px] font-bold text-amber-900 tabular-nums">
        {score}%
      </span>
    </div>
  );
};
