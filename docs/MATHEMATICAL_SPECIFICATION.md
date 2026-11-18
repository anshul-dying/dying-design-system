# Dying Design System — Mathematical Foundations & Geometric Rigor

**Package:** `@mp/dying`  
**Specification:** M3-Grade Mathematical Rigor for Dark Acrylic UI  
**Standard:** W3C DTCG + CIELAB / HCT Perceptual Physics  
**Author:** Principal UI Architecture & UI Infrastructure Engineering  

---

## 1. Perceptual Color Lightness & Contrast Mathematics

Human vision does not perceive lightness linearly across wavelengths. To guarantee WCAG 2.2 contrast mathematically without trial-and-error, Dying defines the **Monochrome Graphite Scale** using the standard CIE $L^*$ (Perceptual Lightness) function:

$$\text{Tone } T \in [0, 100]$$

$$\text{Relative Luminance } Y = \begin{cases} 
\left(\frac{T + 16}{116}\right)^3 & \text{if } T > 8 \\
\frac{T}{903.3} & \text{if } T \le 8 
\end{cases}$$

### WCAG Contrast Ratio Formula

$$\text{Contrast Ratio } CR(Y_1, Y_2) = \frac{Y_1 + 0.05}{Y_2 + 0.05} \quad (\text{where } Y_1 > Y_2)$$

### Guaranteed Contrast Mapping Matrix

| Token Name | Exact Tone ($T$) | Hex Code | Relative Luminance ($Y$) | Guaranteed CR vs Canvas ($T=8$) | Guaranteed CR vs Tone 100 (`#FFF`) | WCAG Rating |
|---|---|---|---|---|---|---|
| `graphite-0` (OLED) | $T = 0$ | `#000000` | $0.0000$ | $1.20:1$ | **21.00:1** | Theoretical Max |
| `graphite-950` (Sidebar) | $T = 7$ | `#121214` | $0.0077$ | $1.02:1$ | **18.90:1** | AAA Background |
| `graphite-900` (Canvas) | $T = 8$ | `#141416` | $0.0088$ | $1.00:1$ (Base) | **18.20:1** | AAA Canvas |
| `graphite-800` (Surface) | $T = 12$ | `#1e1e22` | $0.0141$ | $1.09:1$ | **16.50:1** | AAA Surface |
| `graphite-700` (Active Pill) | $T = 18$ | `#2c2c2e` | $0.0252$ | $1.27:1$ | **12.40:1** | AAA Active |
| `graphite-500` (Borders) | $T = 40$ | `#636366` | $0.1124$ | $2.75:1$ | **5.20:1** | AA Boundary |
| `graphite-300` (Text Secondary) | $T = 65$ | `#98989d` | $0.3407$ | **6.40:1** | $2.45:1$ | **AA Pass** |
| `graphite-50` (Light Canvas) | $T = 97$ | `#f7f7f8` | $0.9250$ | $16.50:1$ | $1.05:1$ | Light Mode Base |
| `graphite-0` (Text Primary) | $T = 100$ | `#ffffff` | $1.0000$ | **18.20:1** | $1.00:1$ | **AAA Pass** |

> **Theorem (The Contrast Law of Dying):** Any foreground element with Tone $T_{\text{fg}} \ge 65$ placed on a background with Tone $T_{\text{bg}} \le 12$ satisfies:
> $$CR(Y_{\text{fg}}, Y_{\text{bg}}) \ge 6.4:1 > 4.5:1 \quad (\text{WCAG 2.2 AA})$$
> Compliance is guaranteed algebraically.

---

## 2. State Layer Opacity Matrix

Instead of ad-hoc CSS color overrides for hover and pressed states, interactive surfaces apply a mathematical State Layer overlay ($\alpha$):

$$\text{Surface}_{\text{rendered}} = \text{Surface}_{\text{base}} \oplus (\text{Tint} \times \alpha)$$

| Interaction State | Dark Mode Tint | Light Mode Tint | Opacity ($\alpha$) | Transition Duration |
|---|---|---|---|---|
| **Rest** | — | — | $\alpha = 0.00$ | — |
| **Hover** | `rgb(255, 255, 255)` | `rgb(0, 0, 0)` | $\alpha = 0.08$ | $150\text{ms}$ |
| **Focus Visible** | `rgb(255, 255, 255)` | `rgb(0, 0, 0)` | $\alpha = 0.10$ | $100\text{ms}$ |
| **Pressed / Active** | `rgb(255, 255, 255)` | `rgb(0, 0, 0)` | $\alpha = 0.12$ | $100\text{ms}$ |
| **Dragged / Scrubbing**| `rgb(255, 255, 255)` | `rgb(0, 0, 0)` | $\alpha = 0.16$ | Instant |

---

## 3. Tonal Elevation & Shadow Physics

