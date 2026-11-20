import { type TrackData, type LyricLine } from '@mp/dying';

export const SAMPLE_LYRICS: LyricLine[] = [
  { time: 0, text: '♪ (Acoustic Prelude & Subdued Vinyl) ♪' },
  { time: 6, text: 'Looking through the dark acrylic glass tonight' },
  { time: 12, text: 'Monochrome Graphite tones in high-contrast light' },
  { time: 18, text: 'Zero latency in the stream of audio waves' },
  { time: 24, text: 'Every byte streaming with the precision sound craves' },
  { time: 30, text: 'Pure deep matte canvas beneath our feet' },
  { time: 36, text: 'Tactile spring physics in every beat' },
  { time: 44, text: 'GaneGan audio playing endlessly' },
  { time: 52, text: '♪ (Outro fades into ambient silence) ♪' },
];

export const SHOWCASE_TRACKS: TrackData[] = [
  {
    id: 'demo-1',
    title: 'Midnight in Tokyo',
    artist: 'Komorebi & ChilledCat',
    album: 'Tokyo Drift Sessions',
    duration: 184,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=80',
    isLiked: true,
  },
  {
    id: 'demo-2',
    title: 'Cybernetic Skyline',
    artist: 'Vector Graphics',
    album: 'Monochrome Horizon',
    duration: 236,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&auto=format&fit=crop&q=80',
    isLiked: false,
  },
  {
    id: 'demo-3',
    title: 'Weightless Dreams',
    artist: 'Ethereal Orchestra',
    album: 'Graphite Architecture Vol. 1',
    duration: 298,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80',
    isLiked: false,
  },
];

export const GRAPHITE_SWATCHES = [
  { name: 'Pure OLED Black', hex: '#000000', tone: 0, role: 'True OLED background', token: '--color-graphite-0' },
  { name: 'Sidebar Dark', hex: '#121214', tone: 7, role: 'Navigation backdrop', token: '--color-graphite-950' },
  { name: 'Canvas Base', hex: '#141416', tone: 8, role: 'App foundation base', token: '--color-canvas' },
  { name: 'Surface Card', hex: '#1e1e22', tone: 12, role: 'Cards and panels', token: '--color-surface' },
  { name: 'Hover Highlight', hex: '#28282c', tone: 16, role: 'Row & card hover', token: '--color-surface-hover' },
  { name: 'Active Nav Pill', hex: '#2c2c2e', tone: 18, role: 'Active tabs & buttons', token: '--color-surface-active' },
  { name: 'Muted Seams', hex: '#636366', tone: 40, role: 'Borders & dividers', token: '--color-graphite-500' },
  { name: 'Secondary Text', hex: '#98989d', tone: 65, role: 'Captions & artists', token: '--color-text-secondary' },
  { name: 'Light Surface', hex: '#f7f7f8', tone: 97, role: 'Light mode canvas', token: '--color-graphite-50' },
  { name: 'Primary Text', hex: '#ffffff', tone: 100, role: 'Headings & titles', token: '--color-text-primary' },
];

