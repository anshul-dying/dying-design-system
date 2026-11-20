import React from "react";
import { Play } from "lucide-react";
import { cn } from "../utils/cn";

export interface MediaCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onPlay"> {
  title: string;
  subtitle?: string;
  imageUrl: string;
  aspect?: "square" | "portrait" | "video";
  overlayText?: string;
  onPlay?: () => void;
}

export const MediaCard = React.forwardRef<HTMLDivElement, MediaCardProps>(
  (
    {
      className,
      title,
      subtitle,
      imageUrl,
      aspect = "square",
      overlayText,
      onPlay,
      onClick,
      tabIndex,
      ...props
    },
    ref
  ) => {
    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e);
      onPlay?.();
    };

    const handlePlayClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onPlay?.();
    };

    return (
      <div
        ref={ref}
        tabIndex={tabIndex ?? 0}
        onClick={handleCardClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onPlay?.();
          }
        }}
        className={cn(
          "group relative flex flex-col shrink-0 cursor-pointer select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas rounded-xl",
          aspect === "portrait"
            ? "w-36 sm:w-44 md:w-48"
            : aspect === "video"
            ? "w-64 sm:w-72 md:w-80"
            : "w-40 sm:w-48 md:w-52",
          className
        )}
        {...props}
      >
        {/* Artwork Container */}
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-xl md:rounded-2xl bg-surface border border-border-subtle shadow-md transition-all duration-300 group-hover:border-border-muted group-hover:shadow-xl",
            aspect === "portrait"
              ? "aspect-[3/4]"
              : aspect === "video"
              ? "aspect-video"
              : "aspect-square"
          )}
        >
          <img
            src={imageUrl}
            alt={title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Optional Overlay Text / Badge */}
          {overlayText && (
            <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-border-subtle text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              {overlayText}
            </div>
          )}

          {/* Play Button on Hover */}
          {onPlay && (
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-200",
                aspect === "video"
                  ? "flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100"
                  : "flex items-end justify-end p-3 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100"
              )}
            >
              <button
                type="button"
                onClick={handlePlayClick}
                aria-label={`Play ${title}`}
                className={cn(
                  "flex items-center justify-center rounded-full shadow-2xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
                  aspect === "video"
                    ? "h-12 w-12 bg-black/80 hover:bg-black text-white border border-white/20 backdrop-blur-md scale-90 group-hover:scale-100 hover:scale-110 active:scale-95"
                    : "h-10 w-10 sm:h-11 sm:w-11 bg-white text-black scale-90 group-hover:scale-100 hover:scale-110 active:scale-95"
                )}
              >
                <Play size={aspect === "video" ? 20 : 18} className="fill-current" />
              </button>
            </div>
          )}
        </div>

        {/* Text Details */}
        <div className="flex flex-col mt-2.5 px-0.5 min-w-0">
          <span className="truncate text-sm font-semibold text-text-primary tracking-tight group-hover:text-white transition-colors">
            {title}
          </span>
          {subtitle && (
            <span className="truncate text-xs text-text-secondary mt-0.5">
              {subtitle}
            </span>
          )}
        </div>
      </div>
    );
  }
);

MediaCard.displayName = "MediaCard";
