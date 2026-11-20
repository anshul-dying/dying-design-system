'use client';

import React from 'react';
import {
  Text,
  Heading,
  Grid,
  Card,
  Stack,
  Flex,
  Box,
  BrandLogo,
  Badge,
  Separator,
} from '@mp/dying';

export function BrandIdentitySection() {
  return (
    <>
      {/* Brand Identity & Logo Section */}
      <section className="space-y-6">
        <div className="flex flex-col gap-1">
          <Text variant="kicker" size="xs">Brand Identity · System Vector Marks</Text>
          <Heading level={2} size="h2">GaneGan Brand Logo</Heading>
          <Text variant="secondary" size="sm">
            Core musical mark blending uppercase &apos;G&apos;, vinyl grooves, and an eighth-note into Dying&apos;s monochrome &amp; vermillion design tokens.
          </Text>
        </div>

        <Grid cols={3} gap="4">
          <Card variant="glass" className="p-5 flex flex-col justify-between">
            <div>
              <Text variant="kicker" size="xs">Lockup &amp; Typography</Text>
              <Heading level={4} size="h4" className="mt-1 mb-3">Full Lockup &amp; Wordmark</Heading>
              <Stack gap="4" className="py-2">
                <BrandLogo variant="full" size="md" subtitle="Streaming Engine" />
                <BrandLogo variant="wordmark" size="lg" badge={<Badge variant="glass" size="xs">PRO</Badge>} />
                <BrandLogo variant="wordmark" size="sm" showSubtitle subtitle="Apple Music Aesthetics" />
              </Stack>
            </div>
            <Text variant="tertiary" size="xs" className="mt-4 font-mono">
              variant=&quot;full&quot; | variant=&quot;wordmark&quot;
            </Text>
          </Card>

          <Card variant="glass" className="p-5 flex flex-col justify-between">
            <div>
              <Text variant="kicker" size="xs">Vector Symbol</Text>
              <Heading level={4} size="h4" className="mt-1 mb-3">SVG Mark Scale</Heading>
              <Flex align="center" gap="4" className="py-3">
                <BrandLogo variant="mark" size="xs" />
                <BrandLogo variant="mark" size="sm" />
                <BrandLogo variant="mark" size="md" />
                <BrandLogo variant="mark" size="lg" />
                <BrandLogo variant="mark" size="xl" />
              </Flex>
            </div>
            <Text variant="tertiary" size="xs" className="mt-4 font-mono">
              size=&quot;xs&quot; | &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; | &quot;xl&quot;
            </Text>
          </Card>

          <Card variant="glass" className="p-5 flex flex-col justify-between">
            <div>
              <Text variant="kicker" size="xs">App Tiles &amp; Curvature</Text>
              <Heading level={4} size="h4" className="mt-1 mb-3">App Icon &amp; Monochrome</Heading>
              <Flex align="center" gap="4" className="py-2">
                <BrandLogo variant="app-icon" size="sm" />
                <BrandLogo variant="app-icon" size="md" />
                <BrandLogo variant="monochrome-tile" size="md" />
                <BrandLogo variant="mark" color="monochrome" size="md" />
              </Flex>
            </div>
            <Text variant="tertiary" size="xs" className="mt-4 font-mono">
              variant=&quot;app-icon&quot; | &quot;monochrome-tile&quot;
            </Text>
          </Card>
        </Grid>
      </section>

      {/* Primitives Section */}
      <section className="space-y-6">
        <div className="flex flex-col gap-1">
          <Text variant="kicker" size="xs">Foundations · Layer 4</Text>
          <Heading level={2} size="h2">Layout &amp; Typography Primitives</Heading>
          <Text variant="secondary" size="sm">
            Low-level structural primitives enforcing zero-margin component encapsulation.
          </Text>
        </div>

        <Grid cols={3} gap="4">
          <Card variant="glass" className="p-4">
            <Heading level={4} size="h4" className="mb-2">Stack &amp; Flex</Heading>
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
    </>
  );
}
