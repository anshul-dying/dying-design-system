import React, { useState, useEffect, useMemo } from "react";
import { Dialog as RadixDialog, VisuallyHidden as RadixVisuallyHidden } from "radix-ui";
import {
  ChevronDown,
  Play,
  Radio,
  Music2,
  Trash2,
  Heart,
  Disc,
  ListPlus,
  Video,
  Headphones,
  Check,
} from "lucide-react";
import { TrackData } from "./TrackRow";
import { SyncedLyricsView, LyricLine } from "./SyncedLyricsView";
import { AmbientAura } from "../effects/AmbientAura";
import { SoundWave } from "../effects/SoundWave";
import { Switch } from "../components/Controls";
import { EmptyState } from "../components/Feedback";
import { Button } from "../components/Button";
import { cn } from "../utils/cn";

export type FullPlayerTab = "upNext" | "lyrics" | "related";

export interface RelatedItem {
  id: string;
  title: string;
  subtitle?: string;
  type?: "song" | "album" | "playlist" | "artist";
  thumbnail?: string;
  thumbnailUrl?: string;
  videoId?: string;
  browseId?: string;
}

export interface FullPlayerViewProps {
  track: TrackData | null;
  isPlaying?: boolean;
  currentTime?: number;
  duration?: number;
  onPlayPause?: () => void;
  onSeek?: (time: number) => void;
  onClose: () => void;
  activeTab?: FullPlayerTab;
  onTabChange?: (tab: FullPlayerTab) => void;

  // Queue & Navigation
  queue?: TrackData[];
  onSelectTrack?: (track: TrackData) => void;
  onReorderQueue?: (newQueue: TrackData[]) => void;
  onRemoveFromQueue?: (trackId: string) => void;
  infiniteRadio?: boolean;
  onToggleInfiniteRadio?: (enabled: boolean) => void;
  radioTitle?: string;
  onSaveQueue?: () => void;

  // Playback Controls (delegated to bottom bar, but handlers preserved)
  onPrevious?: () => void;
  onNext?: () => void;
  isShuffle?: boolean;
  onToggleShuffle?: () => void;
  repeatMode?: "off" | "all" | "one";
  onToggleRepeat?: () => void;
  volume?: number;
  onVolumeChange?: (volume: number) => void;
  onLikeToggle?: (track: TrackData, liked: boolean) => void;

  // Audio / Video Switcher
  mediaMode?: "audio" | "video";
  onToggleMediaMode?: (mode: "audio" | "video") => void;

  // Tab-specific Data
  lyrics?: LyricLine[] | string;
  related?: RelatedItem[];
  onSelectRelated?: (item: RelatedItem) => void;

  // Filter Chips for Queue
  activeQueueFilter?: string;
  onQueueFilterChange?: (filter: string) => void;

  // In-page Watch View vs Modal Takeover (defaults to in-page view)
  asModal?: boolean;
  className?: string;
}