In Dark Mode, black drop shadows are imperceptible against dark canvases. Dying uses dual-channel elevation: surface tone step ($\Delta T$) plus quadratic shadow blur ($B$):

$$\text{Tone}(E) = \text{Tone}_{\text{base}} + \Delta T(E)$$

$$B(E) = 2 \times E^2 + 8 \text{ (px)}$$

$$\text{Specular Inset}(E) = \text{inset } 0\text{px } 1\text{px } 0\text{px } 0\text{px } \text{rgba}(255, 255, 255, 0.08 + 0.02 \times E)$$

| Elevation Level ($E$) | Role | Tone Delta ($\Delta T$) | Effective Tone | Blur Radius ($B$) | Specular Top Inset |
|---|---|---|---|---|---|
| **Level 0** | Canvas Base | $+0$ | $T = 8$ (`#141416`) | $0\text{px}$ | None |
| **Level 1** | Card / Media Shelf | $+4$ | $T = 12$ (`#1e1e22`) | $10\text{px}$ | $0.10$ opacity |
| **Level 2** | Hovered Card / Popover | $+7$ | $T = 15$ (`#242428`) | $16\text{px}$ | $0.12$ opacity |
| **Level 3** | Modal Dialog / Drawer | $+10$ | $T = 18$ (`#28282c`) | $26\text{px}$ | $0.14$ opacity |
| **Level 4** | Floating Player Dock | $+13$ | $T = 21$ (`#2c2c2e`) | $40\text{px}$ | $0.16$ opacity |
| **Level 5** | Context Menu / Tooltip | $+16$ | $T = 24$ (`#38383c`) | $58\text{px}$ | $0.18$ opacity |

---

## 4. The Law of Concentric Nested Radii

To prevent visual "pinch points" and optical distortion when surfaces nest inside containers, inner radii must be strictly concentric:

$$R_{\text{inner}} = \max(0, R_{\text{outer}} - P)$$

Where $R_{\text{outer}}$ is the container radius and $P$ is the padding:

```
┌──────────────────────────────────────────────┐  R_outer = 24px (rounded-3xl)
│  Padding P = 16px                            │
│   ┌──────────────────────────────────────┐   │
│   │ R_inner = 24px - 16px = 8px          │   │  R_inner = 8px (rounded-lg)
│   │ Concentric curves: parallel margins  │   │
│   └──────────────────────────────────────┘   │
└──────────────────────────────────────────────┘
```

---

## 5. Geometric Centering vs. Ad-Hoc Icon Translations

### The "Centroid vs. Bounding Box" Principle
An equilateral triangle has its visual centroid at $\frac{1}{3} h$ from the base. In past naive implementations, developers applied `translate-x-0.5` ($2\text{px}$) to "nudge" the Play icon rightward.

**Why this breaks in interactive UI:**
1. **Asymmetric Toggle:** `Play` has a $+2\text{px}$ offset; `Pause` (two vertical bars) has a $0\text{px}$ offset. When toggling states, the button visibly jumps horizontally.
2. **Off-Axis Rotation:** Any rotation animation around $(x, y)$ rotates around the displaced center, creating wobble.

### The Law of Pure Geometric Centering:
1. Every icon is enclosed in a strict, symmetric bounding box ($W = H$).
2. The center of rotation and scale origin is permanently fixed at $(\frac{W}{2}, \frac{H}{2})$.
3. **Zero manual translation classes (`translate-x-*`) are permitted on SVG icon elements.**
4. State transitions between Play and Pause use **scale and crossfade** on identical bounding boxes:

$$\text{Scale}(t): 0.85 \to 1.00 \quad \text{with } \alpha(t): 0 \to 1$$

---

## 6. Physical Spring Motion (Damped Harmonic Oscillator)

Every dynamic micro-interaction is modeled by the second-order differential equation:

$$m \frac{d^2 x}{dt^2} + c \frac{dx}{dt} + k x = 0$$

$$\zeta = \frac{c}{2 \sqrt{m \cdot k}} \quad (\text{Damping Ratio})$$

$$\omega_n = \sqrt{\frac{k}{m}} \quad (\text{Natural Frequency})$$

| Motion Preset | Mass ($m$) | Stiffness ($k$) | Damping ($c$) | Damping Ratio ($\zeta$) | Feel & Role |
|---|---|---|---|---|---|
| `spring.snappy` | $1.0$ | $450$ | $28$ | $\zeta \approx 0.66$ | Buttons, toggles, play/pause swap (tactile crispness) |
| `spring.smooth` | $1.0$ | $260$ | $26$ | $\zeta \approx 0.81$ | Modal dialogs, slide-out drawer (weighted Apple feel) |
| `spring.bouncy` | $1.0$ | $300$ | $18$ | $\zeta \approx 0.52$ | Badges, liked heart pulse (delightful bounce) |
