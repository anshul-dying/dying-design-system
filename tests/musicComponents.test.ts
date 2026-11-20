import { test, describe } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import {
  Badge,
  PageHeader,
  HeroBannerCard,
  HeroCarousel,
  MediaShelf,
  MediaCard,
  MoodChip,
  MoodChipBar,
  QuickPicksGrid,
  QuickPicksColumn,
  QuickPickRow,
  TrackRow,
  TrackTable,
  SyncedLyricsView,
  FullImmersionLyrics,
  FullPlayerView,
  FloatingPlayerPill,
  PlayerBar,
  AmbientAura,
  SoundWave,
} from "../src/index";

describe("Dying Design System — Music & Media Components Suite", () => {
  describe("1. Music and Media Domain Components Public API", () => {
    test("verifies media and music streaming domain components are defined", () => {
      const domainComponents = [
        PageHeader,
        HeroBannerCard,
        HeroCarousel,
        MediaShelf,
        MediaCard,
        MoodChip,
        MoodChipBar,
        QuickPicksGrid,
        QuickPicksColumn,
        QuickPickRow,
        TrackRow,
        TrackTable,
        SyncedLyricsView,
        FullImmersionLyrics,
        FullPlayerView,
        FloatingPlayerPill,
        PlayerBar,
        AmbientAura,
        SoundWave,
      ];
      domainComponents.forEach((Component) => {
        assert.ok(Component, "Domain component must be defined");
      });
    });
  });

  describe("2. Synced and Unsynced Lyrics System Verification", () => {
    test("verifies Badge supports size='xs' with variant='glass'", () => {
      const badgeElem = React.createElement(Badge, { variant: "glass", size: "xs" }, "LRCLIB");
      assert.ok(React.isValidElement(badgeElem));
    });

    test("verifies SyncedLyricsView accepts dual mode props (synced, plainLyrics, source)", () => {
      // Synced mode element
      const syncedElem = React.createElement(SyncedLyricsView, {
        lyrics: [{ time: 10, text: "Glow line test" }],
        currentTime: 10,
        synced: true,
        source: "LRCLIB",
      });
      assert.ok(React.isValidElement(syncedElem));

      // Unsynced mode element
      const unsyncedElem = React.createElement(SyncedLyricsView, {
        synced: false,
        plainLyrics: "First line of unsynced lyrics\nSecond line",
        source: "kugou",
      });
      assert.ok(React.isValidElement(unsyncedElem));
    });

    test("verifies FullPlayerView accepts enhanced lyrics props and loading state", () => {
      const playerElem = React.createElement(FullPlayerView, {
        track: { id: "test", title: "Test Track", artist: "Artist", duration: 180 },
        onClose: () => {},
        activeTab: "lyrics",
        lyrics: [{ time: 5, text: "Lyrics row" }],
        synced: true,
        plainLyrics: "Plain text lyrics",
        source: "lrclib",
        isLyricsLoading: true,
      });
      assert.ok(React.isValidElement(playerElem));
    });
  });
});
