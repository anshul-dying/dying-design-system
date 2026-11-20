'use client';

import React from 'react';
import { BrandIdentitySection } from './BrandIdentitySection';
import { ButtonsSection } from './ButtonsSection';
import { InputsSection } from './InputsSection';
import { FeedbackSection } from './FeedbackSection';

export function ComponentsSection() {
  return (
    <div className="space-y-16">
      <BrandIdentitySection />
      <ButtonsSection />
      <InputsSection />
      <FeedbackSection />
    </div>
  );
}
