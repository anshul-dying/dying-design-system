import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

export interface SoundWaveProps extends React.HTMLAttributes<HTMLDivElement> {
  isPlaying?: boolean;
  barCount?: number;
  size?: "sm" | "md" | "lg";
  color?: string;
}

export const SoundWave: React.FC<SoundWaveProps> = ({
  className,
  isPlaying = true,
  barCount = 4,
  size = "md",
  color,
  ...props
}) => {
  const sizeStyles = {
    sm: { container: "h-3 gap-0.5", bar: "w-0.5 rounded-xs" },
    md: { container: "h-4 gap-1", bar: "w-1 rounded-sm" },
    lg: { container: "h-6 gap-1.5", bar: "w-1.5 rounded-md" },
  };

  // Randomized heights for natural organic wave motion
  const barConfigs = [
    { min: 0.25, max: 0.95, duration: 0.65, delay: 0.1 },
    { min: 0.15, max: 1.0, duration: 0.5, delay: 0.25 },
    { min: 0.3, max: 0.8, duration: 0.7, delay: 0 },
    { min: 0.2, max: 0.9, duration: 0.55, delay: 0.15 },
    { min: 0.1, max: 0.85, duration: 0.6, delay: 0.3 },
  ];

  const bars = Array.from({ length: barCount }, (_, index) => {
    const config = barConfigs[index % barConfigs.length];
    return (
      <motion.span
        key={index}
        className={cn("bg-white", sizeStyles[size].bar)}
        style={{
          backgroundColor: color || undefined,
        }}
        initial={{ scaleY: config.min }}
        animate={
          isPlaying
            ? {
                scaleY: [config.min, config.max, config.min],
              }
            : { scaleY: 0.2 }
        }
        transition={
          isPlaying
            ? {
                repeat: Infinity,
                repeatType: "mirror",
                duration: config.duration,
                delay: config.delay,
                ease: "easeInOut",
              }
            : { duration: 0.3 }
        }
      />
    );
  });

  return (
    <div
      className={cn(
        "inline-flex items-end justify-center",
        sizeStyles[size].container,
        className
      )}
      aria-label={isPlaying ? "Playing audio indicator" : "Paused audio indicator"}
      {...props}
    >
      {bars}
    </div>
  );
};

SoundWave.displayName = "SoundWave";
