'use client';

import React, { useState, useEffect } from 'react';
import {
  Text,
  Heading,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Flex,
  Button,
  HeroBannerCard,
  MediaShelf,
  MediaCard,
  TrackTable,
  SoundWave,
  FloatingPlayerPill,
  FullImmersionLyrics,
} from '@mp/dying';
import { Maximize2 } from 'lucide-react';
import { SAMPLE_LYRICS, SHOWCASE_TRACKS } from '../data/mockData';

export function MusicSection() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(45);
  const [currentTrackId, setCurrentTrackId] = useState<string>('demo-1');
  const [isLyricsOpen, setIsLyricsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => (prev >= 184 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentTrack = SHOWCASE_TRACKS.find((t) => t.id === currentTrackId) || SHOWCASE_TRACKS[0];

  return (
    <div className="space-y-16">
      <section className="space-y-6">
        <div className="flex flex-col gap-1">
          <Text variant="kicker" size="xs">Audio Domain · Layer 6</Text>
          <Heading level={2} size="h2">Streaming Domain Primitives</Heading>
          <Text variant="secondary" size="sm">
            Responsive audio components, live waveforms, and full-immersion lyric projection.
          </Text>
        </div>

        {/* Hero Banner Card */}
        <HeroBannerCard
          title="GNX"
          subtitle="Kendrick Lamar"
          kicker="FEATURED RELEASE"
          imageUrl="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80"
          onPlay={() => {
            setIsPlaying(true);
            setCurrentTrackId('demo-1');
          }}
        />

        {/* Media Shelf */}
        <MediaShelf title="Heavy Rotation">
          {SHOWCASE_TRACKS.map((t) => (
            <MediaCard
              key={t.id}
              title={t.title}
              subtitle={t.artist}
              imageUrl={t.thumbnailUrl || ''}
              onPlay={() => {
                setCurrentTrackId(t.id);
                setIsPlaying(true);
              }}
            />
          ))}
        </MediaShelf>

        {/* Track Table */}
        <Card variant="glass" className="overflow-hidden">
          <CardHeader>
            <CardTitle>Interactive Track Table</CardTitle>
            <CardDescription>Hover over rows to preview pure geometric play/pause transitions.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <TrackTable
              tracks={SHOWCASE_TRACKS}
              currentTrackId={currentTrackId}
              isPlaying={isPlaying}
              onTrackSelect={(track) => setCurrentTrackId(track.id)}
              onTrackPlay={(track) => {
                setCurrentTrackId(track.id);
                setIsPlaying(true);
              }}
              onTrackPause={() => setIsPlaying(false)}
            />
          </CardContent>
        </Card>

        {/* Lyrics Dialog Modal */}
        <Flex gap="3" align="center">
          <Button
            variant="primary"
            leftIcon={<Maximize2 size={16} />}
            onClick={() => setIsLyricsOpen(true)}
          >
            Open Full Immersion Lyrics
          </Button>
          <SoundWave isPlaying={isPlaying} barCount={5} />
        </Flex>
      </section>

      {/* Floating Audio Player Pill Dock */}
      <FloatingPlayerPill
        title={currentTrack.title}
        artist={currentTrack.artist}
        album={currentTrack.album}
        artworkUrl={currentTrack.thumbnailUrl}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={currentTrack.duration}
        buffered={75}
        volume={0.85}
        isLyricsOpen={isLyricsOpen}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onToggleLyrics={() => setIsLyricsOpen(!isLyricsOpen)}
        onSeek={(seconds) => setCurrentTime(seconds)}
      />

      {/* Fullscreen Lyrics Projection Modal */}
      {isLyricsOpen && (
        <FullImmersionLyrics
          track={currentTrack}
          lyrics={SAMPLE_LYRICS}
          currentTime={currentTime}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onClose={() => setIsLyricsOpen(false)}
          onSeek={(seconds) => setCurrentTime(seconds)}
        />
      )}
    </div>
  );
}
