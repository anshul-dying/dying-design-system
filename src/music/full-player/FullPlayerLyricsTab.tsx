import React from "react";
import { SyncedLyricsView, LyricLine } from "../SyncedLyricsView";
import { EmptyState, Skeleton } from "../../components/Feedback";

export interface FullPlayerLyricsTabProps {
  resolvedLoading: boolean;
  resolvedSynced?: boolean;
  resolvedPlainLyrics?: string;
  resolvedSource?: string;
  parsedLyrics: LyricLine[];
  currentTime?: number;
  onSeek?: (time: number) => void;
}

export const FullPlayerLyricsTab: React.FC<FullPlayerLyricsTabProps> = ({
  resolvedLoading,
  resolvedSynced,
  resolvedPlainLyrics,
  resolvedSource,
  parsedLyrics,
  currentTime = 0,
  onSeek,
}) => {
  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="pb-3 mb-2 border-b border-border-subtle shrink-0 flex items-center justify-between px-2">
        <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">
          Lyrics
        </h3>
        <span className="text-xs text-text-tertiary">
          {resolvedLoading
            ? "Loading..."
            : resolvedSynced === false
            ? "Plain Lyrics"
            : "Synced Karaoke"}
        </span>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        {resolvedLoading ? (
          <div className="flex flex-col gap-4 py-8 max-w-xl mx-auto w-full px-6">
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-7 w-1/2" />
            <Skeleton className="h-8 w-5/6" />
            <Skeleton className="h-7 w-2/3" />
            <Skeleton className="h-8 w-4/5" />
            <Skeleton className="h-7 w-3/5" />
            <Skeleton className="h-7 w-1/2" />
          </div>
        ) : parsedLyrics.length > 0 || resolvedPlainLyrics ? (
          <SyncedLyricsView
            lyrics={parsedLyrics}
            currentTime={currentTime}
            onSeek={onSeek}
            synced={resolvedSynced}
            plainLyrics={resolvedPlainLyrics}
            source={resolvedSource}
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
  );
};

FullPlayerLyricsTab.displayName = "FullPlayerLyricsTab";
