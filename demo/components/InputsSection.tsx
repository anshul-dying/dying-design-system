'use client';

import React, { useState } from 'react';
import {
  Text,
  Heading,
  Grid,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  FormField,
  Input,
  Select,
  Textarea,
  Switch,
  Checkbox,
} from '@mp/dying';
import { Music } from 'lucide-react';

export function InputsSection() {
  const [formInputValue, setFormInputValue] = useState<string>('');

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-1">
        <Text variant="kicker" size="xs">Components · Forms</Text>
        <Heading level={2} size="h2">Form Controls &amp; Inputs</Heading>
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
                <option value="electronic">Electronic &amp; Synthwave</option>
              </Select>
            </FormField>

            <FormField label="Album Notes" id="notes-textarea">
              <Textarea id="notes-textarea" placeholder="Enter liner notes, credits, or specifications..." />
            </FormField>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <CardTitle>Selection Controls &amp; Toggles</CardTitle>
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
  );
}
