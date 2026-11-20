'use client';

import React from 'react';
import {
  Text,
  Heading,
  Grid,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Flex,
  Button,
  IconButton,
  ButtonGroup,
  Separator,
} from '@mp/dying';
import { Play, Heart, Bell, Search } from 'lucide-react';

export function ButtonsSection() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-1">
        <Text variant="kicker" size="xs">Components · Actions</Text>
        <Heading level={2} size="h2">Actions: Button &amp; IconButton Matrix</Heading>
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
            <CardTitle>IconButton &amp; ButtonGroup</CardTitle>
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
  );
}
