'use client';

import React, { useState } from 'react';
import {
  Text,
  Heading,
  Grid,
  Card,
  Flex,
  Button,
} from '@mp/dying';
import { MathView } from '@/components/MathView';

export interface StateLayerSimulatorProps {
  currentTheme?: 'dark' | 'oled' | 'light';
}

export function StateLayerSimulator({ currentTheme = 'dark' }: StateLayerSimulatorProps) {
  const [stateLayerDemo, setStateLayerDemo] = useState<
    'rest' | 'hover' | 'focus' | 'pressed' | 'dragged'
  >('rest');

  return (
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
  );
}
