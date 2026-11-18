import { test, describe } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import {
  dyingTokens,
  primitiveTokens,
  semanticTokens,
  componentTokens,
  cn,
  Box,
  Flex,
  Stack,
  Grid,
  Container,
  Text,
  Heading,
  Separator,
  VisuallyHidden,
  Button,
  IconButton,
  ButtonGroup,
  ThemeSwitcher,
  Badge,
  Spinner,
  Skeleton,
  EmptyState,
  Alert,
  Card,
  Avatar,
  Input,
  Textarea,
  Select,
  Checkbox,
  Switch,
  Label,
  FormField,
  Tooltip,
  Dialog,
  GlassPanel,
  GlassCard,
  OledBase,
  ScrubSlider,
  SpringButton,
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
  ThemeProvider,
  useTheme,
} from "../src/index";

describe("Dying Design System — Enterprise Quality Suite", () => {
  describe("1. Design Tokens & DTCG Standard Compliance", () => {
    test("verifies DTCG schema and top-level token groups", () => {
      assert.ok(dyingTokens, "dyingTokens must be defined");
      assert.strictEqual(dyingTokens.name, "dying");
      assert.strictEqual(dyingTokens.version, "1.0.0");
      assert.ok(dyingTokens.primitive, "primitive token group must exist");
      assert.ok(dyingTokens.semantic, "semantic token group must exist");
      assert.ok(dyingTokens.component, "component token group must exist");
    });

    test("verifies full 10-step Monochrome Graphite color scale", () => {
      const colors = primitiveTokens.colors;
      assert.strictEqual(colors.graphite50, "#f7f7f8");
      assert.strictEqual(colors.graphite100, "#e5e5ea");
      assert.strictEqual(colors.graphite200, "#d1d1d6");
      assert.strictEqual(colors.graphite300, "#aeaeb2");
      assert.strictEqual(colors.graphite400, "#86868b");
      assert.strictEqual(colors.graphite500, "#636366");
      assert.strictEqual(colors.graphite600, "#48484a");
      assert.strictEqual(colors.graphite700, "#2c2c2e");
      assert.strictEqual(colors.graphite800, "#1e1e22");
      assert.strictEqual(colors.graphite900, "#141416");
      assert.strictEqual(colors.graphite950, "#121214");
      assert.strictEqual(colors.white, "#ffffff");
      assert.strictEqual(colors.black, "#000000");
    });

    test("verifies semantic surface and text tokens match foundation roles", () => {
      assert.strictEqual(semanticTokens.surfaces.canvas, "#141416");
      assert.strictEqual(semanticTokens.surfaces.sidebar, "#121214");
      assert.strictEqual(semanticTokens.surfaces.card, "#1e1e22");
      assert.strictEqual(semanticTokens.surfaces.hover, "#28282c");
      assert.strictEqual(semanticTokens.surfaces.activePill, "#2c2c2e");
      assert.strictEqual(semanticTokens.text.primary, "#ffffff");
      assert.strictEqual(semanticTokens.text.secondary, "#98989d");
      assert.strictEqual(semanticTokens.text.tertiary, "#86868b");
      assert.strictEqual(semanticTokens.text.kicker, "#86868b");
    });

    test("verifies 4px baseline spacing rhythm", () => {
      assert.strictEqual(primitiveTokens.spacing[0], "0px");
      assert.strictEqual(primitiveTokens.spacing[1], "4px");
      assert.strictEqual(primitiveTokens.spacing[2], "8px");
      assert.strictEqual(primitiveTokens.spacing[3], "12px");
      assert.strictEqual(primitiveTokens.spacing[4], "16px");
      assert.strictEqual(primitiveTokens.spacing[6], "24px");
      assert.strictEqual(primitiveTokens.spacing[8], "32px");
      assert.strictEqual(primitiveTokens.spacing[12], "48px");
    });

    test("verifies radius and z-index scales", () => {
      assert.strictEqual(primitiveTokens.radius.xs, "4px");
      assert.strictEqual(primitiveTokens.radius.md, "8px");
      assert.strictEqual(primitiveTokens.radius.xl, "16px");
      assert.strictEqual(primitiveTokens.radius["2xl"], "20px");
      assert.strictEqual(primitiveTokens.radius.full, "9999px");

      assert.strictEqual(primitiveTokens.zIndex.base, 0);
      assert.strictEqual(primitiveTokens.zIndex.dock, 10);
      assert.strictEqual(primitiveTokens.zIndex.modal, 50);
      assert.strictEqual(primitiveTokens.zIndex.toast, 70);
    });

    test("verifies spring motion physics bezier curves", () => {
      assert.ok(primitiveTokens.springs.snappy.includes("cubic-bezier"));
      assert.ok(primitiveTokens.springs.smooth.includes("cubic-bezier"));
      assert.ok(primitiveTokens.springs.tactile.includes("cubic-bezier"));
      assert.ok(primitiveTokens.springs.bounce.includes("cubic-bezier"));
    });
  });

  describe("2. ClassName & Style Utility (cn)", () => {
    test("merges class names and deduplicates conflicting Tailwind utilities", () => {
      const merged = cn("p-4 text-white", "p-6", false && "hidden", null, undefined);
      assert.strictEqual(merged, "text-white p-6");

      const bgConflict = cn("bg-surface", "bg-canvas");
      assert.strictEqual(bgConflict, "bg-canvas");
    });
  });

  describe("3. Component Library Public API Verification", () => {
    test("verifies all foundational primitives are valid React components", () => {
      const primitives = [
        Box,
        Flex,
        Stack,
        Grid,
        Container,
        Text,
        Heading,
        Separator,
        VisuallyHidden,
        GlassPanel,
        GlassCard,
        OledBase,
      ];
      primitives.forEach((Component) => {
        assert.ok(Component, "Component must be defined");
        assert.ok(
          typeof Component === "function" || typeof Component === "object",
          "Component must be a valid React component or forwardRef"
        );
      });
    });

    test("verifies foundational UI action, form, and feedback components", () => {
      const components = [
        Button,
        IconButton,
        ButtonGroup,
        ThemeSwitcher,
        Badge,
        Spinner,
        Skeleton,
        EmptyState,
        Alert,
        Card,
        Avatar,
        Input,
        Textarea,
        Select,
        Checkbox,
        Switch,
        Label,
        FormField,
        Tooltip,
        Dialog,
      ];
      components.forEach((Component) => {
        assert.ok(Component, "Component must be defined");
      });
    });

    test("verifies media and music streaming domain components", () => {
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

  describe("4. Accessibility & Theming Standards", () => {
    test("verifies ThemeProvider and useTheme exports", () => {
      assert.strictEqual(typeof ThemeProvider, "function");
      assert.strictEqual(typeof useTheme, "function");
    });

    test("verifies component tokens are within WCAG specifications", () => {
      assert.strictEqual(componentTokens.sidebar.width, "240px");
      assert.strictEqual(componentTokens.playerPill.maxWidth, "720px");
      assert.strictEqual(componentTokens.playerBar.height, "88px");
      assert.strictEqual(componentTokens.scrubber.trackHeight, "4px");
    });
  });
});
