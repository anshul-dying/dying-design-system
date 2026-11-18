# Dying Design System (`@mp/dying`)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg?style=flat-square)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4.0-38bdf8.svg?style=flat-square)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-Primitives-black.svg?style=flat-square)](https://www.radix-ui.com/)
[![WCAG](https://img.shields.io/badge/WCAG-2.2_AAA%2FAA-success.svg?style=flat-square)](https://www.w3.org/WAI/standards-guidelines/wcag/)

> **A monochrome graphite and dark acrylic design system engineered for high-fidelity audio streaming and precision desktop applications.**

---

## Overview

**Dying** is a comprehensive, production-grade design system built from first principles. It combines the refined tactile elegance of macOS and Apple Music dark mode with rigorous mathematical foundations, fluid physics-based motion, and headless accessible primitives.

- 🎨 **Monochrome Graphite Aesthetic:** Frosted acrylic backdrops, specular light borders, and deep charcoal/OLED surfaces.
- 📐 **Mathematical Contrast Rigor:** Colors mapped using standard CIE $L^*$ perceptual lightness, mathematically guaranteeing WCAG 2.2 AA / AAA compliance.
- ♿ **Radix UI Accessible Foundations:** Complete keyboard navigation, focus rings (`:focus-visible`), ARIA dialogs, and screen reader announcements.
- 🎵 **First-Class Streaming Audio Primitives:** Precision scrubbers, snapping media shelves, floating player docks, and synchronized full-screen lyrics.
- 🌓 **Multi-Theme Runtime:** Seamless switching between `dark`, `oled`, `light`, and `system` modes with zero SSR flash.
- 🧩 **W3C DTCG Token Specification:** Standardized design tokens spanning typography, spacing, surface colors, and spring physics.

---

## System Architecture

Dying enforces a strict 7-layer unidirectional dependency pipeline:

```
┌────────────────────────────────────────────────────────────────────────┐
│ Layer 7: APPLICATION UI                                                │
│ Consumes components and patterns. Zero ad-hoc style invention.         │
├────────────────────────────────────────────────────────────────────────┤
│ Layer 6: COMPOSABLE DOMAIN PATTERNS                                    │
│ MediaShelf, HeroCarousel, TrackTable, FloatingPlayerPill, FullImmersion│
├────────────────────────────────────────────────────────────────────────┤
│ Layer 5: FOUNDATIONAL COMPONENTS                                       │
│ Button, IconButton, Input, Badge, Dialog, Tooltip, Switch, Skeleton    │
├────────────────────────────────────────────────────────────────────────┤
│ Layer 4: DESIGN PRIMITIVES                                             │
│ Box, Stack, Flex, Grid, Container, Text, Heading, Separator, VHidden   │
├────────────────────────────────────────────────────────────────────────┤
│ Layer 3: SEMANTIC DESIGN TOKENS                                        │
│ Surface, Text, Border, Interactive, Feedback, Focus Tokens             │
├────────────────────────────────────────────────────────────────────────┤
│ Layer 2: PRIMITIVE DESIGN TOKENS (W3C DTCG)                            │
│ 10-step Graphite Palette (50–950), Spacing, Sizing, Radius, Shadows    │
├────────────────────────────────────────────────────────────────────────┤
│ Layer 1: DESIGN FOUNDATIONS & CSS ENGINE                               │
│ Typography rules, Breakpoints, Spring Bezier curves, Tailwind v4 @theme│
└────────────────────────────────────────────────────────────────────────┘
```

---

## Quick Start

### 1. Installation

Install peer dependencies and `@mp/dying`:

```bash
pnpm add @mp/dying react react-dom lucide-react framer-motion tailwindcss
```

### 2. Import CSS Theme

Import `theme.css` at the root of your application (e.g. `layout.tsx` or `globals.css`):

```tsx
import "@mp/dying/theme.css";
```

### 3. Wrap with ThemeProvider

```tsx
import { ThemeProvider } from "@mp/dying";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="dark" storageKey="dying-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## Usage Examples

### Basic Layout & Primitives

```tsx
import { Box, Flex, Stack, Heading, Text, Button, GlassCard } from "@mp/dying";
import { Play } from "lucide-react";

export function AlbumSpotlight() {
  return (
    <GlassCard variant="interactive" className="p-6 max-w-md">
      <Stack gap={4}>
        <Box className="aspect-square rounded-xl bg-surface overflow-hidden">
          <img src="/artwork.jpg" alt="Album Cover" className="w-full h-full object-cover" />
        </Box>
        <Stack gap={1}>
          <Heading level={2}>Midnight Reverie</Heading>
          <Text variant="secondary">Anshul Dying • 2026</Text>
        </Stack>
        <Flex gap={3} align="center">
          <Button variant="primary" icon={<Play className="w-4 h-4 fill-current" />}>
            Play Album
          </Button>
          <Button variant="ghost">Save</Button>
        </Flex>
      </Stack>
    </GlassCard>
  );
}
```

### Floating Player Transport & Scrubber

```tsx
import { FloatingPlayerPill, ScrubSlider, SpringButton } from "@mp/dying";
import { Play, SkipForward, SkipBack, Volume2 } from "lucide-react";

export function Player() {
  return (
    <FloatingPlayerPill
      artwork="/album.jpg"
      title="Solitude in Graphite"
      artist="Ambient Architecture"
      isPlaying={true}
      currentTime={142}
      duration={264}
      onSeek={(seconds) => console.log("Seek:", seconds)}
      onPlayPause={() => console.log("Toggle playback")}
      onNext={() => console.log("Next track")}
      onPrevious={() => console.log("Previous track")}
    />
  );
}
```

---

## Component Catalog

### 🔲 Primitives (`/src/primitives`)
| Component | Description |
|---|---|
| `Box` | Polymorphic container element supporting `as` prop |
| `Flex` & `Stack` | Directional flexbox layouts with consistent spacing tokens |
| `Grid` & `Container` | Responsive CSS grid layouts and bounded containers |
| `Text` & `Heading` | Polymorphic typography with built-in contrast scale |
| `Separator` | Accessible horizontal or vertical visual divider |
| `VisuallyHidden` | Radix-powered screen reader text utility |

### 💎 Acrylic Surfaces & Effects (`/src/primitives` & `/src/effects`)
| Component | Description |
|---|---|
| `GlassPanel` | Frosted acrylic panel with blur and specular outline |
| `GlassCard` | Interactive surface with hover lift and spring transitions |
| `OledBase` | True-black `#000000` power-efficient backdrop |
| `AmbientAura` | Dynamic multi-orb ambient glowing background |
| `SoundWave` | Animated real-time frequency equalizer bars |

### 🎛️ Foundational UI (`/src/components`)
| Component | Description |
|---|---|
| `Button` & `IconButton` | Variants: `primary`, `secondary`, `ghost`, `danger`, `outline` |
| `Badge` | Status, category, and metadata tags |
| `Card` | Compound pattern: `Card.Header`, `Card.Title`, `Card.Content`, `Card.Footer` |
| `Avatar` | Radix image avatar with auto-fallback initials |
| `Forms` | `Input`, `Textarea`, `Select`, `Label`, `FormField` with error handling |
| `Controls` | Accessible Radix `Checkbox` and `Switch` toggles |
| `Overlays` | Accessible `Dialog` modals and `Tooltip` popups |
| `Feedback` | `Spinner`, `Skeleton`, `EmptyState`, and `Alert` banners |

### 🎵 Media & Audio Patterns (`/src/music` & `/src/media`)
| Component | Description |
|---|---|
| `ScrubSlider` | Fine-grained seekbar & volume slider with smooth touch/drag |
| `SpringButton` | Tactile playback button with Framer Motion spring physics |
| `TrackTable` & `TrackRow` | Tabular playlist view with duration, like status, and active track waveforms |
| `FloatingPlayerPill` | Minimalist floating glass audio dock |
| `SyncedLyricsView` | Time-synchronized auto-scrolling lyric lines |
| `FullImmersionLyrics` | Immersive full-screen ambient lyric experience |
| `MediaShelf` & `MediaCard` | Horizontal snapping carousel with navigation arrows |
| `HeroCarousel` & `HeroBannerCard` | Prominent promotional stations and album banners |

---

## Design Tokens & Contrast Guarantees

Dying guarantees mathematical WCAG compliance across its **Monochrome Graphite Scale**:

| Token Name | Hex Code | Purpose | Guaranteed Contrast vs Canvas |
|---|---|---|---|
| `graphite-0` | `#000000` | True OLED canvas | $1.20:1$ |
| `graphite-950`| `#121214` | Sidebar backdrop | $1.02:1$ |
| `graphite-900`| `#141416` | Standard Canvas base | $1.00:1$ (Base) |
| `graphite-800`| `#1e1e22` | Cards & Elevated Surfaces | $1.09:1$ |
| `graphite-700`| `#2c2c2e` | Active pills & hovers | $1.27:1$ |
| `graphite-500`| `#636366` | Subtle structural borders | $2.75:1$ (AA Boundary) |
| `graphite-300`| `#98989d` | Secondary text | **6.40:1** (WCAG AA Pass) |
| `graphite-0` (White) | `#ffffff` | Primary text & high contrast | **18.20:1** (WCAG AAA Pass) |

---

## Development & Testing

```bash
# Typecheck
pnpm typecheck

# Run test suites (Component & Architectural Enforcement tests)
pnpm test

# Linting
pnpm lint
```

---

## License

Private & Proprietary. All rights reserved.
