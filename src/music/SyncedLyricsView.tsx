import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";

export interface LyricLine {
  id?: string;
  time: number; // in seconds
  text: string;
}

export interface SyncedLyricsViewProps extends React.HTMLAttributes<HTMLDivElement> {
  lyrics: LyricLine[];
  currentTime: number; // in seconds
  onSeek?: (time: number) => void;
  showTimestamps?: boolean;
  autoScroll?: boolean;
}

export const SyncedLyricsView: React.FC<SyncedLyricsViewProps> = ({
  className,
  lyrics = [],
  currentTime = 0,
  onSeek,
  showTimestamps = false,
  autoScroll = true,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);
  const [userIsScrolling, setUserIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Find index of the currently playing lyric line
  const activeIndex = lyrics.reduce((currActive, line, index) => {
    return line.time <= currentTime ? index : currActive;
  }, -1);

  // Handle user manual scroll interruption
  const handleScroll = () => {
    setUserIsScrolling(true);
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      setUserIsScrolling(false);
    }, 2800);
  };

  // Smooth auto-scroll to center the active line
  useEffect(() => {
    if (!autoScroll || userIsScrolling || activeIndex === -1) return;
    if (activeLineRef.current && containerRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeIndex, autoScroll, userIsScrolling]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const formatLyricTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins}:${s < 10 ? "0" : ""}${s}`;
  };

  if (!lyrics || lyrics.length === 0) {
    return (
      <div
        className={cn(
          "flex h-full min-h-[300px] w-full items-center justify-center text-neutral-500",
          className
        )}
        {...props}
      >
        <p className="text-sm font-medium tracking-wide">No synced lyrics available</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={cn(
        "relative flex h-full w-full flex-col overflow-y-auto px-6 py-32 scrollbar-none select-none scroll-smooth",
        // Top and bottom fade masks
        "mask-[linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-6 py-12 max-w-2xl mx-auto w-full">
        {lyrics.map((line, index) => {
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;

          return (
            <motion.div
              key={line.id || `${line.time}-${index}`}
              ref={isActive ? activeLineRef : null}
              onClick={() => onSeek?.(line.time)}
              layout
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className={cn(
                "group relative cursor-pointer py-2 transition-all duration-300 origin-left",
                isActive
                  ? "scale-105 opacity-100"
                  : isPast
                  ? "opacity-30 hover:opacity-75"
                  : "opacity-35 hover:opacity-80"
              )}
            >
              {showTimestamps && (
                <span className="mr-3 font-mono text-xs text-neutral-500 group-hover:text-neutral-300">
                  {formatLyricTime(line.time)}
                </span>
              )}

              <span
                className={cn(
                  "font-sans text-2xl font-bold tracking-tight md:text-3xl transition-all duration-300 leading-relaxed block",
                  isActive
                    ? "text-white drop-shadow-[0_0_24px_var(--dying-aura-primary,rgba(255,255,255,0.75))] text-glow-neon"
                    : "text-neutral-300 group-hover:text-white"
                )}
                style={
                  isActive
                    ? {
                        textShadow:
                          "0 0 20px var(--dying-aura-primary, rgba(255, 255, 255, 0.6)), 0 0 40px var(--dying-aura-secondary, rgba(255, 255, 255, 0.2))",
                      }
                    : undefined
                }
              >
                {line.text}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

SyncedLyricsView.displayName = "SyncedLyricsView";
