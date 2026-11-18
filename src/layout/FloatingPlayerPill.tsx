import React from "react";
import {
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
  Volume1,
  Maximize2,
  Mic2,
  Music2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { ScrubSlider } from "../primitives/ScrubSlider";
import { SpringButton } from "../primitives/SpringButton";
import { cn } from "../utils/cn";

export interface FloatingPlayerPillProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onVolumeChange"> {
  title?: string;
  artist?: string;
  album?: string;
  artworkUrl?: string;
  isPlaying?: boolean;
  currentTime?: number; // seconds
  duration?: number; // seconds
  buffered?: number; // 0 to 100 percentage
  volume?: number; // 0 to 1
  isMuted?: boolean;
  isShuffle?: boolean;
  repeatMode?: "off" | "all" | "one";
  isLyricsOpen?: boolean;
  isExpanded?: boolean;
  onToggleExpand?: () => void;

  onPlayPause?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  onSeek?: (seconds: number) => void;
  onVolumeChange?: (vol: number) => void;
  onToggleMute?: () => void;
  onToggleShuffle?: () => void;
  onToggleRepeat?: () => void;
  onToggleLyrics?: () => void;
  onExpandNowPlaying?: () => void;

  trailingSlot?: React.ReactNode;
}

function formatTime(seconds: number = 0): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export const FloatingPlayerPill = React.forwardRef<
  HTMLDivElement,
  FloatingPlayerPillProps
