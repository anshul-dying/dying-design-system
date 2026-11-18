# Dying Design System — Architecture Specification

**Status:** Approved Architectural Blueprint (Stage B Deliverable)  
**Package:** `@mp/dying`  
**Target Maturity:** Enterprise-Grade, Production-Ready Design System  

---

## 1. Architectural Hierarchy

The Dying Design System is structured as a strict 7-layer unidirectional dependency pipeline:

```
┌────────────────────────────────────────────────────────────────────────┐
│ Layer 7: APPLICATION UI (frontend/app/src/app/**)                      │
│ Strictly consumes Layer 4, 5, 6. Never invents independent styling.   │
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
│ Surface, Text, Border, Interactive, Feedback, Focus, Component Tokens │
├────────────────────────────────────────────────────────────────────────┤
│ Layer 2: PRIMITIVE DESIGN TOKENS (W3C DTCG Format)                     │
│ Color Palettes (Graphite 50-950), Spacing, Sizing, Radius, Shadows     │
├────────────────────────────────────────────────────────────────────────┤
│ Layer 1: DESIGN FOUNDATIONS & CSS ENGINE                               │
│ Typography rules, Breakpoints, Spring Bezier physics, Tailwind v4 @theme│
└────────────────────────────────────────────────────────────────────────┘
```

### Dependency Rules:
1. **Unidirectional flow:** Higher layers may only depend on equal or lower layers. A lower layer (e.g. `Layer 3 Semantic Tokens`) must never import or depend on a higher layer (e.g. `Layer 5 Components`).
2. **Generic Component Isolation:** Layers 1 through 5 must never import application-specific business logic, stores (such as Zustand playerStore), or backend contracts.
3. **Domain Component Contracts:** Layer 6 components (such as `TrackTable` or `FloatingPlayerPill`) accept pure props and callback events (`TrackData`, `onPlayPause`, `onSeek`) without tightly binding to state managers.

---

## 2. Token Architecture & Multi-Theme Strategy

### 2.1 Three-Tier Token Model
1. **Primitive Tokens (`primitiveTokens`):**
   Raw values in W3C Design Token Community Group (DTCG) specification format:
   - Full 10-step Monochrome Graphite color scale: `graphite-50` through `graphite-950`, plus `white`, `black`, and accent/feedback hues (`emerald-400`, `amber-400`, `rose-500`, `sky-400`).
   - Spacing scale: 4px base increment (`0`, `0.5`, `1`, `1.5`, `2`, `2.5`, `3`, `4`, `5`, `6`, `8`, `10`, `12`, `16`, `20`, `24`, `32`).
   - Sizing, Radius, Blur, Shadows, Z-Index, and Motion scales.
2. **Semantic Tokens (`semanticTokens`):**
   Purpose-driven abstractions referencing primitives:
   - `surface.canvas`, `surface.sidebar`, `surface.card`, `surface.hover`, `surface.active`, `surface.glass`
   - `text.primary`, `text.secondary`, `text.tertiary`, `text.kicker`, `text.inverse`, `text.accent`
   - `border.subtle`, `border.muted`, `border.focus`
   - `action.primary.bg`, `action.primary.text`, `action.secondary.bg`, etc.
   - `feedback.success`, `feedback.warning`, `feedback.error`, `feedback.info`
3. **Component Tokens (`componentTokens`):**
   Specific dimensional and state constraints for complex widgets:
   - `sidebar.width` (240px)
   - `playerPill.maxWidth` (720px), `playerPill.blur` (24px)
   - `playerBar.height` (88px)
   - `scrubber.trackHeight` (4px), `scrubber.hoverTrackHeight` (6px)

### 2.2 CSS Variable Synchronization with Tailwind v4
All tokens are defined in `packages/dying/src/tokens/tokens.json` and mirrored in `packages/dying/theme.css` via:
- Tailwind `@theme` directive (enabling direct classes like `bg-canvas`, `bg-surface`, `bg-surface-hover`, `text-text-primary`, `text-text-secondary`, `border-border-subtle`).
- Root `:root` and theme attributes (`[data-theme="dark"]`, `[data-theme="oled"]`, `[data-theme="light"]`) for dynamic theme adaptation.

---

## 3. Component Architecture & Public API Standardization

