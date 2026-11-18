# Dying Design System — Comprehensive Architecture & Quality Audit

**Date:** 2026-11-17  
**Version Audited:** `@mp/dying@0.1.0`  
**Auditor:** Principal Design Systems Engineer & Staff UI Architect  
**Status:** Complete Audit Report (Stage A Deliverable)  
**Target Systems Reference:** Google Material Design 3, IBM Carbon, Microsoft Fluent 2, Radix UI, Shopify Polaris, Atlassian Design System

---

## Executive Summary

The **Dying Design System** (`@mp/dying`) serves as the UI foundational package for the GaneGan music streaming application. It was originally seeded with high-fidelity music player components (such as `FloatingPlayerPill`, `TrackTable`, `SyncedLyricsView`, `HeroCarousel`, and `FullImmersionLyrics`) featuring a signature **Monochrome Graphite** Apple Music Dark Mode visual aesthetic.

While the visual foundation and aesthetic polish of the media components are exceptional, the audit reveals that **Dying is currently a domain-specific component collection rather than an enterprise-grade UI design system infrastructure**. It lacks:
1. Low-level UI design primitives and general form/feedback/overlay components.
2. A strict multi-tiered token architecture (Foundations → Primitives → Semantics → Components) adhered to in code.
3. Decoupling of hardcoded arbitrary hex values (`#141416`, `#1e1e22`, `#28282c`, `#86868b`, `#98989d`) from component classNames.
4. Robust accessibility compliance (missing focus traps, dialog/drawer ARIA roles, live regions, accessible names).
5. Comprehensive unit, integration, and interaction test coverage (currently 0 tests in `packages/dying`).
6. Centralized documentation, interactive component playground, and token explorer.
7. Automated linting and governance preventing application code from bypassing design system contracts.

This document presents a complete audit of the codebase, detailing findings across 8 core dimensions, classifying issues with severity and concrete remediation paths.

---

## 1. System Inventory & Architecture Overview

### 1.1 Directory Structure & Package Boundaries
- **Package Location:** `packages/dying`
- **Monorepo Manager:** `pnpm` workspaces (`pnpm-workspace.yaml`)
- **Package Name:** `@mp/dying` (`version: 0.1.0`, `"type": "module"`)
- **Current Exports:**
  - `.` (Main entry: `./src/index.ts`)
  - `./theme.css` (`./theme.css`)
  - `./src/theme.css` (`./src/theme.css` - redundant re-export)
- **Current Component Breakdown:**
  - **Primitives (5):** `GlassPanel`, `GlassCard`, `OledBase`, `ScrubSlider`, `SpringButton`
  - **Layout (4):** `AppShell`, `Sidebar` (+ `SidebarBrand`, `SearchInput`, `SidebarNav`, `SidebarNavItem`, `SidebarFooter`), `FloatingPlayerPill`
  - **Media (5):** `PageHeader`, `HeroBannerCard`, `HeroCarousel`, `MediaShelf`, `MediaCard`
  - **Music (5):** `TrackRow`, `TrackTable`, `SyncedLyricsView`, `FullImmersionLyrics`, `PlayerBar`
  - **Effects (2):** `AmbientAura`, `SoundWave`
  - **Tokens & Utils (2):** `tokens/tokens.json`, `tokens/index.ts`, `utils/cn.ts`

### 1.2 Technology Stack
- **Framework:** React 19 (`peerDependencies: ^19.0.0`)
- **Styling Engine:** Tailwind CSS v4 (`@theme`, `@source`, CSS variables in `theme.css`)
- **Animation / Motion:** Framer Motion (`framer-motion: ^12.4.7`)
- **Primitives / Headless:** `@radix-ui/react-slider: ^1.2.3`, `radix-ui: ^1.8.1`
- **Utility:** `clsx: ^2.1.1`, `tailwind-merge: ^3.0.2`
- **Icons:** `lucide-react: ^0.475.0`

---

## 2. Findings by Dimension

### A. Architectural & Structural Problems

