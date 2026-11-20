import React, { useState } from "react";
import { Play, Pause, ListPlus, MoreVertical, Music2 } from "lucide-react";
import { TrackData } from "../music/TrackRow";
import { SoundWave } from "../effects/SoundWave";
import { cn } from "../utils/cn";

export interface QuickPickRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onPlay" | "onSelect"> {
  track: TrackData;
  isPlaying?: boolean;
  isActive?: boolean;
  onPlay?: (track: TrackData) => void;
  onPause?: () => void;
  onQueue?: (track: TrackData) => void;
  onSelect?: (track: TrackData) => void;
  onActionClick?: (track: TrackData, e: React.MouseEvent) => void;
  onArtistClick?: (artist: string, artistId?: string, e?: React.MouseEvent) => void;
  onAlbumClick?: (album: string, albumId?: string, e?: React.MouseEvent) => void;
  className?: string;
}

export const QuickPickRow = React.forwardRef<HTMLDivElement, QuickPickRowProps>(
  (
    {
      track,
      isPlaying = false,
      isActive = false,
      onPlay,
      onPause,
      onQueue,
      onSelect,
      onActionClick,
      onArtistClick,
      onAlbumClick,
      className,
      tabIndex,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    const thumbnail = track.thumbnailUrl || track.thumbnail;

    const handleRowClick = () => {
      onSelect?.(track);
    };

    const handlePlayPauseClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isActive && isPlaying) {
        onPause?.();
      } else {
        onPlay?.(track);
      }
    };

    const handleQueueClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onQueue?.(track);
    };

    const handleActionClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onActionClick?.(track, e);
    };

    return (
      <div
        ref={ref}
        role="row"
        tabIndex={tabIndex ?? 0}
        onClick={handleRowClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleRowClick();
          }
        }}
        className={cn(
          "group relative flex items-center justify-between w-full h-[56px] px-2.5 py-1.5 rounded-xl transition-all duration-150 cursor-pointer select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-1 focus-visible:ring-offset-canvas",
          isActive
            ? "bg-surface-active/90 text-text-primary"
            : "hover:bg-surface-hover/70 text-text-primary",
          className
        )}
        {...props}
      >
        {/* Left: 44px Thumbnail & Title/Artist */}
        <div className="flex items-center min-w-0 flex-1 mr-3">
          {/* 44px Thumbnail with Hover Play Button */}
          <div className="relative h-[44px] w-[44px] shrink-0 rounded-lg overflow-hidden bg-surface border border-border-subtle mr-3">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={track.title}
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white/[0.04] text-text-tertiary">
                <Music2 size={20} className="stroke-1" />
              </div>
            )}

            {/* Play/Pause Overlay on 44px Thumbnail */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center bg-black/60 transition-opacity duration-150",
                isActive || isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              )}
            >
              {isActive && isPlaying ? (
                isHovered ? (
                  <button
                    type="button"
                    onClick={handlePlayPauseClick}
                    aria-label={`Pause ${track.title}`}
                    className="flex items-center justify-center h-full w-full text-white cursor-pointer focus-visible:outline-none"
                  >
                    <Pause size={18} className="fill-white" />
                  </button>
                ) : (
                  <SoundWave isPlaying={true} size="sm" color="#ffffff" />
                )
              ) : (
                <button
                  type="button"
                  onClick={handlePlayPauseClick}
                  aria-label={`Play ${track.title}`}
                  className="flex items-center justify-center h-full w-full text-white cursor-pointer focus-visible:outline-none"
                >
                  <Play size={18} className="fill-white ml-0.5" />
                </button>
              )}
            </div>
          </div>

          {/* Title and Artist */}
          <div className="flex flex-col min-w-0 justify-center">
            <span className="text-sm font-medium text-text-primary truncate leading-tight group-hover:text-white transition-colors">
              {track.title}
            </span>
            <span className="text-xs text-text-secondary truncate mt-1 leading-tight group-hover:text-text-primary/80 transition-colors">
              {onArtistClick ? (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onArtistClick(track.artist, track.artistId, e);
                  }}
                  className="hover:text-white hover:underline cursor-pointer"
                >
                  {track.artist}
                </span>
              ) : (
                track.artist
              )}
              {track.album && (
                <>
                  {" • "}
                  {onAlbumClick ? (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        onAlbumClick(track.album!, track.albumId, e);
                      }}
                      className="hover:text-white hover:underline cursor-pointer"
                    >
                      {track.album}
                    </span>
                  ) : (
                    track.album
                  )}
                </>
              )}
            </span>
          </div>
        </div>

        {/* Right: Add to Queue & More Options Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          {onQueue && (
            <button
              type="button"
              aria-label={`Add ${track.title} to queue`}
              onClick={handleQueueClick}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-all cursor-pointer",
                "hover:text-white hover:bg-white/[0.1] active:scale-95",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
                "opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
              )}
            >
              <ListPlus size={18} />
            </button>
          )}

          <button
            type="button"
            aria-label={`More options for ${track.title}`}
            onClick={handleActionClick}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-all cursor-pointer",
              "hover:text-white hover:bg-white/[0.1] active:scale-95",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
              "opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
            )}
          >
            <MoreVertical size={18} />
          </button>
        </div>
      </div>
    );
  }
);

QuickPickRow.displayName = "QuickPickRow";
