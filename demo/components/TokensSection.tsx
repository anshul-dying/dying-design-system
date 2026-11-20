'use client';

import React from 'react';
import {
  Text,
  Heading,
  Grid,
  Card,
  GlassPanel,
} from '@mp/dying';
import { GRAPHITE_SWATCHES } from '../data/mockData';

export function TokensSection() {
  return (
    <div className="space-y-16">
      <section className="space-y-6">
        <div className="flex flex-col gap-1">
          <Text variant="kicker" size="xs">Foundations · Layer 2 &amp; 3</Text>
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
          <Heading level={3} size="h3">Dark Mode Elevation &amp; Specular Physics</Heading>
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
  );
}