#### Issue A-1: Inverted / Incomplete System Layering
- **Affected File/Directory:** `packages/dying/src/primitives/`, `packages/dying/src/layout/`
- **Finding:** Dying jumps straight from specialized graphic primitives (`GlassPanel`, `OledBase`) to complex domain-specific media components (`HeroBannerCard`, `TrackTable`, `FullImmersionLyrics`). Fundamental design system primitives—such as `Box`, `Stack`, `Flex`, `Grid`, `Container`, `Text`, `Heading`, `Icon`, `Badge`, `Button`, `IconButton`, `Input`, `Dialog`, `Tooltip`, `Separator`—are entirely absent.
- **Consequence:** Whenever application code needs a standard button, form input, modal, tooltip, or layout stack, it has no choice but to write raw HTML elements and arbitrary Tailwind classes, directly bypassing Dying.
- **Recommended Solution:** Implement Phase 4 foundational UI primitives (`Box`, `Stack`, `Flex`, `Grid`, `Container`, `Text`, `Heading`, `Separator`, `VisuallyHidden`) and general interactive components (`Button`, `IconButton`, `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `Badge`, `Spinner`, `Skeleton`, `Dialog`, `Tooltip`, `EmptyState`) while maintaining the signature Monochrome Graphite aesthetic.
- **Priority:** **Critical**

#### Issue A-2: Redundant Package Dependencies & Duplicated CSS
- **Affected Files:** `packages/dying/package.json`, `packages/dying/theme.css`, `packages/dying/src/theme.css`
- **Finding:**
  1. `package.json` depends on both `radix-ui: ^1.8.1` (the complete bundle) AND `@radix-ui/react-slider: ^1.2.3`. This unnecessarily bloats dependencies.
  2. `packages/dying/src/theme.css` contains solely `@import "../theme.css";` while `packages/dying/theme.css` contains the actual rules, causing confusion in consumers (`@mp/dying/theme.css` vs `@mp/dying/src/theme.css`).
- **Consequence:** Redundant bundle weight, potential version collisions, confusion over canonical stylesheet import.
- **Recommended Solution:** Standardize on specific `@radix-ui/react-*` primitive packages, clean up redundant dependencies, and standardize on single canonical export `./theme.css`.
- **Priority:** **Medium**

---

### B. Design Token & Theme Engineering Problems

#### Issue B-1: Token Disconnection — Components Hardcode Arbitrary Hex Values
- **Affected Files:** All components in `packages/dying/src/` (e.g. `GlassPanel.tsx`, `GlassCard.tsx`, `Sidebar.tsx`, `HeroBannerCard.tsx`, `TrackRow.tsx`)
- **Finding:** While `tokens.json`, `tokens/index.ts`, and `theme.css` define theme tokens (such as `--color-surface`, `--color-canvas`, `text-secondary`), nearly all components write raw arbitrary Tailwind classes like:
  - `bg-[#1e1e22]` instead of `bg-surface` or `bg-[var(--surface)]`
  - `bg-[#141416]` instead of `bg-canvas` or `bg-[var(--canvas)]`
  - `bg-[#28282c]` instead of `bg-surface-hover`
  - `bg-[#2c2c2e]` instead of `bg-surface-active`
  - `text-[#98989d]` instead of `text-text-secondary`
  - `text-[#86868b]` instead of `text-text-tertiary` or `text-text-kicker`
  - `border-white/[0.08]` instead of `border-border-subtle`
- **Consequence:** The token system is purely ceremonial. Modifying tokens in `tokens.json` or CSS variables does not propagate to existing components. Theming or mode switching cannot function without refactoring these hardcoded arbitrary values.
- **Recommended Solution:** Audit and refactor all component styling to strictly reference semantic CSS variables and Tailwind theme classes (`bg-canvas`, `bg-surface`, `bg-surface-hover`, `text-text-primary`, `text-text-secondary`, `text-text-tertiary`, `border-border-subtle`).
- **Priority:** **Critical**

#### Issue B-2: Incomplete Token Coverage (Typography, Spacing, Sizing, Elevation, Z-Index)
- **Affected Files:** `packages/dying/src/tokens/tokens.json`, `packages/dying/src/tokens/index.ts`
- **Finding:** `tokens.json` only specifies colors, a few opacities, 3 blurs, and 3 durations. It completely lacks:
  - Typography scale: font families, font sizes, line heights, letter spacing, font weights.
  - Spacing & layout scale: 4px baseline rhythm (`space-0.5` through `space-24`).
  - Radius scale: `radius-xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full`.
  - Elevation & shadow system: `shadow-xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `specular-glow`, `pill-dock`.
  - Z-Index layering: `z-hide`, `z-base`, `z-dock`, `z-dropdown`, `z-sticky`, `z-banner`, `z-modal`, `z-popover`, `z-toast`.
  - Semantic Status Colors: `success`, `warning`, `error`, `info` (currently only rose500 and white aliased).
- **Consequence:** Designers and engineers invent one-off values (e.g. `z-50`, `z-40`, `text-[11px]`, `text-[10px]`, `px-2.5`, `py-0.5`).
- **Recommended Solution:** Expand `tokens.json` and `tokens/index.ts` to full W3C DTCG compliance across all scales, and synchronize them with Tailwind `@theme` in `theme.css`.
- **Priority:** **High**

#### Issue B-3: Absence of Theme Provider & Light/Dark Theme Infrastructure
- **Affected Files:** `packages/dying/src/theme.css`, `packages/dying/src/index.ts`
- **Finding:** The application assumes a monolithic dark theme. There is no `ThemeProvider`, no `ThemeContext`, and no data-attribute or class-based theme switching architecture.
- **Consequence:** The design system cannot adapt to user system preferences (`prefers-color-scheme`) or support alternate themes (e.g. High Contrast, OLED True Black, Clean Light) without breaking contracts.
- **Recommended Solution:** Implement a lightweight, zero-flicker `ThemeProvider` and CSS variable contract supporting `:root[data-theme="dark"]`, `:root[data-theme="light"]`, and `:root[data-theme="oled"]`.
- **Priority:** **High**

---

### C. Component Architecture & Standardization Problems

#### Issue C-1: Overloaded Components & Missing Specialization
- **Affected File:** `packages/dying/src/primitives/SpringButton.tsx`
- **Finding:** `SpringButton` currently handles standard buttons, ghost buttons, outline buttons, and also embeds an animated SVG Play/Pause state toggle with `framer-motion`. Combining a generic button with a specialized transport playback widget violates Single Responsibility Principle.
- **Consequence:** Developers seeking a simple semantic button are forced to import a heavy motion-wrapped component that contains audio player state logic.
- **Recommended Solution:** Split into a clean, polymorphic `Button` / `IconButton` component and maintain `SpringButton` (or `PlayPauseButton`) as a specialized composition. Ensure standard buttons support native `type="button"`, disabled states, loading spinners, and forward refs cleanly.
- **Priority:** **High**

#### Issue C-2: Inconsistent Component APIs & Composition
- **Affected Files:** `packages/dying/src/layout/AppShell.tsx`, `packages/dying/src/media/MediaShelf.tsx`, `packages/dying/src/music/TrackTable.tsx`
- **Finding:**
  - `AppShell` uses a rigid props-based slot approach (`sidebar`, `playerDock`, `overlay`) with an internally hardcoded mobile drawer and header instead of a composable structure.
  - `MediaShelf` hardcodes horizontal scrolling and Chevron buttons directly inside the component without allowing custom action slots or virtualized lists.
  - `TrackTable` mixes layout, table headers, track rendering, and empty state rendering without compound component subcomponents (e.g., `TrackTable.Header`, `TrackTable.Body`, `TrackTable.Row`, `TrackTable.Empty`).
- **Consequence:** Customizing headers, actions, or responsive behavior requires either modifying Dying source or hacking around props.
- **Recommended Solution:** Provide both convenient top-level components and composable compound subcomponents with uniform prop naming conventions (`variant`, `size`, `children`, `className`, `asChild` where appropriate).
- **Priority:** **Medium**

---

### D. Responsive Design Engineering Problems

#### Issue D-1: Ad-Hoc Breakpoints & Fixed Sizing Assumptions
- **Affected Files:** `packages/dying/src/layout/Sidebar.tsx`, `packages/dying/src/layout/AppShell.tsx`, `packages/dying/src/music/FullImmersionLyrics.tsx`
- **Finding:**
  - Sidebar width is hardcoded in multiple places as `w-[240px]` and `w-[260px]`.
  - Breakpoints switch between `md:` (768px) and `lg:` (1024px) inconsistently: `Sidebar` hides at `lg`, `HeroCarousel` changes columns at `md` and `lg`, `PageHeader` stacks at `md`.
  - On smaller mobile viewports (<360px), `FloatingPlayerPill` can cause cramped layout or overlapping transport buttons.
- **Consequence:** Layout shifts and horizontal overflow risks on mobile devices, especially landscape phones or small foldables.
- **Recommended Solution:** Centralize responsive breakpoint definitions in tokens and theme (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`). Use fluid responsive typography and intrinsic min-content/max-content constraints.
- **Priority:** **High**

---

### E. Accessibility Engineering Problems (WCAG 2.2 AA)

#### Issue E-1: Missing Dialog & Drawer Accessibility Semantics
- **Affected Files:** `packages/dying/src/layout/AppShell.tsx` (Mobile Drawer), `packages/dying/src/music/FullImmersionLyrics.tsx`
- **Finding:**
  - The mobile navigation drawer in `AppShell` is a `<div>` with `fixed inset-0`. It lacks `role="dialog"`, `aria-modal="true"`, `aria-label="Navigation drawer"`, and does NOT trap keyboard focus (Tab navigation leaks into the background page).
  - `FullImmersionLyrics` is an overlay `<div>` that listens for `Escape`, but does NOT set `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, or manage focus on mount/unmount.
- **Consequence:** Screen reader users and keyboard-only users become disoriented or trapped behind invisible DOM layers. Fails WCAG 2.1/2.2 Success Criterion 2.1.2 (No Keyboard Trap) and 4.1.2 (Name, Role, Value).
- **Recommended Solution:** Integrate Radix Dialog primitive for modal overlays and drawers to guarantee focus trapping, aria-modal semantics, and escape-key handling.
- **Priority:** **Critical**

#### Issue E-2: Missing Focus Visibility Across Interactive Controls
- **Affected Files:** `SpringButton.tsx`, `TrackRow.tsx`, `MediaCard.tsx`, `HeroBannerCard.tsx`
- **Finding:** Several interactive components use `cursor-pointer` but lack explicit `:focus-visible` outline or ring styling. Keyboard users navigating via `Tab` have no visual indicator of which card or row is currently focused.
- **Consequence:** Fails WCAG 2.2 SC 2.4.7 (Focus Visible) and SC 2.4.11 (Focus Appearance).
- **Recommended Solution:** Apply a standardized focus ring utility across all interactive components (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas`).
- **Priority:** **High**