export const CHECKLIST_ITEMS = [
  { id: 1, category: 'foundations', title: 'Design Principles', status: 'COMPLETE', summary: 'High-density clarity, acoustic immersion, and strict token authority.', link: '/docs/dying/ARCHITECTURE.md' },
  { id: 2, category: 'foundations', title: 'Brand Identity', status: 'COMPLETE', summary: 'Monochrome Graphite palette and Apple Music Dark Mode aesthetics.', link: '/docs/dying/DESIGN_SYSTEM.md' },
  { id: 3, category: 'foundations', title: 'Color Palette & Theming', status: 'COMPLETE', summary: '10-step scale, semantic mappings, dark/light/oled multi-theme provider.', link: '/docs/dying/TOKENS.md' },
  { id: 4, category: 'foundations', title: 'Typography', status: 'COMPLETE', summary: 'System SF Pro / Inter font stack, 8-step scale, tabular figures for audio.', link: '/docs/dying/TOKENS.md' },
  { id: 5, category: 'foundations', title: 'Spacing & Layout', status: 'COMPLETE', summary: 'Strict 4px baseline scale, Box, Stack, Flex, Grid, Container primitives.', link: '/docs/dying/ARCHITECTURE.md' },
  { id: 6, category: 'foundations', title: 'Design Tokens (W3C DTCG)', status: 'COMPLETE', summary: 'Structured with $value/$type keys across colors, spaces, and elevations.', link: '/packages/dying/src/tokens/tokens.json' },
  { id: 7, category: 'components', title: 'Component Library (42 Components)', status: 'COMPLETE', summary: 'Complete catalog of buttons, inputs, dialogs, cards, and music primitives.', link: '/docs/dying/COMPONENTS.md' },
  { id: 8, category: 'components', title: 'Icon System', status: 'COMPLETE', summary: 'Lucide React standard, explicit IconButton with mandatory aria-label.', link: '/docs/dying/COMPONENTS.md' },
  { id: 9, category: 'components', title: 'Illustrations & Shaders', status: 'COMPLETE', summary: 'GPU-accelerated AmbientAura, noise grain filters, and empty state surfaces.', link: '/docs/dying/COMPONENTS.md' },
  { id: 10, category: 'components', title: 'Data Visualization (Audio)', status: 'COMPLETE', summary: 'Live SoundWave, continuous ScrubSlider, and buffered stream meters.', link: '/docs/dying/COMPONENTS.md' },
  { id: 11, category: 'components', title: 'Navigation Patterns', status: 'COMPLETE', summary: 'Desktop Sidebar, Radix-powered mobile slide-out drawer, FloatingPlayerPill.', link: '/docs/dying/COMPONENTS.md' },
  { id: 12, category: 'quality', title: 'Interaction States', status: 'COMPLETE', summary: 'Mathematical state layers: rest, hover, active, focus-visible, and disabled.', link: '/docs/dying/MATHEMATICAL_SPECIFICATION.md' },
  { id: 13, category: 'quality', title: 'Responsive Design', status: 'COMPLETE', summary: 'Automated Playwright tests verifying Mobile, Tablet, Laptop, and Desktop.', link: '/frontend/app/e2e/visual-regression.spec.ts' },
  { id: 14, category: 'quality', title: 'Accessibility (WCAG 2.2 AA)', status: 'COMPLETE', summary: '18.2:1 AAA contrast, focus-visible rings, Radix keyboard focus traps.', link: '/docs/dying/FINAL_VERIFICATION.md' },
  { id: 15, category: 'quality', title: 'Forms & Validation', status: 'COMPLETE', summary: 'FormField linking labels and inputs via htmlFor with aria-describedby errors.', link: '/docs/dying/COMPONENTS.md' },
  { id: 16, category: 'quality', title: 'Motion & Animation Physics', status: 'COMPLETE', summary: 'Damped harmonic spring oscillators and prefers-reduced-motion safety.', link: '/docs/dying/MATHEMATICAL_SPECIFICATION.md' },
  { id: 17, category: 'governance', title: 'Content & Writing Guidelines', status: 'COMPLETE', summary: 'Standardized casing, kicker styling, diagnostic error copywriting.', link: '/docs/dying/DEVELOPER_GUIDELINES.md' },
  { id: 18, category: 'governance', title: 'Patterns & Templates', status: 'COMPLETE', summary: 'AppShell, streaming album hero banners, and immersive lyric modals.', link: '/docs/dying/ARCHITECTURE.md' },
  { id: 19, category: 'governance', title: 'Documentation & API Catalog', status: 'COMPLETE', summary: '7 comprehensive markdown guides and live interactive component portal.', link: '/docs/dying/' },
  { id: 20, category: 'governance', title: 'Developer Handoff & AST Rules', status: 'COMPLETE', summary: 'Strict ESLint rules prohibiting raw HTML, arbitrary hexes, and inline styles.', link: '/AGENTS.md' },
];

export function toneToLuminance(t: number): number {
  if (t > 8) {
    return Math.pow((t + 16) / 116, 3);
  }
  return t / 903.3;
}

export function calculateContrast(toneA: number, toneB: number): number {
  const y1 = toneToLuminance(toneA);
  const y2 = toneToLuminance(toneB);
  const lighter = Math.max(y1, y2);
  const darker = Math.min(y1, y2);
  return (lighter + 0.05) / (darker + 0.05);
}