function formatDuration(seconds: number = 0): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export const FullPlayerView: React.FC<FullPlayerViewProps> = ({
  track,
  isPlaying = false,
  currentTime = 0,
  duration = 0,
  onPlayPause,
  onSeek,
  onClose,
  activeTab: controlledActiveTab,
  onTabChange,

  queue = [],
  onSelectTrack,
  onRemoveFromQueue,
  infiniteRadio = true,
  onToggleInfiniteRadio,
  radioTitle,
  onSaveQueue,

  onLikeToggle,
  mediaMode = "audio",
  onToggleMediaMode,

  lyrics,
  related = [],
  onSelectRelated,

  activeQueueFilter = "All",
  onQueueFilterChange,

  asModal = false,
  className,
}) => {
  const [internalTab, setInternalTab] = useState<FullPlayerTab>("upNext");
  const [internalFilter, setInternalFilter] = useState<string>("All");
  const [liked, setLiked] = useState(track?.isLiked || false);
  const [savedQueue, setSavedQueue] = useState(false);

  const activeTab = controlledActiveTab ?? internalTab;
  const currentFilter = onQueueFilterChange ? activeQueueFilter : internalFilter;

  const handleTabClick = (tab: FullPlayerTab) => {
    setInternalTab(tab);
    onTabChange?.(tab);
  };

  const handleFilterClick = (filter: string) => {
    if (onQueueFilterChange) {
      onQueueFilterChange(filter);
    } else {
      setInternalFilter(filter);
    }
  };

  useEffect(() => {
    setLiked(track?.isLiked || false);
  }, [track?.id, track?.isLiked]);

  const handleLikeClick = () => {
    if (!track) return;
    const nextLiked = !liked;
    setLiked(nextLiked);
    onLikeToggle?.(track, nextLiked);
  };

  const handleSaveClick = () => {
    setSavedQueue(true);
    onSaveQueue?.();
    setTimeout(() => setSavedQueue(false), 2500);
  };

  const thumbnail = track?.thumbnailUrl || track?.thumbnail;

  // Parse lyrics if passed as string into LyricLine[]
  const parsedLyrics: LyricLine[] = useMemo(() => {
    if (!lyrics) return [];
    if (Array.isArray(lyrics)) return lyrics;
    return lyrics
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((text, idx) => ({
        id: `line-${idx}`,
        time: idx * 5,
        text: text.trim(),
      }));
  }, [lyrics]);

  // Queue filter chips matching YouTube Music
  const filterChips = ["All", "Familiar", "Discover", "Popular", "Deep cuts"];

  const content = (
    <div
      className={cn(
        "relative flex flex-col h-full w-full overflow-hidden select-none bg-canvas text-text-primary",
        className
      )}
    >
      {/* Dynamic Ambient Aura Backdrop Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {thumbnail && (
          <img
            src={thumbnail}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover blur-[160px] scale-150 opacity-15 filter saturate-200"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-canvas/40 via-canvas/80 to-canvas" />
      </div>

      {/* Main 2-Column Split: Left Canvas Artwork | Right Tabs & Queue */}
      <div className="relative z-10 flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 px-6 sm:px-10 lg:px-14 pt-3 pb-28 sm:pb-36 overflow-hidden">
        {/* LEFT COLUMN: Large Square Album Artwork with Ambient Glow + Audio/Video Switcher */}
        <div className="lg:col-span-6 flex flex-col items-center justify-between h-full min-h-0 max-w-xl mx-auto w-full">
          {/* Top Collapse Button & Title */}
          <div className="w-full flex items-center justify-between mb-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              aria-label="Minimize player"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-surface hover:bg-surface-hover text-text-secondary hover:text-white border border-border-subtle transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              <ChevronDown size={16} />
              <span>Minimize</span>
            </button>
            <span className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">
              Now Playing
            </span>
            <div className="w-20" />
          </div>

          {/* Large Square Artwork Container */}
          <div className="relative aspect-square w-64 sm:w-80 md:w-96 lg:w-[420px] xl:w-[460px] shrink-0 flex items-center justify-center">
            {/* Ambient Obsidian Backlight Glow */}
            <div className="absolute inset-0 -m-8 rounded-full pointer-events-none overflow-hidden opacity-20 blur-3xl scale-125">
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover filter saturate-200"
                />
              ) : (
                <AmbientAura intensity={0.15} blur={120} className="w-full h-full" />
              )}
            </div>

            {/* Album Artwork Card */}
            <div className="relative z-10 h-full w-full overflow-hidden rounded-2xl lg:rounded-3xl bg-surface border border-border-subtle shadow-[0_28px_72px_rgba(0,0,0,0.9)] group">
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt={track?.title || "Album Artwork"}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-white/[0.04] text-text-tertiary">
                  <Music2 size={96} className="stroke-1" />
                </div>
              )}

              {/* YouTube Music Audio / Video Switcher Pill (Top Right Overlay) */}
              <div className="absolute top-4 right-4 z-20 flex items-center bg-black/60 backdrop-blur-md rounded-full p-0.5 border border-white/10 shadow-lg">
                <button
                  type="button"
                  onClick={() => onToggleMediaMode?.("audio")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
                    mediaMode === "audio"
                      ? "bg-white text-black shadow-sm font-bold"
                      : "text-text-secondary hover:text-white"
                  )}
                  aria-label="Switch to audio mode"
                >
                  <Headphones size={13} />
                  <span>Song</span>
                </button>
                <button
                  type="button"
                  onClick={() => onToggleMediaMode?.("video")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
                    mediaMode === "video"
                      ? "bg-white text-black shadow-sm font-bold"
                      : "text-text-secondary hover:text-white"
                  )}
                  aria-label="Switch to video mode"
                >
                  <Video size={13} />
                  <span>Video</span>
                </button>
              </div>
            </div>
          </div>

          {/* Under-Artwork Metadata & Like Action */}
          <div className="w-full mt-6 flex items-center justify-between px-2">
            <div className="flex flex-col min-w-0 pr-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary tracking-tight truncate leading-tight">
                {track?.title || "No track selected"}
              </h2>
              <p className="text-sm sm:text-base text-text-secondary truncate mt-1">
                {track?.artist || "Unknown artist"}
                {track?.album ? ` • ${track.album}` : ""}
              </p>
            </div>

            {track && (
              <button
                type="button"
                aria-label={liked ? "Unlike" : "Like"}
                onClick={handleLikeClick}
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
                  liked
                    ? "text-status-error bg-status-error/10 hover:bg-status-error/20"
                    : "text-text-secondary hover:text-white hover:bg-surface-hover"
                )}
              >
                <Heart size={22} className={liked ? "fill-current" : ""} />
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: 3-Tab Panel (UP NEXT | LYRICS | RELATED) */}
        <div className="lg:col-span-6 flex flex-col min-h-0 h-full overflow-hidden bg-surface/30 backdrop-blur-xl border border-border-subtle rounded-2xl p-4 sm:p-5 shadow-2xl">
          {/* YouTube Music Flat Text Tabs Header */}
          <div className="flex items-center border-b border-border-subtle shrink-0 mb-4 px-2">
            <button
              type="button"
              onClick={() => handleTabClick("upNext")}
              className={cn(
                "relative pb-3 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
                activeTab === "upNext"
                  ? "text-white"
                  : "text-text-tertiary hover:text-text-primary"
              )}
            >
              UP NEXT
              {activeTab === "upNext" && (
                <div className="absolute bottom-0 inset-x-2 h-0.5 bg-white rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleTabClick("lyrics")}
              className={cn(
                "relative pb-3 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
                activeTab === "lyrics"
                  ? "text-white"
                  : "text-text-tertiary hover:text-text-primary"
              )}
            >
              LYRICS
              {activeTab === "lyrics" && (
                <div className="absolute bottom-0 inset-x-2 h-0.5 bg-white rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleTabClick("related")}
              className={cn(
                "relative pb-3 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
                activeTab === "related"
                  ? "text-white"
                  : "text-text-tertiary hover:text-text-primary"
              )}
            >
              RELATED
              {activeTab === "related" && (
                <div className="absolute bottom-0 inset-x-2 h-0.5 bg-white rounded-full" />
              )}
            </button>
          </div>

          {/* TAB 1: UP NEXT */}
          {activeTab === "upNext" && (
            <div className="flex flex-col h-full min-h-0">
              {/* Radio Source Subheader & Save Pill */}
              <div className="flex items-center justify-between pb-3 px-2 shrink-0">
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="text-[11px] text-text-tertiary uppercase tracking-wider font-semibold">
                    Playing from
                  </span>
                  <span className="text-sm font-bold text-text-primary truncate">
                    {radioTitle || (track ? `${track.title} mix` : "Radio Queue")}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveClick}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
                      savedQueue
                        ? "bg-status-success/20 text-status-success border-status-success/40"
                        : "bg-surface hover:bg-surface-hover text-text-secondary hover:text-white border-border-subtle"
                    )}
                    aria-label="Save queue to playlist"
                  >
                    {savedQueue ? <Check size={14} /> : <ListPlus size={14} />}
                    <span>{savedQueue ? "Saved" : "Save"}</span>
                  </button>

                  <div className="flex items-center gap-1.5 pl-2 border-l border-border-subtle">
                    <Radio size={13} className={infiniteRadio ? "text-white" : "text-text-tertiary"} />
                    <Switch
                      checked={infiniteRadio}
                      onCheckedChange={onToggleInfiniteRadio}
                      aria-label="Autoplay similar songs"
                    />
                  </div>
                </div>
              </div>

              {/* YouTube Music Queue Mood Filter Chips Carousel */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-2 shrink-0 border-b border-border-subtle mb-3">
                {filterChips.map((chip) => {
                  const isActive = currentFilter === chip;
                  return (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleFilterClick(chip)}
                      className={cn(
                        "px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer select-none shrink-0",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
                        isActive
                          ? "bg-white text-black font-semibold shadow-sm"
                          : "bg-surface hover:bg-surface-hover text-text-secondary hover:text-white border border-border-subtle"
                      )}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>

              {/* Queue Scroll List */}
              <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-0.5 pr-1">
                {/* Current Active Track Row */}
                {track && (
                  <div className="group flex items-center justify-between px-3 py-2.5 rounded-xl bg-surface-active/90 border border-white/10 mb-2 shadow-sm">
                    <div className="flex items-center min-w-0 flex-1 mr-3">
                      <div className="relative h-10 w-10 shrink-0 rounded-lg overflow-hidden bg-surface border border-border-subtle mr-3">
                        {thumbnail ? (
                          <img src={thumbnail} alt={track.title} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-white/[0.04] text-text-tertiary">
                            <Music2 size={16} />
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <SoundWave isPlaying={isPlaying} size="sm" color="#ffffff" />
                        </div>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-white truncate">
                          {track.title}
                        </span>
                        <span className="text-xs text-text-secondary truncate">
                          {track.artist}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-white/70">
                      {formatDuration(track.duration || duration)}
                    </span>
                  </div>
                )}

                {/* Queue Tracks */}
                {queue.length > 0 ? (
                  queue.map((queueTrack, index) => {
                    const qThumb = queueTrack.thumbnailUrl || queueTrack.thumbnail;
                    return (
                      <div
                        key={queueTrack.id || `q-${index}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => onSelectTrack?.(queueTrack)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onSelectTrack?.(queueTrack);
                          }
                        }}
                        className="group flex items-center justify-between px-3 py-2 rounded-xl hover:bg-surface-hover/80 transition-all cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                      >
                        <div className="flex items-center min-w-0 flex-1 mr-3">
                          <span className="font-mono text-xs text-text-tertiary w-6 shrink-0 group-hover:hidden">
                            {index + 1}
                          </span>
                          <div className="hidden group-hover:flex w-6 shrink-0 items-center justify-start text-white">
                            <Play size={14} className="fill-current" />
                          </div>

                          <div className="relative h-9 w-9 shrink-0 rounded-lg overflow-hidden bg-surface border border-border-subtle mr-3">
                            {qThumb ? (
                              <img src={qThumb} alt={queueTrack.title} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-white/[0.04] text-text-tertiary">
                                <Music2 size={14} />
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-medium text-text-primary group-hover:text-white truncate">
                              {queueTrack.title}
                            </span>
                            <span className="text-xs text-text-secondary truncate">
                              {queueTrack.artist}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {onRemoveFromQueue && (
                            <button
                              type="button"
                              aria-label={`Remove ${queueTrack.title} from queue`}
                              onClick={(e) => {
                                e.stopPropagation();
                                onRemoveFromQueue(queueTrack.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 flex h-7 w-7 items-center justify-center rounded-full text-text-secondary hover:text-status-error hover:bg-white/[0.08] transition-all cursor-pointer"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                          <span className="text-xs font-mono text-text-tertiary">
                            {formatDuration(queueTrack.duration)}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 text-center">
                    <EmptyState
                      title="No upcoming tracks"
                      description="Turn on Autoplay to keep the music playing with similar songs."
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: LYRICS */}
          {activeTab === "lyrics" && (
            <div className="flex flex-col h-full min-h-0">
              <div className="pb-3 mb-2 border-b border-border-subtle shrink-0 flex items-center justify-between px-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">
                  Lyrics
                </h3>
                <span className="text-xs text-text-tertiary">Synced Karaoke</span>
              </div>

              <div className="flex-1 min-h-0 overflow-hidden">
                {parsedLyrics.length > 0 ? (
                  <SyncedLyricsView
                    lyrics={parsedLyrics}
                    currentTime={currentTime}
                    onSeek={onSeek}
                    className="h-full"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <EmptyState
                      title="No lyrics available"
                      description="Lyrics aren't available for this track yet."
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: RELATED */}
          {activeTab === "related" && (
            <div className="flex flex-col h-full min-h-0">
              <div className="pb-3 mb-2 border-b border-border-subtle shrink-0 px-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">
                  Related tracks & albums
                </h3>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-2 pr-1">
                {related.length > 0 ? (
                  related.map((item) => {
                    const itemThumb = item.thumbnailUrl || item.thumbnail;
                    return (
                      <div
                        key={item.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => onSelectRelated?.(item)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onSelectRelated?.(item);
                          }
                        }}
                        className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-hover/80 transition-all cursor-pointer select-none border border-transparent hover:border-border-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                      >
                        <div className="flex items-center min-w-0 flex-1 mr-3">
                          <div className="relative h-11 w-11 shrink-0 rounded-lg overflow-hidden bg-surface border border-border-subtle mr-3">
                            {itemThumb ? (
                              <img src={itemThumb} alt={item.title} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-white/[0.04] text-text-tertiary">
                                {item.type === "album" ? <Disc size={20} /> : <Music2 size={20} />}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-medium text-text-primary group-hover:text-white truncate">
                              {item.title}
                            </span>
                            <span className="text-xs text-text-secondary truncate">
                              {item.subtitle || item.type || "Track"}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          aria-label={`Play ${item.title}`}
                          className="opacity-0 group-hover:opacity-100 flex h-8 w-8 items-center justify-center rounded-full text-white bg-white/[0.1] hover:bg-white/[0.2] transition-all cursor-pointer"
                        >
                          <Play size={14} className="fill-current ml-0.5" />
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 text-center">
                    <EmptyState
                      title="No related recommendations"
                      description="Recommendations will appear as more tracks are explored."
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (asModal) {
    return (
      <RadixDialog.Root open={true} onOpenChange={(open) => !open && onClose()}>
        <RadixDialog.Portal>
          <RadixDialog.Overlay className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <RadixDialog.Content
            aria-describedby={undefined}
            className="fixed inset-0 z-50 flex flex-col bg-canvas text-text-primary overflow-hidden select-none focus:outline-none"
          >
            <RadixVisuallyHidden.Root>
              <RadixDialog.Title>
                {track ? `Playing ${track.title}` : "Full Player View"}
              </RadixDialog.Title>
            </RadixVisuallyHidden.Root>
            {content}
          </RadixDialog.Content>
        </RadixDialog.Portal>
      </RadixDialog.Root>
    );
  }

  return content;
};
