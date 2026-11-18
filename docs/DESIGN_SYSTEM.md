# Dying Design System — Central Architectural Reference

**Package:** `@mp/dying`  
**Version:** `1.0.0`  
**License:** Private / Proprietary  
**Aesthetic:** Monochrome Graphite Apple Music Dark Mode  

---

## 1. What is Dying?

**Dying** is the single source of truth for UI architecture and design implementation across this project. It is not just a widget library; it is an integrated design-system infrastructure providing:
- W3C DTCG-compliant design tokens.
- Fluid responsive layout and typography primitives.
- Accessible foundational UI components powered by Radix UI.
- Composable domain streaming audio patterns (TrackTable, FloatingPlayerPill, SyncedLyrics, FullImmersionLyrics).
- Built-in multi-theme runtime (`dark`, `oled`, `light`, `system`) with zero-flicker SSR hydration.

---

## 2. System Architecture & Directory Structure

```
packages/dying/
├── package.json               # Package boundaries & exports
├── theme.css                  # Tailwind v4 @theme, :root & data-theme variables
├── tsconfig.json              # TypeScript compilation settings
└── src/
    ├── index.ts               # Primary barrel export
    ├── tokens/                # Layer 1-3: Foundations & Tokens
    │   ├── tokens.json        # W3C DTCG Token Specification (Source of Truth)
    │   ├── index.ts           # Primitive & semantic token objects
    │   └── ThemeProvider.tsx  # ThemeProvider context & useTheme hook
    ├── primitives/            # Layer 4: Primitives
    │   ├── Box.tsx            # Polymorphic container (as?: ElementType)
    │   ├── Stack.tsx          # Stack & Flex containers
    │   ├── Grid.tsx           # Responsive CSS Grid & Container
    │   ├── Text.tsx           # Polymorphic Text & Heading
    │   ├── Separator.tsx      # Semantic divider (Radix Separator)
    │   ├── VisuallyHidden.tsx # Screen reader utility (Radix VisuallyHidden)
    │   ├── GlassPanel.tsx     # Frosted acrylic surface
    │   ├── GlassCard.tsx      # Interactive card with specular highlight
    │   ├── OledBase.tsx       # Foundation canvas backdrop
    │   ├── ScrubSlider.tsx    # Audio scrubber & volume slider
    │   └── SpringButton.tsx   # Tactile spring playback button
    ├── components/            # Layer 5: Foundational UI Components
    │   ├── Button.tsx         # Accessible button with loading spinner & variants
    │   ├── IconButton.tsx     # Icon button & ButtonGroup
    │   ├── Badge.tsx          # Status & metadata badge
    │   ├── Feedback.tsx       # Spinner, Skeleton, EmptyState, Alert
    │   ├── Card.tsx           # Compound Card (Header, Title, Description, Content, Footer)
    │   ├── Avatar.tsx         # Image & fallback avatar (Radix Avatar)
    │   ├── Forms.tsx          # Input, Textarea, Select, Label, FormField
    │   ├── Controls.tsx       # Checkbox, Switch (Radix Checkbox & Switch)
    │   └── Overlays.tsx       # Tooltip, Dialog (Radix Tooltip & Dialog)
    ├── layout/                # Layout Framing
    │   ├── AppShell.tsx       # Responsive frame with Radix Dialog drawer & player dock
    │   ├── Sidebar.tsx        # Brand, SearchInput, SidebarNav, NavItem, Footer
    │   └── FloatingPlayerPill.tsx # Glass floating transport & scrubber pill
    ├── media/                 # Media Shelf & Banner Components
    │   ├── PageHeader.tsx     # Standard page header with kicker & action slot
    │   ├── HeroBannerCard.tsx # Large featured banner card with hover zoom & play
    │   ├── HeroCarousel.tsx   # Grid carousel for featured stations
    │   ├── MediaShelf.tsx     # Horizontal snapping shelf with desktop arrows
    │   └── MediaCard.tsx      # Square or portrait media artwork card
    ├── music/                 # Audio Streaming Components
    │   ├── TrackRow.tsx       # Table row with waveform, playback, like, duration
    │   ├── TrackTable.tsx     # Responsive track list table with headers
    │   ├── SyncedLyricsView.tsx # Time-synchronized auto-scrolling lyrics
    │   ├── FullImmersionLyrics.tsx # Radix Dialog full-screen lyrics view
    │   └── PlayerBar.tsx      # Full-width fixed bottom bar alternative
    ├── effects/               # Canvas & SVG Audio Effects
    │   ├── AmbientAura.tsx    # Multi-orb glowing canvas backdrop
    │   └── SoundWave.tsx      # Animated audio equalizer bars
    └── utils/
        └── cn.ts              # clsx + tailwind-merge utility
```

---

## 3. Quick Start & Import Conventions

Import all tokens, primitives, components, and patterns directly from `@mp/dying`:

```tsx
import {
  // Primitives
  Box,
  Flex,
  Stack,
  Grid,
  Text,
  Heading,
  Separator,
  
  // Components
  Button,
  IconButton,
  Badge,
  Input,
  FormField,
  Dialog,
  DialogTrigger,
  DialogContent,
  Card,
  
  // Media & Music
  PageHeader,
  MediaShelf,
  MediaCard,
  TrackTable,
  FloatingPlayerPill,
  
  // Theming
  ThemeProvider,
  useTheme,
} from '@mp/dying';
```

