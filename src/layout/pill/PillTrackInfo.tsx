import React from "react";
import { Maximize2, Music2, Heart } from "lucide-react";
import { SpringButton } from "../../primitives/SpringButton";
import { cn } from "../../utils/cn";

export interface PillTrackInfoProps {
  title?: string;
  artist?: string;
  artworkUrl?: string;
  hasTrack?: boolean;
  isLiked?: boolean;
  onExpandNowPlaying?: () => void;
  onArtistClick?: () => void;
  onToggleLike?: () => void;
}

export const PillTrackInfo: React.FC<PillTrackInfoProps> = ({
  title = "Not Playing",
  artist = "Apple Music Radio",
  artworkUrl,
  hasTrack,
  isLiked = false,
  onExpandNowPlaying,
  onArtistClick,
  onToggleLike,
}) => {
  const isActuallyTrack = hasTrack ?? (Boolean(title) && title !== "Not Playing");

  return (
    <div className="flex items-center gap-2.5 min-w-0 flex-1 max-w-[200px] sm:max-w-[240px]">
      {isActuallyTrack ? (
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
              onClick={onArtistClick}
              className={cn(
                "truncate text-[11px] sm:text-xs text-text-secondary",
                onArtistClick && "hover:underline hover:text-white cursor-pointer"
              )}
              title={artist}
            >
              {artist}
            </span>
          </div>

          {onToggleLike && (
            <SpringButton
              variant="ghost"
              size="xs"
              onClick={(e) => {
                e.stopPropagation();
                onToggleLike();
              }}
              aria-label={isLiked ? "Unlike" : "Like"}
              className={cn(
                "shrink-0 ml-1 transition-colors",
                isLiked
                  ? "text-emerald-400"
                  : "text-text-tertiary hover:text-text-primary"
              )}
            >
              <Heart size={16} className={isLiked ? "fill-emerald-400" : ""} />
            </SpringButton>
          )}
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
  );
};

PillTrackInfo.displayName = "PillTrackInfo";
