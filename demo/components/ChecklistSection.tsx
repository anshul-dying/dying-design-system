'use client';

import React, { useState } from 'react';
import {
  Text,
  Heading,
  Card,
  Flex,
  Stack,
  Badge,
  Button,
} from '@mp/dying';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { CHECKLIST_ITEMS } from '../data/mockData';

export function ChecklistSection() {
  const [checklistFilter, setChecklistFilter] = useState<
    'all' | 'foundations' | 'components' | 'quality' | 'governance'
  >('all');
  const [expandedChecklistItems, setExpandedChecklistItems] = useState<Set<number>>(
    new Set([1, 7, 14, 20])
  );

  const toggleChecklistItem = (id: number) => {
    setExpandedChecklistItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredChecklist = CHECKLIST_ITEMS.filter((item) => {
    if (checklistFilter === 'all') return true;
    return item.category === checklistFilter;
  });

  return (
    <div className="space-y-10">
      {/* Compliance Banner */}
      <Card variant="glass" className="p-6 border-emerald-500/30 bg-emerald-950/10">
        <Flex justify="between" align="center" wrap="wrap" gap="4">
          <div>
            <Flex align="center" gap="2">
              <CheckCircle2 size={24} className="text-emerald-400" />
              <Heading level={2} size="h2" className="text-white">Enterprise Compliance Matrix</Heading>
            </Flex>
            <Text variant="secondary" size="sm" className="mt-1">
              Verified against industry standards (Material Design 3, Carbon, Radix UI, Polaris).
            </Text>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold font-mono text-emerald-400">20 / 20</div>
            <Badge variant="success" size="sm">100% PRODUCTION PASS</Badge>
          </div>
        </Flex>
      </Card>

      {/* Filter Pills */}
      <Flex gap="2" wrap="wrap">
        <Button
          variant={checklistFilter === 'all' ? 'primary' : 'ghost'}
          size="xs"
          onClick={() => setChecklistFilter('all')}
        >
          All Domains (20)
        </Button>
        <Button
          variant={checklistFilter === 'foundations' ? 'primary' : 'ghost'}
          size="xs"
          onClick={() => setChecklistFilter('foundations')}
        >
          Foundations (6)
        </Button>
        <Button
          variant={checklistFilter === 'components' ? 'primary' : 'ghost'}
          size="xs"
          onClick={() => setChecklistFilter('components')}
        >
          Components (5)
        </Button>
        <Button
          variant={checklistFilter === 'quality' ? 'primary' : 'ghost'}
          size="xs"
          onClick={() => setChecklistFilter('quality')}
        >
          Quality &amp; A11y (5)
        </Button>
        <Button
          variant={checklistFilter === 'governance' ? 'primary' : 'ghost'}
          size="xs"
          onClick={() => setChecklistFilter('governance')}
        >
          Governance (4)
        </Button>
      </Flex>

      {/* Expandable Checklist Cards */}
      <Stack gap="3">
        {filteredChecklist.map((item) => {
          const isExpanded = expandedChecklistItems.has(item.id);
          return (
            <Card key={item.id} variant="glass" className="overflow-hidden">
              <div
                onClick={() => toggleChecklistItem(item.id)}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/[0.03] transition-colors select-none"
              >
                <Flex align="center" gap="3">
                  <span className="font-mono text-xs text-text-tertiary w-6">#{item.id}</span>
                  <span className="font-semibold text-sm text-text-primary">{item.title}</span>
                </Flex>

                <Flex align="center" gap="3">
                  <Badge variant="success" size="sm">COMPLETE</Badge>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </Flex>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-border-subtle/50 bg-surface/50 text-xs space-y-2">
                  <Text variant="secondary">{item.summary}</Text>
                  <div className="flex items-center gap-2 pt-1 font-mono text-[11px] text-text-tertiary">
                    <span>Artifact:</span>
                    <span className="text-emerald-400">{item.link}</span>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </Stack>
    </div>
  );
}
