'use client';

import React, { useState } from 'react';
import {
  Text,
  Heading,
  Grid,
  Card,
  Flex,
  Badge,
  ScrubSlider,
} from '@mp/dying';
import { MathView } from '@/components/MathView';
import { toneToLuminance, calculateContrast } from '../data/mockData';

export function ContrastSimulator() {
  const [contrastSurfaceTone, setContrastSurfaceTone] = useState<number>(8);
  const [contrastTextTone, setContrastTextTone] = useState<number>(100);

  const liveContrast = calculateContrast(contrastSurfaceTone, contrastTextTone);

  return (
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
            <ScrubSlider
              min={0}
              max={100}
              value={contrastSurfaceTone}
              onValueChange={(val) => setContrastSurfaceTone(val)}
              showThumbOnHoverOnly={false}
            />
          </div>

          <div className="space-y-2">
            <Flex justify="between" align="center">
              <span className="text-xs text-text-secondary flex items-center gap-1">
                Foreground Text Tone (<MathView math="T_2" />)
              </span>
              <span className="text-xs font-mono text-emerald-400">Tone {contrastTextTone}</span>
            </Flex>
            <ScrubSlider
              min={0}
              max={100}
              value={contrastTextTone}
              onValueChange={(val) => setContrastTextTone(val)}
              showThumbOnHoverOnly={false}
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
            <Heading level={4} size="h4">Live Visual Sample &amp; WCAG Rating</Heading>
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
  );
}
