import React from "react";
import { Volume2, VolumeX, Volume1 } from "lucide-react";
import { ScrubSlider } from "../../primitives/ScrubSlider";

export interface PillVolumeControlsProps {
  volume?: number;
  isMuted?: boolean;
  onToggleMute?: () => void;
  onVolumeChange?: (vol: number) => void;
}

export const PillVolumeControls: React.FC<PillVolumeControlsProps> = ({
  volume = 0.85,
  isMuted = false,
  onToggleMute,
  onVolumeChange,
}) => {
  const effectiveVolume = isMuted ? 0 : volume;

  const VolumeIcon =
    effectiveVolume === 0
      ? VolumeX
      : effectiveVolume < 0.5
      ? Volume1
      : Volume2;

  return (
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
  );
};

PillVolumeControls.displayName = "PillVolumeControls";