### 3.1 Naming and Props Conventions
- **Component Names:** PascalCase (e.g., `Button`, `Dialog`, `TrackTable`).
- **Props Interfaces:** ComponentName + `Props` (e.g., `ButtonProps`, `DialogProps`).
- **Standard Props:**
  - `className?: string`: merged safely using internal `cn()` utility (`clsx` + `tailwind-merge`).
  - `children?: React.ReactNode`: supported on all container components.
  - `variant?: ...`: explicit string union with default fallback.
  - `size?: "xs" | "sm" | "md" | "lg" | "xl"`: standard 5-point scale where applicable.
  - `ref`: all components forward refs with `React.forwardRef` and explicit `displayName`.
  - Polymorphic `as?: ElementType` supported on primitives (`Box`, `Text`, `Heading`).

### 3.2 Inventory Roadmap
```
Layer 4: Primitives
├── Box
├── Flex / Stack
├── Grid
├── Container
├── Text
├── Heading
├── Separator
└── VisuallyHidden

Layer 5: Foundational UI Components
├── Button
├── IconButton
├── Input
├── Textarea
├── Select
├── Checkbox
├── Switch
├── Badge
├── Tooltip
├── Dialog / Modal
├── Drawer
├── Skeleton
├── Spinner
├── EmptyState
└── Avatar

Layer 6: Composable Domain Components
├── GlassPanel (Enhanced)
├── GlassCard (Enhanced)
├── OledBase (Enhanced)
├── ScrubSlider (Enhanced)
├── SpringButton (Enhanced)
├── AppShell (Enhanced with Radix Drawer)
├── Sidebar (Enhanced)
├── FloatingPlayerPill (Enhanced)
├── PlayerBar (Enhanced)
├── HeroCarousel (Enhanced)
├── HeroBannerCard (Enhanced)
├── MediaShelf (Enhanced)
├── MediaCard (Enhanced)
├── PageHeader (Enhanced)
├── TrackRow (Enhanced)
├── TrackTable (Enhanced)
├── SyncedLyricsView (Enhanced)
├── FullImmersionLyrics (Enhanced with Radix Dialog)
├── AmbientAura (Enhanced)
└── SoundWave (Enhanced)
```

---

## 4. Accessibility Strategy (WCAG 2.2 AA)

1. **Overlay Semantics & Focus Management:**
   - Both `FullImmersionLyrics` and the `AppShell` mobile drawer will leverage Radix UI Dialog primitives to guarantee proper `role="dialog"`, `aria-modal="true"`, automatic focus trapping, restore focus on close, and escape key handling.
2. **Focus Visibility:**
   - Standardize a global focus ring: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas`.
3. **Contrast Compliance:**
   - Ensure all text tokens maintain at least 4.5:1 contrast against their designated surface tokens.
4. **Touch Target Sizing:**
   - Interactive elements on mobile viewports must meet or exceed 44x44 CSS pixels (WCAG 2.5.5 / 2.5.8).
5. **Reduced Motion:**
   - Respect `prefers-reduced-motion: reduce` by dampening spring physics and removing looping canvas animations.

---

## 5. Application Integration & Enforcement Strategy

1. **Zero-Bypass Policy:**
   - Application code in `frontend/app/src/app/**` must consume `@mp/dying` components and tokens.
   - Prohibit raw arbitrary Tailwind utility class strings where Dying tokens apply.
2. **Automated Enforcement:**
   - Setup ESLint flat config in `frontend/app/eslint.config.mjs` and root with custom lint rules / restricted imports discouraging bypassing of `@mp/dying`.
   - Implement type-checked imports and build verification in CI.

---

## 6. Compatibility & Regression Prevention Strategy

1. **100% Backward Compatibility:**
   - Existing exports in `@mp/dying` (`GlassPanel`, `GlassCard`, `OledBase`, `ScrubSlider`, `SpringButton`, `AppShell`, `Sidebar`, `FloatingPlayerPill`, `PageHeader`, `HeroCarousel`, `HeroBannerCard`, `MediaShelf`, `MediaCard`, `TrackRow`, `TrackTable`, `SyncedLyricsView`, `FullImmersionLyrics`, `PlayerBar`, `AmbientAura`, `SoundWave`, `cn`, `dyingTokens`, etc.) remain fully exported with identical prop names.
2. **Gradual Migration:**
   - Internal styling refactored without altering public component contracts.
   - Existing consumers (`frontend/app/src/app/page.tsx` and `frontend/app/src/app/dying/page.tsx`) will render without visual breakage.
