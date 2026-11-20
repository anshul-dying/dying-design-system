'use client';

import React from 'react';
import { ContrastSimulator } from './ContrastSimulator';
import { RadiusSimulator } from './RadiusSimulator';
import { SpringSimulator } from './SpringSimulator';
import { StateLayerSimulator } from './StateLayerSimulator';

export interface MathSectionProps {
  currentTheme?: 'dark' | 'oled' | 'light';
}

export function MathSection({ currentTheme = 'dark' }: MathSectionProps) {
  return (
    <div className="space-y-16">
      <ContrastSimulator />
      <RadiusSimulator />
      <SpringSimulator />
      <StateLayerSimulator currentTheme={currentTheme} />
    </div>
  );
}
