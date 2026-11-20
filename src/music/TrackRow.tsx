import React, { useState } from "react";
import { Play, Pause, Heart, MoreHorizontal } from "lucide-react";
import { SoundWave } from "../effects/SoundWave";
import { cn } from "../utils/cn";

export interface TrackData {
  id: string;
  title: string;
  artist: string;
  artistId?: string;
  album?: string;
  albumId?: string;
  duration?: number; // in seconds
  thumbnailUrl?: string;
  thumbnail?: string; // for compatibility with @mp/player-core Track
  videoId?: string;
  isLiked?: boolean;
}

export interface TrackRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onPlay" | "onSelect"> {
  track: TrackData;
  index?: number;
  isActive?: boolean;
  isPlaying?: boolean;
  onSelect?: (track: TrackData) => void;
  onPlay?: (track: TrackData) => void;
  onPause?: () => void;
  onLikeToggle?: (track: TrackData, liked: boolean) => void;
  onActionClick?: (track: TrackData, event: React.MouseEvent) => void;
  onArtistClick?: (artist: string, artistId?: string, e?: React.MouseEvent) => void;
  onAlbumClick?: (album: string, albumId?: string, e?: React.MouseEvent) => void;
  showThumbnail?: boolean;
  showAlbum?: boolean;
  compact?: boolean;
}

function formatDuration(seconds: number = 0): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export const TrackRow = React.forwardRef<HTMLDivElement, TrackRowProps>(
  (
    {
      className,
      track,
      index,
      isActive = false,
      isPlaying = false,
      onSelect,
      onPlay,
      onPause,
      onLikeToggle,
      onActionClick,
      onArtistClick,
      onAlbumClick,
      showThumbnail = true,
      showAlbum = true,
      compact = false,
      tabIndex,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [liked, setLiked] = useState(track.isLiked || false);

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

    const handleLikeClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      const nextLiked = !liked;
      setLiked(nextLiked);
      onLikeToggle?.(track, nextLiked);
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
          "group relative flex items-center w-full px-3 py-2 rounded-xl text-sm transition-all duration-150 cursor-pointer select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-1 focus-visible:ring-offset-canvas",
          compact ? "h-12 py-1" : "h-14 py-2",
          isActive
            ? "bg-surface-active/80 text-text-primary"
            : "hover:bg-surface-hover/70 text-text-primary",
          className
        )}
        {...props}
      >
        {/* Left: Index / Play-Pause Button / SoundWave Indicator */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center mr-3">
          {isActive ? (
            isPlaying ? (
              isHovered ? (
                <button
                  type="button"
                  onClick={handlePlayPauseClick}
                  aria-label="Pause"
                  className="text-white hover:scale-110 active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-full p-1"
                >
                  <Pause size={16} className="fill-current" />
                </button>
              ) : (
                <SoundWave isPlaying={true} size="sm" color="#ffffff" />
              )
            ) : isHovered ? (
              <button
                type="button"
                onClick={handlePlayPauseClick}
                aria-label="Play"
                className="text-white hover:scale-110 active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-full p-1"
              >
                <Play size={16} className="fill-current" />
              </button>
            ) : (
              <SoundWave isPlaying={false} size="sm" color="var(--text-secondary)" />
            )
          ) : isHovered ? (
            <button
              type="button"
              onClick={handlePlayPauseClick}
              aria-label="Play"
              className="text-white hover:scale-110 active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-full p-1"
            >
              <Play size={16} className="fill-current" />
            </button>
          ) : (
            <span className="font-mono text-xs text-text-tertiary group-hover:hidden">
              {index !== undefined ? index + 1 : ""}
            </span>
          )}
        </div>

        {/* Artwork Thumbnail */}
        {showThumbnail && (
          <div className="relative mr-3 h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-surface border border-border-subtle">
            {track.thumbnailUrl || track.thumbnail ? (
              <img
                src={track.thumbnailUrl || track.thumbnail}
                alt={track.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white/[0.04] text-[10px] text-text-tertiary">
                ♪
              </div>
            )}
          </div>
        )}

        {/* Title & Artist */}
        <div className="flex min-w-0 flex-1 flex-col justify-center pr-4">
          <span
            className={cn(
              "truncate font-medium leading-snug",
              isActive ? "text-white font-semibold" : "text-text-primary"
            )}
          >
            {track.title}
          </span>
          {onArtistClick ? (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onArtistClick(track.artist, track.artistId, e);
              }}
              className="truncate text-xs text-text-secondary hover:text-white hover:underline cursor-pointer"
            >
              {track.artist}
            </span>
          ) : (
            <span className="truncate text-xs text-text-secondary">
              {track.artist}
            </span>
          )}
        </div>

        {/* Album (Desktop) */}
        {showAlbum && (
          <div className="hidden md:flex min-w-0 flex-1 items-center pr-4">
            {onAlbumClick && track.album && track.album !== "—" ? (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onAlbumClick(track.album!, track.albumId, e);
                }}
                className="truncate text-xs text-text-tertiary group-hover:text-text-secondary hover:text-white hover:underline cursor-pointer"
              >
                {track.album}
              </span>
            ) : (
              <span className="truncate text-xs text-text-tertiary group-hover:text-text-secondary">
                {track.album || "—"}
              </span>
            )}
          </div>
        )}

        {/* Right Actions: Like, Duration, Action Menu */}
        <div className="flex shrink-0 items-center justify-end gap-2">
          {/* Like Button */}
          <button
            type="button"
            onClick={handleLikeClick}
            aria-label={liked ? "Unlike" : "Like"}
            className={cn(
              "p-1.5 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
              liked
                ? "text-status-error opacity-100 hover:scale-110"
                : "text-text-tertiary opacity-0 group-hover:opacity-100 hover:text-white hover:scale-110"
            )}
          >
            <Heart size={16} className={liked ? "fill-current" : ""} />
          </button>

          {/* Duration */}
          <span className="w-12 text-right font-mono text-xs tabular-nums text-text-tertiary group-hover:text-text-secondary">
            {formatDuration(track.duration)}
          </span>

          {/* Action Menu Button */}
          {onActionClick && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onActionClick(track, e);
              }}
              aria-label="Track actions"
              className="opacity-0 group-hover:opacity-100 p-1.5 text-text-tertiary hover:text-white rounded-lg hover:bg-white/[0.08] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              <MoreHorizontal size={16} />
            </button>
          )}
        </div>
      </div>
    );
  }
);

TrackRow.displayName = "TrackRow";
