'use client';

import React, { useState, useEffect, Suspense } from 'react';
// Standalone showcase for GitHub Pages
import { Github } from 'lucide-react';
import {
  ArrowLeft,
  Music,
  Disc,
  Maximize2,
  Moon,
  Sun,
  Play,
  Heart,
  Search,
  Bell,
  CheckCircle2,
  HelpCircle,
  Calculator,
  Compass,
  CheckSquare,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  OledBase,
  GlassPanel,
  TrackTable,
  FloatingPlayerPill,
  FullImmersionLyrics,
  type TrackData,
  type LyricLine,
  Box,
  Flex,
  Stack,
  Grid,
  Text,
  Heading,
  Separator,
  Button,
  IconButton,
  ButtonGroup,
  Badge,
  Alert,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Textarea,
  Select,
  Checkbox,
  Switch,
  FormField,
  Tooltip,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  SpringButton,
  SoundWave,
  HeroBannerCard,
  MediaShelf,
  MediaCard,
} from '../src';
import { MathView } from './MathView';

// ==========================================
// 1. MOCK DATA
// ==========================================

const SAMPLE_LYRICS: LyricLine[] = [
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

const SHOWCASE_TRACKS: TrackData[] = [
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

const GRAPHITE_SWATCHES = [
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

const CHECKLIST_ITEMS = [
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

// ==========================================
// 2. MATHEMATICAL HELPER FUNCTIONS
// ==========================================

function toneToLuminance(t: number): number {
  if (t > 8) {
    return Math.pow((t + 16) / 116, 3);
  }
  return t / 903.3;
}

function calculateContrast(toneA: number, toneB: number): number {
  const y1 = toneToLuminance(toneA);
  const y2 = toneToLuminance(toneB);
  const lighter = Math.max(y1, y2);
  const darker = Math.min(y1, y2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ==========================================
// 3. MAIN COMPONENT IMPLEMENTATION
// ==========================================

function DyingPortalContent() {
  // Tab state synced with URL search params
  const validTabs = ['components', 'math', 'tokens', 'checklist', 'audio'];
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam && validTabs.includes(tabParam)) return tabParam;
    }
    return 'components';
  });

  // Audio & transport playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(45);
  const [currentTrackId, setCurrentTrackId] = useState<string>('demo-1');
  const [isLyricsOpen, setIsLyricsOpen] = useState<boolean>(false);

  // Component states
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'oled' | 'light'>('dark');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [formInputValue, setFormInputValue] = useState<string>('');

  // Interactive Math Simulators State
  const [contrastSurfaceTone, setContrastSurfaceTone] = useState<number>(8); // Canvas Tone 8
  const [contrastTextTone, setContrastTextTone] = useState<number>(100); // Primary Text Tone 100
  const [outerRadius, setOuterRadius] = useState<number>(24);
  const [outerPadding, setOuterPadding] = useState<number>(16);
  const [springStiffness, setSpringStiffness] = useState<number>(450);
  const [springDamping, setSpringDamping] = useState<number>(28);
  const [springPulseKey, setSpringPulseKey] = useState<number>(0);
  const [stateLayerDemo, setStateLayerDemo] = useState<'rest' | 'hover' | 'focus' | 'pressed' | 'dragged'>('rest');

  // Checklist Filter State
  const [checklistFilter, setChecklistFilter] = useState<'all' | 'foundations' | 'components' | 'quality' | 'governance'>('all');
  const [expandedChecklistItems, setExpandedChecklistItems] = useState<Set<number>>(new Set([1, 7, 14, 20]));

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tab);
      window.history.replaceState(null, '', url.toString());
    }
  };

  const toggleChecklistItem = (id: number) => {
    setExpandedChecklistItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Keep time ticker active when simulated audio plays
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => (prev >= 184 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleThemeChange = (newTheme: 'dark' | 'oled' | 'light') => {
    setCurrentTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  // Math calculated values
  const liveContrast = calculateContrast(contrastSurfaceTone, contrastTextTone);
  const innerRadius = Math.max(0, outerRadius - outerPadding);
  const dampingRatio = springDamping / (2 * Math.sqrt(1.0 * springStiffness));

  const currentTrack = SHOWCASE_TRACKS.find((t) => t.id === currentTrackId) || SHOWCASE_TRACKS[0];

  const filteredChecklist = CHECKLIST_ITEMS.filter((item) => {
    if (checklistFilter === 'all') return true;
    return item.category === checklistFilter;
  });

  return (
    <OledBase grain={true}>
      {/* Top Header Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-canvas/80 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/anshul-dying/dying-design-system"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-white transition-colors p-2 rounded-lg hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              <Github size={16} />
              <span>GitHub Repository</span>
            </a>
            <Separator orientation="vertical" className="h-4 hidden sm:block" />
            <Badge variant="accent" size="sm">DYING v2.0</Badge>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-text-tertiary hidden sm:inline">Theme:</span>
            <div className="flex rounded-lg border border-border-subtle bg-surface p-0.5">
              <Button
                variant={currentTheme === 'dark' ? 'primary' : 'ghost'}
                size="xs"
                onClick={() => handleThemeChange('dark')}
                leftIcon={<Moon size={13} />}
                className="h-7 px-2"
                aria-label="Switch to Dark theme"
              >
                <span className="hidden sm:inline">Dark</span>
              </Button>
              <Button
                variant={currentTheme === 'oled' ? 'primary' : 'ghost'}
                size="xs"
                onClick={() => handleThemeChange('oled')}
                leftIcon={<Disc size={13} />}
                className="h-7 px-2"
                aria-label="Switch to OLED theme"
              >
                <span className="hidden sm:inline">OLED</span>
              </Button>
              <Button
                variant={currentTheme === 'light' ? 'primary' : 'ghost'}
                size="xs"
                onClick={() => handleThemeChange('light')}
                leftIcon={<Sun size={13} />}
                className="h-7 px-2"
                aria-label="Switch to Light theme"
              >
                <span className="hidden sm:inline">Light</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Enterprise Portal Tabs */}
        <div className="border-t border-border-subtle/50 bg-surface/40 px-4 sm:px-8">
          <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto py-2 no-scrollbar">
            <Button
              variant={activeTab === 'components' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handleTabChange('components')}
              leftIcon={<Layers size={14} />}
            >
              Components & Primitives
            </Button>
            <Button
              variant={activeTab === 'math' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handleTabChange('math')}
              leftIcon={<Calculator size={14} />}
            >
              Mathematical Rigor & Physics
            </Button>
            <Button
              variant={activeTab === 'tokens' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handleTabChange('tokens')}
              leftIcon={<Compass size={14} />}
            >
              Design Tokens & DTCG
            </Button>
            <Button
              variant={activeTab === 'checklist' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handleTabChange('checklist')}
              leftIcon={<CheckSquare size={14} />}
            >
              20-Point Checklist Audit
            </Button>
            <Button
              variant={activeTab === 'audio' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handleTabChange('audio')}
              leftIcon={<Music size={14} />}
            >
              Audio Domain Patterns
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-8 space-y-12">
        {/* Hero Section */}
        <section className="flex flex-col gap-3 border-b border-border-subtle pb-8">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-status-success" />
            <Text variant="kicker" size="xs">Dying Design System 2.0</Text>
          </div>
          <Heading level={1} size="h1">
            Enterprise Design System Portal
          </Heading>
          <Text variant="secondary" size="base" className="max-w-3xl leading-relaxed">
            The authoritative single source of truth for UI engineering, W3C DTCG tokens,
            CIELAB perceptual lightness math, and Apple Music Dark Mode aesthetics.
          </Text>
        </section>

        {/* TAB 1: COMPONENTS & PRIMITIVES */}
        {activeTab === 'components' && (
          <div className="space-y-16">
            {/* Primitives Section */}
            <section className="space-y-6">
              <div className="flex flex-col gap-1">
                <Text variant="kicker" size="xs">Foundations · Layer 4</Text>
                <Heading level={2} size="h2">Layout & Typography Primitives</Heading>
                <Text variant="secondary" size="sm">
                  Low-level structural primitives enforcing zero-margin component encapsulation.
                </Text>
              </div>

              <Grid cols={3} gap="4">
                <Card variant="glass" className="p-4">
                  <Heading level={4} size="h4" className="mb-2">Stack & Flex</Heading>
                  <Stack gap="2">
                    <Box className="bg-surface-active p-2 rounded-lg text-xs font-mono">Stack Item 1 (gap-2)</Box>
                    <Box className="bg-surface-active p-2 rounded-lg text-xs font-mono">Stack Item 2 (gap-2)</Box>
                  </Stack>
                </Card>

                <Card variant="glass" className="p-4">
                  <Heading level={4} size="h4" className="mb-2">Typography Matrix</Heading>
                  <Stack gap="1">
                    <Text variant="primary" size="sm" weight="semibold">Primary Heading Text</Text>
                    <Text variant="secondary" size="xs">Secondary Subtitle Text</Text>
                    <Text variant="kicker" size="xs">KICKER LABEL</Text>
                  </Stack>
                </Card>

                <Card variant="glass" className="p-4">
                  <Heading level={4} size="h4" className="mb-2">Separators</Heading>
                  <Text variant="secondary" size="xs" className="mb-2">Accessible Radix Separator</Text>
                  <Separator orientation="horizontal" className="my-2" />
                  <Flex justify="between" className="text-xs text-text-tertiary">
                    <span>Left Section</span>
                    <span>Right Section</span>
                  </Flex>
                </Card>
              </Grid>
            </section>

            {/* Buttons Matrix */}
            <section className="space-y-6">
              <div className="flex flex-col gap-1">
                <Text variant="kicker" size="xs">Components · Actions</Text>
                <Heading level={2} size="h2">Actions: Button & IconButton Matrix</Heading>
                <Text variant="secondary" size="sm">
                  Tactile action triggers with strict 44×44px touch targets and accessible focus rings.
                </Text>
              </div>

              <Grid cols={2} gap="6">
                <Card variant="glass">
                  <CardHeader>
                    <CardTitle>Button Variants</CardTitle>
                    <CardDescription>7 standardized visual weights for user actions.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Flex gap="3" wrap="wrap">
                      <Button variant="primary">Primary Action</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="glass">Glass Acrylic</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="danger">Danger</Button>
                      <Button variant="pill">Pill</Button>
                    </Flex>

                    <Separator orientation="horizontal" className="my-3" />

                    <Flex gap="3" align="center" wrap="wrap">
                      <Button variant="primary" size="xs">XS</Button>
                      <Button variant="primary" size="sm">SM</Button>
                      <Button variant="primary" size="md">MD (Default)</Button>
                      <Button variant="primary" size="lg">LG</Button>
                    </Flex>

                    <Flex gap="3" align="center">
                      <Button variant="glass" isLoading loadingText="Streaming...">Submit</Button>
                      <Button variant="primary" disabled>Disabled</Button>
                    </Flex>
                  </CardContent>
                </Card>

                <Card variant="glass">
                  <CardHeader>
                    <CardTitle>IconButton & ButtonGroup</CardTitle>
                    <CardDescription>Accessible icon controls with required aria-label.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Flex gap="3" align="center">
                      <IconButton icon={<Play size={16} />} aria-label="Play track" variant="primary" shape="circle" />
                      <IconButton icon={<Heart size={16} />} aria-label="Add to favorites" variant="glass" />
                      <IconButton icon={<Bell size={16} />} aria-label="Notifications" variant="ghost" />
                      <IconButton icon={<Search size={16} />} aria-label="Search" variant="secondary" />
                    </Flex>

                    <Separator orientation="horizontal" className="my-3" />

                    <Text variant="kicker" size="xs">Attached Button Groups</Text>
                    <ButtonGroup attached>
                      <Button size="sm">Day</Button>
                      <Button size="sm">Week</Button>
                      <Button size="sm">Month</Button>
                      <Button size="sm">Year</Button>
                    </ButtonGroup>
                  </CardContent>
                </Card>
              </Grid>
            </section>

            {/* Form Controls */}
            <section className="space-y-6">
              <div className="flex flex-col gap-1">
                <Text variant="kicker" size="xs">Components · Forms</Text>
                <Heading level={2} size="h2">Form Controls & Inputs</Heading>
                <Text variant="secondary" size="sm">
                  Accessible form controls with integrated error messages and ARIA relations.
                </Text>
              </div>

              <Grid cols={2} gap="6">
                <Card variant="glass">
                  <CardHeader>
                    <CardTitle>Text Inputs</CardTitle>
                    <CardDescription>Inputs with icon slots and error states.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField label="Track Title" id="title-input" required helperText="Provide track name">
                      <Input
                        id="title-input"
                        placeholder="e.g. Midnight Horizon"
                        value={formInputValue}
                        onChange={(e) => setFormInputValue(e.target.value)}
                        leftIcon={<Music size={16} />}
                      />
                    </FormField>

                    <FormField label="Genre Selection" id="genre-select">
                      <Select id="genre-select">
                        <option value="ambient">Ambient Lo-Fi</option>
                        <option value="classical">Classical Essentials</option>
                        <option value="electronic">Electronic & Synthwave</option>
                      </Select>
                    </FormField>

                    <FormField label="Album Notes" id="notes-textarea">
                      <Textarea id="notes-textarea" placeholder="Enter liner notes, credits, or specifications..." />
                    </FormField>
                  </CardContent>
                </Card>

                <Card variant="glass">
                  <CardHeader>
                    <CardTitle>Selection Controls & Toggles</CardTitle>
                    <CardDescription>Radix-backed checkboxes and tactile spring switches.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Switch label="Lossless Audio Streaming" checked={true} />
                    <Switch label="Sound Check Volume Normalization" checked={false} />
                    <Checkbox label="High-Resolution 24-bit 96kHz DAC Output" checked={true} />
                    <Checkbox label="Offline Cache Encryption" checked={true} />
                  </CardContent>
                </Card>
              </Grid>
            </section>

            {/* Feedback & Overlays */}
            <section className="space-y-6">
              <div className="flex flex-col gap-1">
                <Text variant="kicker" size="xs">Components · Overlays</Text>
                <Heading level={2} size="h2">Feedback, Badges & Accessible Modals</Heading>
                <Text variant="secondary" size="sm">
                  Status indicators, banners, and Radix-backed focus-trapped dialogs.
                </Text>
              </div>

              <Grid cols={2} gap="6">
                <Card variant="glass">
                  <CardHeader>
                    <CardTitle>Status Badges & Alerts</CardTitle>
                    <CardDescription>Semantic metadata tags and alert notifications.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Flex gap="2" wrap="wrap">
                      <Badge variant="accent">LOSSLESS</Badge>
                      <Badge variant="success" dot={true}>Synced</Badge>
                      <Badge variant="warning">Buffering</Badge>
                      <Badge variant="error">Offline</Badge>
                      <Badge variant="glass">OLED Mode</Badge>
                    </Flex>

                    <Alert
                      variant="info"
                      title="Spatial Audio Available"
                    >
                      This recording has been mastered for Dolby Atmos immersive playback.
                    </Alert>
                  </CardContent>
                </Card>

                <Card variant="glass">
                  <CardHeader>
                    <CardTitle>Accessible Dialog Modal</CardTitle>
                    <CardDescription>Radix Dialog with focus trapping, backdrop blur, and Escape dismissal.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="primary">Open Accessible Dialog</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Audio Engine Settings</DialogTitle>
                          <DialogDescription>Configure streaming buffers and network fallback.</DialogDescription>
                        </DialogHeader>
                        <Stack gap="3" className="py-2">
                          <FormField label="Output Device">
                            <Select>
                              <option>Studio Headphones (External DAC)</option>
                              <option>MacBook Pro Built-in Speakers</option>
                            </Select>
                          </FormField>
                          <Switch label="Sound Check Volume Normalization" checked={true} />
                        </Stack>
                        <DialogFooter>
                          <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                          <Button variant="primary" onClick={() => setIsDialogOpen(false)}>Save Preferences</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Tooltip content="Audio Engine Bitrate: 320kbps Opus">
                      <Button variant="glass" leftIcon={<HelpCircle size={16} />}>
                        Hover for Tooltip
                      </Button>
                    </Tooltip>
                  </CardContent>
                </Card>
              </Grid>
            </section>
          </div>
        )}

        {/* TAB 2: MATHEMATICAL RIGOR & PHYSICS */}
        {activeTab === 'math' && (
          <div className="space-y-16">
            <section className="space-y-6">
              <div className="flex flex-col gap-1">
                <Text variant="kicker" size="xs">Mathematical Foundations · Simulator 1</Text>
                <Heading level={2} size="h2" className="flex items-baseline gap-2 flex-wrap">
                  CIELAB <MathView math="L^*" /> Perceptual Contrast Calculator
                </Heading>
                <div className="flex items-center gap-1.5 text-text-secondary text-sm flex-wrap">
                  <span>Demonstrating algebraic contrast guarantees using non-linear relative luminance</span>
                  <MathView math="Y(T)" />
                </div>
              </div>

              <Grid cols={2} gap="6">
                <Card variant="glass" className="p-6 space-y-4">
                  <Heading level={4} size="h4">Simulator Controls</Heading>

                  <div className="space-y-2">
                    <Flex justify="between" align="center">
                      <span className="text-xs text-text-secondary flex items-center gap-1">
                        Background Surface Tone (<MathView math="T_1" />)
                      </span>
                      <span className="text-xs font-mono text-emerald-400">Tone {contrastSurfaceTone}</span>
                    </Flex>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={contrastSurfaceTone}
                      onChange={(e) => setContrastSurfaceTone(Number(e.target.value))}
                      className="w-full accent-white cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <Flex justify="between" align="center">
                      <span className="text-xs text-text-secondary flex items-center gap-1">
                        Foreground Text Tone (<MathView math="T_2" />)
                      </span>
                      <span className="text-xs font-mono text-emerald-400">Tone {contrastTextTone}</span>
                    </Flex>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={contrastTextTone}
                      onChange={(e) => setContrastTextTone(Number(e.target.value))}
                      className="w-full accent-white cursor-pointer"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-surface-active font-mono text-xs space-y-2 border border-border-subtle">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1">Luminance <MathView math="Y_1" />:</span>
                      <span>{toneToLuminance(contrastSurfaceTone).toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1">Luminance <MathView math="Y_2" />:</span>
                      <span>{toneToLuminance(contrastTextTone).toFixed(4)}</span>
                    </div>
                    <div className="text-text-primary font-bold flex justify-between items-center pt-1 border-t border-border-subtle">
                      <span>Contrast Ratio:</span>
                      <span className="text-emerald-400">{liveContrast.toFixed(2)} : 1</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-surface/60 border border-border-subtle text-xs">
                    <Text variant="kicker" size="xs">Contrast Ratio Formula</Text>
                    <MathView math="\text{CR} = \frac{\max(Y_1, Y_2) + 0.05}{\min(Y_1, Y_2) + 0.05} \ge 4.5:1 \quad (\text{WCAG AA})" block />
                  </div>
                </Card>

                <Card variant="glass" className="p-6 flex flex-col justify-between">
                  <div>
                    <Heading level={4} size="h4">Live Visual Sample & WCAG Rating</Heading>
                    <div
                      className="mt-4 p-6 rounded-2xl border transition-all flex flex-col items-center justify-center text-center gap-2"
                      style={{
                        backgroundColor: `hsl(0, 0%, ${contrastSurfaceTone}%)`,
                        color: `hsl(0, 0%, ${contrastTextTone}%)`,
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <span className="text-xl font-bold tracking-tight">Dying Design System</span>
                      <span className="text-xs opacity-90">Live Perceptual Contrast Preview</span>
                    </div>
                  </div>

                  <Flex gap="2" className="mt-4">
                    <Badge variant={liveContrast >= 7.0 ? 'success' : 'neutral'} dot={liveContrast >= 7.0}>
                      WCAG AAA ({liveContrast >= 7.0 ? 'PASS' : 'FAIL'})
                    </Badge>
                    <Badge variant={liveContrast >= 4.5 ? 'success' : 'error'} dot={liveContrast >= 4.5}>
                      WCAG AA ({liveContrast >= 4.5 ? 'PASS' : 'FAIL'})
                    </Badge>
                  </Flex>
                </Card>
              </Grid>
            </section>

            {/* Concentric Nested Radius Simulator */}
            <section className="space-y-6">
              <div className="flex flex-col gap-1">
                <Text variant="kicker" size="xs">Mathematical Foundations · Simulator 2</Text>
                <Heading level={2} size="h2">The Law of Concentric Nested Radii</Heading>
                <div className="flex items-center gap-2 text-text-secondary text-sm flex-wrap">
                  <span>Concentricity Theorem:</span>
                  <MathView math="R_{\text{inner}} = \max(0, R_{\text{outer}} - P)" />
                  <span>to eliminate optical pinch points.</span>
                </div>
              </div>

              <Grid cols={2} gap="6">
                <Card variant="glass" className="p-6 space-y-4">
                  <Heading level={4} size="h4">Radius & Padding Controls</Heading>

                  <div className="space-y-2">
                    <Flex justify="between" align="center">
                      <span className="text-xs text-text-secondary flex items-center gap-1">
                        Outer Container Radius (<MathView math="R_{\text{outer}}" />)
                      </span>
                      <span className="text-xs font-mono text-emerald-400">{outerRadius}px</span>
                    </Flex>
                    <input
                      type="range"
                      min={8}
                      max={48}
                      value={outerRadius}
                      onChange={(e) => setOuterRadius(Number(e.target.value))}
                      className="w-full accent-white cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <Flex justify="between" align="center">
                      <span className="text-xs text-text-secondary flex items-center gap-1">
                        Container Padding (<MathView math="P" />)
                      </span>
                      <span className="text-xs font-mono text-emerald-400">{outerPadding}px</span>
                    </Flex>
                    <input
                      type="range"
                      min={4}
                      max={32}
                      value={outerPadding}
                      onChange={(e) => setOuterPadding(Number(e.target.value))}
                      className="w-full accent-white cursor-pointer"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-surface-active font-mono text-xs border border-border-subtle space-y-2">
                    <div className="flex items-center gap-2">
                      <span>Formula:</span>
                      <MathView math={`${outerRadius}\\text{px} - ${outerPadding}\\text{px} =`} />
                      <span className="text-emerald-400 font-bold">{innerRadius}px Inner Radius</span>
                    </div>
                    <MathView math="R_{\text{inner}} = \begin{cases} R_{\text{outer}} - P & \text{if } R_{\text{outer}} > P \\ 0 & \text{otherwise} \end{cases}" block />
                  </div>
                </Card>

                <Card variant="glass" className="p-6 flex items-center justify-center">
                  <div
                    className="border border-white/20 bg-surface/80 shadow-2xl transition-all flex items-center justify-center"
                    style={{
                      borderRadius: `${outerRadius}px`,
                      padding: `${outerPadding}px`,
                      width: '260px',
                      height: '180px',
                    }}
                  >
                    <div
                      className="border border-emerald-400/50 bg-emerald-950/30 text-emerald-300 w-full h-full flex flex-col items-center justify-center text-xs font-mono text-center p-2"
                      style={{
                        borderRadius: `${innerRadius}px`,
                      }}
                    >
                      <span>Concentric Inner Box</span>
                      <span className="text-[10px] opacity-80 mt-1">Radius = {innerRadius}px</span>
                    </div>
                  </div>
                </Card>
              </Grid>
            </section>

            {/* Spring Physics Oscillator Simulator */}
            <section className="space-y-6">
              <div className="flex flex-col gap-1">
                <Text variant="kicker" size="xs">Mathematical Foundations · Simulator 3</Text>
                <Heading level={2} size="h2">Damped Harmonic Oscillator Physics</Heading>
                <div className="flex items-center gap-2 text-text-secondary text-sm flex-wrap">
                  <span>Differential Equation:</span>
                  <MathView math="m\frac{d^2x}{dt^2} + c\frac{dx}{dt} + kx = 0" />
                  <span>with damping ratio</span>
                  <MathView math="\zeta = \frac{c}{2\sqrt{m \cdot k}}" />
                </div>
              </div>

              <Grid cols={2} gap="6">
                <Card variant="glass" className="p-6 space-y-4">
                  <Heading level={4} size="h4">Oscillator Coefficients</Heading>

                  <div className="space-y-2">
                    <Flex justify="between" align="center">
                      <span className="text-xs text-text-secondary flex items-center gap-1">
                        Spring Stiffness (<MathView math="k" />)
                      </span>
                      <span className="text-xs font-mono text-emerald-400">{springStiffness}</span>
                    </Flex>
                    <input
                      type="range"
                      min={100}
                      max={800}
                      value={springStiffness}
                      onChange={(e) => setSpringStiffness(Number(e.target.value))}
                      className="w-full accent-white cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <Flex justify="between" align="center">
                      <span className="text-xs text-text-secondary flex items-center gap-1">
                        Damping Coefficient (<MathView math="c" />)
                      </span>
                      <span className="text-xs font-mono text-emerald-400">{springDamping}</span>
                    </Flex>
                    <input
                      type="range"
                      min={10}
                      max={60}
                      value={springDamping}
                      onChange={(e) => setSpringDamping(Number(e.target.value))}
                      className="w-full accent-white cursor-pointer"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-surface-active font-mono text-xs border border-border-subtle space-y-2">
                    <div className="flex items-center gap-2">
                      <span>Damping Ratio</span>
                      <MathView math="\zeta" />
                      <span>=</span>
                      <span className="text-emerald-400 font-bold">{dampingRatio.toFixed(3)}</span>
                      <span>({dampingRatio < 1 ? 'Underdamped / Snappy' : 'Overdamped'})</span>
                    </div>
                    <MathView math="\omega_0 = \sqrt{\frac{k}{m}}, \quad \zeta = \frac{c}{2\sqrt{mk}}, \quad x(t) = X_0 e^{-\zeta\omega_0 t} \cos(\omega_d t)" block />
                  </div>
                </Card>

                <Card variant="glass" className="p-6 flex flex-col justify-between items-center text-center">
                  <div>
                    <Heading level={4} size="h4">Live Spring Physics Trigger</Heading>
                    <Text variant="secondary" size="xs" className="mt-1">
                      Click the button below to test tactile spring restitution.
                    </Text>
                  </div>

                  <div className="my-6">
                    <SpringButton
                      key={springPulseKey}
                      variant="primary"
                      size="lg"
                      onClick={() => setSpringPulseKey((k) => k + 1)}
                    >
                      Trigger Spring (k = {springStiffness}, c = {springDamping})
                    </SpringButton>
                  </div>

                  <Badge variant="accent">Snappy tactile curve</Badge>
                </Card>
              </Grid>
            </section>

            {/* State Layer Opacity Matrix Simulator */}
            <section className="space-y-6">
              <div className="flex flex-col gap-1">
                <Text variant="kicker" size="xs">Mathematical Foundations · Simulator 4</Text>
                <Heading level={2} size="h2">State Layer Opacity Matrix</Heading>
                <div className="flex items-center gap-2 text-text-secondary text-sm flex-wrap">
                  <span>Composite Equation:</span>
                  <MathView math="\text{Surface}_{\text{rendered}} = \text{Surface}_{\text{base}} \oplus (\text{Tint} \times \alpha)" />
                  <span>where</span>
                  <MathView math="\alpha \in \{0, 0.08, 0.10, 0.12, 0.16\}" />
                </div>
              </div>

              <Grid cols={2} gap="6">
                <Card variant="glass" className="p-6 space-y-4">
                  <Heading level={4} size="h4">Select State Layer</Heading>
                  <Flex gap="2" wrap="wrap">
                    <Button
                      variant={stateLayerDemo === 'rest' ? 'primary' : 'ghost'}
                      size="sm"
                      aria-label="Rest state, alpha 0.00"
                      onClick={() => setStateLayerDemo('rest')}
                    >
                      <span className="flex items-center gap-1">Rest (<MathView math="\alpha = 0.00" />)</span>
                    </Button>
                    <Button
                      variant={stateLayerDemo === 'hover' ? 'primary' : 'ghost'}
                      size="sm"
                      aria-label="Hover state, alpha 0.08"
                      onClick={() => setStateLayerDemo('hover')}
                    >
                      <span className="flex items-center gap-1">Hover (<MathView math="\alpha = 0.08" />)</span>
                    </Button>
                    <Button
                      variant={stateLayerDemo === 'focus' ? 'primary' : 'ghost'}
                      size="sm"
                      aria-label="Focus state, alpha 0.10"
                      onClick={() => setStateLayerDemo('focus')}
                    >
                      <span className="flex items-center gap-1">Focus (<MathView math="\alpha = 0.10" />)</span>
                    </Button>
                    <Button
                      variant={stateLayerDemo === 'pressed' ? 'primary' : 'ghost'}
                      size="sm"
                      aria-label="Pressed state, alpha 0.12"
                      onClick={() => setStateLayerDemo('pressed')}
                    >
                      <span className="flex items-center gap-1">Pressed (<MathView math="\alpha = 0.12" />)</span>
                    </Button>
                    <Button
                      variant={stateLayerDemo === 'dragged' ? 'primary' : 'ghost'}
                      size="sm"
                      aria-label="Dragged state, alpha 0.16"
                      onClick={() => setStateLayerDemo('dragged')}
                    >
                      <span className="flex items-center gap-1">Dragged (<MathView math="\alpha = 0.16" />)</span>
                    </Button>
                  </Flex>

                  <div className="p-4 rounded-xl bg-surface-active font-mono text-xs border border-border-subtle space-y-2">
                    <div>Active State: <span className="text-emerald-400 font-bold uppercase">{stateLayerDemo}</span></div>
                    <div className="flex items-center gap-2">
                      <span>Applied Opacity:</span>
                      <MathView math={`\\alpha = ${
                        stateLayerDemo === 'rest' ? '0.00' :
                        stateLayerDemo === 'hover' ? '0.08' :
                        stateLayerDemo === 'focus' ? '0.10' :
                        stateLayerDemo === 'pressed' ? '0.12' : '0.16'
                      }`} />
                    </div>
                    <MathView math="C_{\text{composite}} = (1 - \alpha) C_{\text{surface}} + \alpha C_{\text{tint}}" block />
                  </div>
                </Card>

                <Card variant="glass" className="p-6 flex items-center justify-center">
                  <div className="relative w-64 h-36 rounded-2xl border border-border-subtle bg-surface flex flex-col items-center justify-center overflow-hidden shadow-xl">
                    <div
                      className="absolute inset-0 transition-opacity duration-200 pointer-events-none"
                      style={{
                        backgroundColor: currentTheme === 'light' ? 'black' : 'white',
                        opacity:
                          stateLayerDemo === 'rest' ? 0 :
                          stateLayerDemo === 'hover' ? 0.08 :
                          stateLayerDemo === 'focus' ? 0.10 :
                          stateLayerDemo === 'pressed' ? 0.12 : 0.16,
                      }}
                    />
                    <span className="font-semibold text-sm text-text-primary z-10">State Layer Preview</span>
                    <span className="font-mono text-xs text-text-secondary mt-1 z-10">
                      {stateLayerDemo.toUpperCase()} STATE
                    </span>
                  </div>
                </Card>
              </Grid>
            </section>
          </div>
        )}

        {/* TAB 3: DESIGN TOKENS & DTCG */}
        {activeTab === 'tokens' && (
          <div className="space-y-16">
            <section className="space-y-6">
              <div className="flex flex-col gap-1">
                <Text variant="kicker" size="xs">Foundations · Layer 2 & 3</Text>
                <Heading level={2} size="h2">Design Tokens Explorer</Heading>
                <Text variant="secondary" size="sm">
                  10-step Monochrome Graphite scale strictly bound to W3C DTCG tokens.
                </Text>
              </div>

              <Grid cols={3} gap="4">
                {GRAPHITE_SWATCHES.map((swatch) => (
                  <GlassPanel
                    key={swatch.token}
                    variant="subtle"
                    className="p-5 flex flex-col justify-between h-44 group hover:border-border-muted transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className="h-10 w-10 rounded-xl border border-border-subtle shadow-inner flex items-center justify-center font-mono text-[10px]"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <span className="font-mono text-[11px] text-text-tertiary">
                        Tone {swatch.tone}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-text-primary">
                        {swatch.name}
                      </div>
                      <div className="text-xs text-text-secondary mt-0.5">
                        {swatch.role}
                      </div>
                      <div className="mt-2 text-[10px] font-mono text-emerald-400 font-medium">
                        {swatch.token}
                      </div>
                    </div>
                  </GlassPanel>
                ))}
              </Grid>
            </section>

            {/* Elevation Tiers */}
            <section className="space-y-6">
              <div className="flex flex-col gap-1">
                <Text variant="kicker" size="xs">Tonal Elevation Tiers</Text>
                <Heading level={3} size="h3">Dark Mode Elevation & Specular Physics</Heading>
                <Text variant="secondary" size="sm">
                  Formula: Tone(E) = Tone_base + ΔT(E) with quadratic blur B = 2E² + 8.
                </Text>
              </div>

              <Grid cols={3} gap="4">
                <Card variant="glass" className="p-4 border-white/[0.08]">
                  <Text variant="kicker" size="xs">Level 1 · Card Surface</Text>
                  <Heading level={5} size="h5" className="mt-1">Delta +4 (Tone 12)</Heading>
                  <Text variant="secondary" size="xs" className="mt-1">Blur: 10px · Specular Inset 0.10</Text>
                </Card>

                <Card variant="glass" className="p-4 border-white/[0.14] shadow-xl">
                  <Text variant="kicker" size="xs">Level 3 · Modal Dialog</Text>
                  <Heading level={5} size="h5" className="mt-1">Delta +10 (Tone 18)</Heading>
                  <Text variant="secondary" size="xs" className="mt-1">Blur: 26px · Specular Inset 0.14</Text>
                </Card>

                <Card variant="glass" className="p-4 border-white/[0.20] shadow-2xl">
                  <Text variant="kicker" size="xs">Level 4 · Transport Dock</Text>
                  <Heading level={5} size="h5" className="mt-1">Delta +13 (Tone 21)</Heading>
                  <Text variant="secondary" size="xs" className="mt-1">Blur: 40px · Specular Inset 0.16</Text>
                </Card>
              </Grid>
            </section>
          </div>
        )}

        {/* TAB 4: 20-POINT CHECKLIST AUDIT */}
        {activeTab === 'checklist' && (
          <div className="space-y-10">
            {/* Compliance Banner */}
            <Card variant="glass" className="p-6 border-emerald-500/30 bg-emerald-950/10">
              <Flex justify="between" align="center" wrap="wrap" gap="4">
                <div>
                  <Flex align="center" gap="2">
                    <CheckCircle2 size={24} className="text-emerald-400" />
                    <Heading level={2} size="h2" className="text-white">Enterprise Compliance Matrix</Heading>
                  </Flex>
                  <Text variant="secondary" size="sm" className="mt-1">
                    Verified against industry standards (Material Design 3, Carbon, Radix UI, Polaris).
                  </Text>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold font-mono text-emerald-400">20 / 20</div>
                  <Badge variant="success" size="sm">100% PRODUCTION PASS</Badge>
                </div>
              </Flex>
            </Card>

            {/* Filter Pills */}
            <Flex gap="2" wrap="wrap">
              <Button
                variant={checklistFilter === 'all' ? 'primary' : 'ghost'}
                size="xs"
                onClick={() => setChecklistFilter('all')}
              >
                All Domains (20)
              </Button>
              <Button
                variant={checklistFilter === 'foundations' ? 'primary' : 'ghost'}
                size="xs"
                onClick={() => setChecklistFilter('foundations')}
              >
                Foundations (6)
              </Button>
              <Button
                variant={checklistFilter === 'components' ? 'primary' : 'ghost'}
                size="xs"
                onClick={() => setChecklistFilter('components')}
              >
                Components (5)
              </Button>
              <Button
                variant={checklistFilter === 'quality' ? 'primary' : 'ghost'}
                size="xs"
                onClick={() => setChecklistFilter('quality')}
              >
                Quality & A11y (5)
              </Button>
              <Button
                variant={checklistFilter === 'governance' ? 'primary' : 'ghost'}
                size="xs"
                onClick={() => setChecklistFilter('governance')}
              >
                Governance (4)
              </Button>
            </Flex>

            {/* Expandable Checklist Cards */}
            <Stack gap="3">
              {filteredChecklist.map((item) => {
                const isExpanded = expandedChecklistItems.has(item.id);
                return (
                  <Card key={item.id} variant="glass" className="overflow-hidden">
                    <div
                      onClick={() => toggleChecklistItem(item.id)}
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/[0.03] transition-colors select-none"
                    >
                      <Flex align="center" gap="3">
                        <span className="font-mono text-xs text-text-tertiary w-6">#{item.id}</span>
                        <span className="font-semibold text-sm text-text-primary">{item.title}</span>
                      </Flex>

                      <Flex align="center" gap="3">
                        <Badge variant="success" size="sm">COMPLETE</Badge>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </Flex>
                    </div>

                    {isExpanded && (
                      <div className="px-4 pb-4 pt-2 border-t border-border-subtle/50 bg-surface/50 text-xs space-y-2">
                        <Text variant="secondary">{item.summary}</Text>
                        <div className="flex items-center gap-2 pt-1 font-mono text-[11px] text-text-tertiary">
                          <span>Artifact:</span>
                          <span className="text-emerald-400">{item.link}</span>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </Stack>
          </div>
        )}

        {/* TAB 5: AUDIO DOMAIN PATTERNS */}
        {activeTab === 'audio' && (
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
                    imageUrl={t.thumbnailUrl || ""}
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

            {/* Floating Audio Player Pill Dock (Rendered on Audio tab only) */}
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
        )}
      </main>
    </OledBase>
  );
}

export default function DyingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-canvas" />}>
      <DyingPortalContent />
    </Suspense>
  );
}
