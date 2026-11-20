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
  SpringButton,
} from '@mp/dying';
import { MathView } from '@/components/MathView';

export function SpringSimulator() {
  const [springStiffness, setSpringStiffness] = useState<number>(450);
  const [springDamping, setSpringDamping] = useState<number>(28);
  const [springPulseKey, setSpringPulseKey] = useState<number>(0);

  const dampingRatio = springDamping / (2 * Math.sqrt(1.0 * springStiffness));

  return (
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
            <ScrubSlider
              min={100}
              max={800}
              value={springStiffness}
              onValueChange={(val) => setSpringStiffness(val)}
              showThumbOnHoverOnly={false}
            />
          </div>

          <div className="space-y-2">
            <Flex justify="between" align="center">
              <span className="text-xs text-text-secondary flex items-center gap-1">
                Damping Coefficient (<MathView math="c" />)
              </span>
              <span className="text-xs font-mono text-emerald-400">{springDamping}</span>
            </Flex>
            <ScrubSlider
              min={10}
              max={60}
              value={springDamping}
              onValueChange={(val) => setSpringDamping(val)}
              showThumbOnHoverOnly={false}
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
  );
}