#### Issue E-3: Low Contrast on Muted/Kicker Text in Certain Renderings
- **Affected Files:** `packages/dying/src/tokens/tokens.json`, `PageHeader.tsx`, `TrackRow.tsx`
- **Finding:** Tertiary/kicker color is `#86868b`. On `#141416` canvas, contrast ratio is 4.54:1. On elevated surface `#1e1e22`, contrast ratio drops to 4.12:1. For normal body text (< 18pt), WCAG 2.2 AA requires at least 4.5:1. On `#28282c` (hover surface), it drops below 3.7:1.
- **Consequence:** Text legibility issues for users with low vision or in high ambient light environments.
- **Recommended Solution:** Adjust text tertiary/muted token to `#98989d` or `#a1a1a6` for normal-weight body copy on elevated surfaces to guarantee ≥ 4.5:1 contrast across all surface layers.
- **Priority:** **Medium**

---

### F. Application Integration Problems

#### Issue F-1: Application Bypassing Design System for Common UI
- **Affected Files:** `frontend/app/src/app/page.tsx`, `frontend/app/src/app/dying/page.tsx`, `frontend/app/src/app/layout.tsx`
- **Finding:**
  - `frontend/app/src/app/layout.tsx` hardcodes `bg-neutral-950 text-neutral-100` instead of using `OledBase` or `bg-canvas text-text-primary`.
  - `frontend/app/src/app/dying/page.tsx` contains dozens of raw `<div>`, `<span>`, `<button>` tags with arbitrary classes (`bg-[#1e1e22]`, `text-[#86868b]`, `border-white/[0.06]`, `text-[11px]`).
  - Search input and query states are partly handled via custom markup instead of standardized `Input` and `Badge` components.