>(
  (
    {
      className,
      title = "Not Playing",
      artist = "Apple Music Radio",
      album,
      artworkUrl,
      isPlaying = false,
      currentTime = 0,
      duration = 0,
      buffered = 0,
      volume = 0.85,
      isMuted = false,
      isShuffle = false,
      repeatMode = "off",
      isLyricsOpen = false,
      isExpanded = false,
      onToggleExpand,
      onPlayPause,
      onPrevious,
      onNext,
      onSeek,
      onVolumeChange,
      onToggleMute,
      onToggleShuffle,
      onToggleRepeat,
      onToggleLyrics,
      onExpandNowPlaying,
      trailingSlot,
      ...props
    },
    ref
  ) => {
    const effectiveVolume = isMuted ? 0 : volume;

    const VolumeIcon =
      effectiveVolume === 0
        ? VolumeX
        : effectiveVolume < 0.5
        ? Volume1
        : Volume2;

    const hasTrack = title && title !== "Not Playing";

    return (
      <div
        ref={ref}
        className={cn(
          "pointer-events-auto relative w-full max-w-2xl sm:max-w-3xl",
          "rounded-2xl border border-border-subtle bg-glass-frosted p-2.5 sm:p-3",
          "shadow-2xl shadow-black/80 backdrop-blur-2xl backdrop-saturate-150",
          "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/[0.18] before:to-transparent",
          "transition-all duration-300 select-none",
          className
        )}
        {...props}
      >
        {/* Upper row: Track info | Transport Controls | Actions */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Artwork & Metadata */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1 max-w-[200px] sm:max-w-[240px]">
            {hasTrack ? (
              <>
                <div
                  onClick={onExpandNowPlaying}
                  className="group/art relative h-10 w-10 sm:h-12 sm:w-12 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-border-subtle bg-surface shadow-md"
                >
                  {artworkUrl ? (
                    <img
                      src={artworkUrl}
                      alt={title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover/art:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-white/[0.04] text-xs text-text-tertiary">
                      <Music2 size={18} />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover/art:opacity-100">
                    <Maximize2 size={14} className="text-white" />
                  </div>
                </div>

                <div className="flex flex-col min-w-0">
                  <span
                    onClick={onExpandNowPlaying}
                    className="truncate text-xs sm:text-sm font-semibold text-text-primary hover:underline cursor-pointer"
                    title={title}
                  >
                    {title}
                  </span>
                  <span
                    className="truncate text-[11px] sm:text-xs text-text-secondary"
                    title={artist}
                  >
                    {artist}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-surface text-text-tertiary">
                  <Music2 size={18} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="truncate text-xs sm:text-sm font-medium text-text-secondary">
                    {title}
                  </span>
                  <span
                    className="truncate text-[11px] sm:text-xs text-text-tertiary"
                    title={artist}
                  >
                    {artist}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Center: Transport Controls */}
          <div className="flex items-center gap-1 sm:gap-2 justify-center shrink-0">
            {onToggleShuffle && (
              <SpringButton
                variant="ghost"
                size="xs"
                onClick={onToggleShuffle}
                aria-label="Shuffle"
                className={cn(
                  "hidden md:inline-flex text-text-tertiary hover:text-white",
                  isShuffle && "text-white"
                )}
              >
                <Shuffle className="h-3.5 w-3.5" />
              </SpringButton>
            )}

            <SpringButton
              variant="ghost"
              size="xs"
              onClick={onPrevious}
              aria-label="Previous track"
              className="text-text-secondary hover:text-white"
            >
              <SkipBack className="h-4 w-4 fill-current" />
            </SpringButton>

            <SpringButton
              variant="playPause"
              size="sm"
              isPlaying={isPlaying}
              onClick={onPlayPause}
              aria-label={isPlaying ? "Pause" : "Play"}
            />

            <SpringButton
              variant="ghost"
              size="xs"
              onClick={onNext}
              aria-label="Next track"
              className="text-text-secondary hover:text-white"
            >
              <SkipForward className="h-4 w-4 fill-current" />
            </SpringButton>

            {onToggleRepeat && (
              <SpringButton
                variant="ghost"
                size="xs"
                onClick={onToggleRepeat}
                aria-label="Repeat mode"
                className={cn(
                  "hidden md:inline-flex text-text-tertiary hover:text-white",
                  repeatMode !== "off" && "text-white"
                )}
              >
                <Repeat className="h-3.5 w-3.5" />
              </SpringButton>
            )}
          </div>

          {/* Right: Lyrics & Volume Utilities */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-2.5 sm:min-w-[120px] sm:max-w-[210px] shrink-0">
            {trailingSlot ?? (
              <>
                {/* Lyrics toggle */}
                <SpringButton
                  variant="ghost"
                  size="xs"
                  onClick={onToggleLyrics}
                  aria-label="Toggle Lyrics"
                  className={cn(
                    "text-text-secondary hover:text-white transition-colors",
                    isLyricsOpen && "bg-white/10 text-white rounded-lg"
                  )}
                >
                  <Mic2 className="h-4 w-4" />
                </SpringButton>

                {/* Volume slider & mute */}
                <div className="hidden sm:flex items-center gap-1.5 w-20 sm:w-28">
                  <button
                    type="button"
                    onClick={onToggleMute}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    className="text-text-secondary hover:text-white transition-colors p-1 rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-focus"
                  >
                    <VolumeIcon className="h-3.5 w-3.5" />
                  </button>
                  <div className="flex-1">
                    <ScrubSlider
                      size="sm"
                      min={0}
                      max={1}
                      step={0.01}
                      value={effectiveVolume}
                      onValueChange={(val) => onVolumeChange?.(val)}
                      tooltipFormatter={(val) => `${Math.round(val * 100)}%`}
                    />
                  </div>
                </div>

                {/* Expand / Minimize toggle chevron */}
                <SpringButton
                  variant="ghost"
                  size="sm"
                  onClick={onToggleExpand || onExpandNowPlaying}
                  aria-label={isExpanded ? "Minimize player" : "Expand player"}
                  className="text-text-secondary hover:text-white"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronUp className="h-4 w-4" />
                  )}
                </SpringButton>
              </>
            )}
          </div>
        </div>

        {/* Lower row: Embedded Scrub Bar with Timings */}
        <div className="mt-1 flex w-full items-center gap-2.5 text-[10px] font-mono text-text-tertiary">
          <span className="w-8 text-right tabular-nums">
            {formatTime(currentTime)}
          </span>
          <div className="flex-1">
            <ScrubSlider
              size="sm"
              min={0}
              max={duration || 100}
              value={currentTime}
              buffered={buffered}
              onValueCommit={(val) => onSeek?.(val)}
              tooltipFormatter={(val) => formatTime(val)}
            />
          </div>
          <span className="w-8 text-left tabular-nums">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    );
  }
);

FloatingPlayerPill.displayName = "FloatingPlayerPill";