---

## 4. Theme System & Mode Switching

Dying supports 3 distinct visual themes:
1. `dark` (Default): Apple Music Dark Mode in Monochrome Graphite (`#141416` canvas, `#1e1e22` surface, `#28282c` hover).
2. `oled`: True Black for OLED displays (`#000000` canvas and sidebar, `#101012` surface).
3. `light`: High-contrast light alternative (`#f7f7f8` canvas, `#ffffff` surface).

### Setup in Next.js Root Layout:
```tsx
import { ThemeProvider } from '@mp/dying';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" data-theme="dark">
      <body>
        <ThemeProvider defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## 5. Component API Index

| Category | Component | Purpose | Key Props |
|---|---|---|---|
| **Layout Primitives** | `Box` | Polymorphic container | `as`, `className`, `children` |
| | `Stack` | Vertical layout with token gap | `gap: "1".."12"`, `align`, `children` |
| | `Flex` | Flexible flexbox container | `direction`, `align`, `justify`, `gap` |
| | `Grid` | Responsive CSS grid | `cols: 1..12`, `gap` |
| | `Container` | Centered content boundary | `size: "sm" \| "md" \| "lg" \| "xl" \| "full"` |
| **Typography** | `Text` | Polymorphic text | `variant: "primary" \| "secondary" \| "tertiary" \| "kicker"`, `size` |
| | `Heading` | Semantic heading (H1-H6) | `level: 1..6`, `size`, `tracking: "tight"` |
| **Actions** | `Button` | Accessible action button | `variant`, `size`, `isLoading`, `leftIcon`, `rightIcon` |
| | `IconButton` | Icon action button | `icon`, `aria-label` (required), `variant`, `size` |
| | `ButtonGroup` | Group of buttons | `attached: boolean` |
| **Form Controls** | `Input` | Text input | `leftIcon`, `rightIcon`, `hasError`, `sizeVariant` |
| | `Textarea` | Multiline input | `hasError`, `disabled` |
| | `Select` | Dropdown selector | `hasError`, `children` |
| | `Checkbox` | Accessible checkbox (Radix) | `label`, `checked`, `onCheckedChange` |
| | `Switch` | Accessible switch (Radix) | `label`, `checked`, `onCheckedChange` |
| | `FormField` | Integrated field wrapper | `label`, `helperText`, `errorMessage`, `required` |
| **Feedback** | `Badge` | Status & metadata indicator | `variant: "neutral" \| "accent" \| "glass" \| "success" \| ...`, `dot` |
| | `Spinner` | Loading spinner | `size: "xs" \| "sm" \| "md" \| "lg" \| "xl"`, `label` |
| | `Skeleton` | Shimmer placeholder | `variant: "rounded" \| "circle" \| "text"` |
| | `EmptyState` | Empty list or search state | `icon`, `title`, `description`, `actionSlot` |
| | `Alert` | Accessible banner callout | `variant: "info" \| "success" \| "warning" \| "error"`, `title` |
| **Overlays** | `Dialog` | Modal dialog (Radix) | `open`, `onOpenChange`, `children` |
| | `Tooltip` | Floating tooltip (Radix) | `content`, `side`, `children` |
| **Surfaces** | `Card` | Compound card container | `variant: "default" \| "glass" \| "elevated" \| "outline"` |
| | `GlassPanel` | Frosted acrylic panel | `variant: "subtle" \| "default" \| "elevated" \| "heavy"` |
| | `GlassCard` | Interactive card with glow | `interactive`, `active`, `glowOnHover` |
| **Media & Music** | `TrackTable` | Track listing with headers | `tracks`, `currentTrackId`, `isPlaying`, `onTrackSelect` |
| | `TrackRow` | Single song row | `track`, `index`, `isActive`, `isPlaying`, `onPlay` |
| | `FloatingPlayerPill` | Docked audio player | `title`, `artist`, `isPlaying`, `currentTime`, `duration`, `onPlayPause` |
| | `FullImmersionLyrics`| Fullscreen lyrics modal | `track`, `lyrics`, `currentTime`, `onClose`, `onSeek` |
| | `MediaShelf` | Horizontal scroll shelf | `title`, `seeAllHref`, `onSeeAll`, `children` |
| | `MediaCard` | Artwork thumbnail card | `title`, `subtitle`, `imageUrl`, `aspect: "square" \| "portrait"` |

---

## 6. Prohibited Practices in Application Code

Future developers and AI coding agents must strictly obey:
1. **Never use raw arbitrary hex Tailwind classes:** (e.g. `bg-[#1e1e22]`, `text-[#86868b]`, `border-white/[0.08]`). Always use semantic tokens (`bg-surface`, `text-text-primary`, `text-text-secondary`, `border-border-subtle`).
2. **Never build custom buttons, inputs, or dialogs:** Always use `Button`, `IconButton`, `Input`, `Dialog`, `Badge`, `Switch`, `Checkbox` from `@mp/dying`.
3. **Never write raw inline styles:** (`style={{ ... }}`) unless dynamic runtime calculations (such as audio currentTime percentage or volume) strictly require it.
4. **Never create competing CSS files or styled modules:** Dying governs styling for the entire frontend application.