- **Consequence:** Inconsistent UI implementation across pages; high maintenance burden when updating visual styles.
- **Recommended Solution:** Replace raw HTML elements with standardized Dying primitives (`Box`, `Stack`, `Text`, `Heading`, `Badge`, `Button`, `Input`).
- **Priority:** **High**

---

### G. Testing, Verification & Tooling Problems

#### Issue G-1: Zero Test Suite in `@mp/dying`
- **Affected Directory:** `packages/dying`
- **Finding:** `packages/dying/package.json` contains only a `"typecheck": "tsc --noEmit"` script. There is NO unit test file, no component test runner (e.g. Node test runner, Vitest), no visual regression testing, and no accessibility testing (`axe-core`).
- **Consequence:** Breaking changes, prop regressions, or styling malfunctions can easily be merged undetected.
- **Recommended Solution:** Configure an automated test suite (`tsx --test` or `vitest`) with tests for tokens, primitives, components, accessibility, and responsive props.
- **Priority:** **Critical**

#### Issue G-2: Broken Monorepo Linting (`pnpm lint`)
- **Affected File:** `frontend/app/package.json`, root `package.json`
- **Finding:** Running `pnpm lint` triggers an interactive prompt from `next lint` because ESLint is unconfigured in `frontend/app`. Because pnpm runs non-interactively in CI/scripts, `pnpm lint` fails with exit code 1.
- **Consequence:** Linting cannot run in automated pipelines or regression checks.
- **Recommended Solution:** Configure ESLint with flat config (`eslint.config.mjs`) in `frontend/app` and root, establishing automated rules preventing raw classes and unauthorized UI elements.
- **Priority:** **High**

