import React from "react";
import { SkipBack, SkipForward, Shuffle, Repeat } from "lucide-react";
import { SpringButton } from "../../primitives/SpringButton";
import { cn } from "../../utils/cn";

export interface PillPlaybackControlsProps {
  isPlaying?: boolean;
  isShuffle?: boolean;
  repeatMode?: "off" | "all" | "one";
  onToggleShuffle?: () => void;
  onPrevious?: () => void;
  onPlayPause?: () => void;
  onNext?: () => void;
  onToggleRepeat?: () => void;
}

export const PillPlaybackControls: React.FC<PillPlaybackControlsProps> = ({
  isPlaying = false,
  isShuffle = false,
  repeatMode = "off",
  onToggleShuffle,
  onPrevious,
  onPlayPause,
  onNext,
  onToggleRepeat,
}) => {
  return (
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
  );
};

PillPlaybackControls.displayName = "PillPlaybackControls";
