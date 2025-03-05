
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressCircleProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showPercentage?: boolean;
  animate?: boolean;
}

const ProgressCircle = ({
  value,
  size = 120,
  strokeWidth = 6,
  className,
  showPercentage = true,
  animate = true,
}: ProgressCircleProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  
  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="progress-circle-bg"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={cn(
            "progress-circle-fill",
            animate && "animate-progress-fill"
          )}
          strokeDasharray={circumference}
          strokeDashoffset={animate ? circumference : offset}
          style={!animate ? { strokeDashoffset: offset } : {}}
        />
      </svg>
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-semibold">{value}%</span>
        </div>
      )}
    </div>
  );
};

export default ProgressCircle;