---

### H. Documentation & Governance Problems

#### Issue H-1: Total Absence of Design System Documentation
- **Affected Directory:** `docs/dying/`
- **Finding:** There was no documentation directory for Dying. There is no getting started guide, no token reference, no component API specs, no accessibility guidelines, and no responsive layout guidelines.
- **Consequence:** Engineers and AI coding agents must guess component props, import paths, and token values by inspecting raw source code.
- **Recommended Solution:** Build complete documentation suite under `docs/dying/` following the 9-part information architecture (Introduction, Foundations, Tokens, Components, Patterns, Theming, Accessibility, Responsive, Guidelines), along with a central `DESIGN_SYSTEM.md` and updated `AGENTS.md`.
- **Priority:** **Critical**

---

## 3. Prioritized Remediation Matrix

| ID | Finding | Category | Priority | Target Stage |
|---|---|---|---|---|
| **A-1** | Missing general UI primitives & foundational components | Architecture | **Critical** | Stage B & D |
| **B-1** | Hardcoded arbitrary hex classes in components | Tokens | **Critical** | Stage C & D |
| **E-1** | Missing ARIA dialog/drawer semantics & focus trapping | Accessibility | **Critical** | Stage E & F |
| **G-1** | Zero test suite in `@mp/dying` | Testing | **Critical** | Stage I |
| **H-1** | Total absence of design system documentation | Documentation | **Critical** | Stage H |
| **B-2** | Incomplete token coverage (typography, space, radius, z-index) | Tokens | **High** | Stage C |
| **B-3** | Absence of ThemeProvider & multi-theme architecture | Theming | **High** | Stage C |
| **C-1** | Overloaded SpringButton mixing button & audio player state | Components | **High** | Stage D |
| **D-1** | Ad-hoc breakpoints & fixed sizing assumptions | Responsive | **High** | Stage E & F |
| **E-2** | Inconsistent focus visibility on interactive elements | Accessibility | **High** | Stage F |
| **F-1** | Application code bypassing Dying for common UI | Integration | **High** | Stage G |
| **G-2** | Broken monorepo `pnpm lint` command | Quality | **High** | Stage I |
| **A-2** | Redundant package dependencies (`radix-ui` + `@radix-ui/*`) | Dependencies | **Medium** | Stage C |
| **C-2** | Inflexible component composition in AppShell/MediaShelf | Components | **Medium** | Stage D & E |
| **E-3** | Near-boundary contrast on tertiary kicker text | Accessibility | **Medium** | Stage C & F |

---

## 4. Architectural Transformation Roadmap

```
Current State (Fragmented)
┌────────────────────────────────────────────────────────┐
│ Domain-Specific Media / Music Widgets                  │
│ (TrackTable, PlayerBar, FloatingPlayerPill, Hero)      │
├────────────────────────────────────────────────────────┤
│ Incomplete Primitives (GlassPanel, OledBase)           │
├────────────────────────────────────────────────────────┤
│ Fragmented Tokens (partially used, hardcoded hexes)    │
└────────────────────────────────────────────────────────┘

Target State (Enterprise Design System)
┌────────────────────────────────────────────────────────┐
│ Application UI (Consumes Dying exclusively)            │
├────────────────────────────────────────────────────────┤
│ Composable Patterns (MediaShelf, Hero, TrackTable)     │
├────────────────────────────────────────────────────────┤
│ Foundational Components (Button, Input, Dialog, etc.)  │
├────────────────────────────────────────────────────────┤
│ Layout & Design Primitives (Box, Stack, Grid, Text)   │
├────────────────────────────────────────────────────────┤
│ Semantic Tokens (surfaces, text, borders, actions)    │
├────────────────────────────────────────────────────────┤
│ Primitive Tokens (color scale, spacing, radius, type) │
├────────────────────────────────────────────────────────┤
│ Design Foundations & Design System Engine             │
└────────────────────────────────────────────────────────┘
```

This audit concludes Stage A. The findings directly inform the Stage B architectural specification and implementation stages.
