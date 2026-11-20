'use client';

import React, { useState } from 'react';
import {
  Text,
  Heading,
  Grid,
  Card,
  Flex,
  ScrubSlider,
} from '@mp/dying';
import { MathView } from '@/components/MathView';

export function RadiusSimulator() {
  const [outerRadius, setOuterRadius] = useState<number>(24);
  const [outerPadding, setOuterPadding] = useState<number>(16);

  const innerRadius = Math.max(0, outerRadius - outerPadding);

  return (
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
          <Heading level={4} size="h4">Radius &amp; Padding Controls</Heading>

          <div className="space-y-2">
            <Flex justify="between" align="center">
              <span className="text-xs text-text-secondary flex items-center gap-1">
                Outer Container Radius (<MathView math="R_{\text{outer}}" />)
              </span>
              <span className="text-xs font-mono text-emerald-400">{outerRadius}px</span>
            </Flex>
            <ScrubSlider
              min={8}
              max={48}
              value={outerRadius}
              onValueChange={(val) => setOuterRadius(val)}
              showThumbOnHoverOnly={false}
            />
          </div>

          <div className="space-y-2">
            <Flex justify="between" align="center">
              <span className="text-xs text-text-secondary flex items-center gap-1">
                Container Padding (<MathView math="P" />)
              </span>
              <span className="text-xs font-mono text-emerald-400">{outerPadding}px</span>
            </Flex>
            <ScrubSlider
              min={4}
              max={32}
              value={outerPadding}
              onValueChange={(val) => setOuterPadding(val)}
              showThumbOnHoverOnly={false}
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
  );
}
