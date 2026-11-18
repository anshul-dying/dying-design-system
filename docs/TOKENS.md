# Dying Design Tokens Specification

**Standard:** W3C Design Tokens Community Group (DTCG) Draft Specification  
**Source of Truth:** `packages/dying/src/tokens/tokens.json` & `packages/dying/src/tokens/index.ts`  
**CSS Custom Properties:** `packages/dying/theme.css`  

---

## 1. Token Hierarchy

Tokens are organized into three tiers:
1. **Primitive Tokens (`primitive.*`):** Raw invariant values (hex codes, pixel dimensions, cubic-bezier curves).
2. **Semantic Tokens (`semantic.*`):** Intent-based aliases mapping primitives to UI roles (surfaces, text, borders, actions, feedback).
3. **Component Tokens (`component.*`):** Contextual constraints bounded to specific widgets (playerBar height, sidebar width).

---

## 2. Primitive Color Palette

### 10-Step Monochrome Graphite Scale
| Token | Hex Value | Intended Role |
|---|---|---|
| `primitive.color.graphite-50` | `#f7f7f8` | Light mode canvas / maximum highlight |
| `primitive.color.graphite-100` | `#e5e5ea` | Light mode surface hover |
| `primitive.color.graphite-200` | `#d1d1d6` | Light mode border / disabled text |
| `primitive.color.graphite-300` | `#aeaeb2` | Muted secondary text in light mode |
| `primitive.color.graphite-400` | `#86868b` | Tertiary text, kicker, metadata (Dark mode) |
| `primitive.color.graphite-500` | `#636366` | Mid-tone neutral divider |
| `primitive.color.graphite-600` | `#48484a` | Elevated surface border |
| `primitive.color.graphite-700` | `#2c2c2e` | Active nav pill, pressed button state |
| `primitive.color.graphite-800` | `#1e1e22` | Dark mode surface card fill |
| `primitive.color.graphite-850` | `#18181b` | Recessed container background |
| `primitive.color.graphite-900` | `#141416` | Dark mode canvas background |
| `primitive.color.graphite-950` | `#121214` | Fixed sidebar navigation backdrop |

### Alpha Overlays
| Token | Value | Role |
|---|---|---|
| `primitive.color.white-a4` | `rgba(255, 255, 255, 0.04)` | Ultra-subtle surface tint |
| `primitive.color.white-a8` | `rgba(255, 255, 255, 0.08)` | Standard card and panel border (`border-subtle`) |
| `primitive.color.white-a12` | `rgba(255, 255, 255, 0.12)` | Muted input and card border (`border-muted`) |
| `primitive.color.white-a16` | `rgba(255, 255, 255, 0.16)` | Specular top edge highlight |
| `primitive.color.white-a24` | `rgba(255, 255, 255, 0.24)` | Active focus indicator |
| `primitive.color.white-a40` | `rgba(255, 255, 255, 0.40)` | Focus ring outline (`border-focus`) |
| `primitive.color.black-a75` | `rgba(0, 0, 0, 0.75)` | Modal overlay backdrop |

---

## 3. Semantic Tokens

### Surfaces
```css
--canvas: #141416;          /* bg-canvas */
--sidebar: #121214;         /* bg-sidebar */
--surface: #1e1e22;         /* bg-surface */
--surface-hover: #28282c;   /* bg-surface-hover */
--surface-active: #2c2c2e;  /* bg-surface-active */
--glass-frosted: rgba(30, 30, 34, 0.85); /* bg-glass-frosted */
--glass-elevated: rgba(30, 30, 34, 0.92);
```

### Typography
```css
--text-primary: #ffffff;    /* 18.2:1 AAA Contrast on Canvas */
--text-secondary: #98989d;  /* 5.2:1 AA Contrast on Canvas */
--text-tertiary: #86868b;   /* 4.54:1 AA Contrast on Canvas */
--text-kicker: #86868b;     /* Section kickers and category badges */
--text-inverse: #000000;    /* Text on primary white buttons */
```

### Feedback & Status
```css
--color-status-success: #34d399; /* Emerald 400 */
--color-status-warning: #fbbf24; /* Amber 400 */
--color-status-error: #f43f5e;   /* Rose 500 */
--color-status-info: #38bdf8;    /* Sky 400 */
```

---

## 4. Spacing Scale (4px Baseline Rhythm)

| Token | Dimension | Tailwind Utility |
|---|---|---|
| `space.0` | `0px` | `p-0`, `m-0`, `gap-0` |
| `space.1` | `4px` | `p-1`, `m-1`, `gap-1` |
| `space.2` | `8px` | `p-2`, `m-2`, `gap-2` |
| `space.3` | `12px` | `p-3`, `m-3`, `gap-3` |
| `space.4` | `16px` | `p-4`, `m-4`, `gap-4` |
| `space.5` | `20px` | `p-5`, `m-5`, `gap-5` |
| `space.6` | `24px` | `p-6`, `m-6`, `gap-6` |
| `space.8` | `32px` | `p-8`, `m-8`, `gap-8` |
| `space.10` | `40px` | `p-10`, `m-10`, `gap-10` |
| `space.12` | `48px` | `p-12`, `m-12`, `gap-12` |
| `space.16` | `64px` | `p-16`, `m-16`, `gap-16` |
| `space.20` | `80px` | `p-20`, `m-20`, `gap-20` |
| `space.24` | `96px` | `p-24`, `m-24`, `gap-24` |

---

## 5. Radius Scale

| Token | Dimension | Tailwind Utility |
|---|---|---|
| `radius.none` | `0px` | `rounded-none` |
| `radius.xs` | `4px` | `rounded-xs` |
| `radius.sm` | `6px` | `rounded-sm` |
| `radius.md` | `8px` | `rounded-md` |
| `radius.lg` | `12px` | `rounded-xl` |
| `radius.xl` | `16px` | `rounded-2xl` |
| `radius.2xl` | `20px` | `rounded-3xl` |
| `radius.full` | `9999px` | `rounded-full` |

---

## 6. Motion & Spring Bezier Physics

All UI motion uses natural tactile spring physics curves:
- `--ease-spring-snappy: cubic-bezier(0.19, 1, 0.22, 1);` (buttons, tabs)
- `--ease-spring-smooth: cubic-bezier(0.16, 1, 0.3, 1);` (drawers, dialogs)
- `--ease-spring-tactile: cubic-bezier(0.2, 0.8, 0.2, 1);` (switches, toggles)
- `--ease-spring-bouncy: cubic-bezier(0.34, 1.56, 0.64, 1);` (play/pause pop)
