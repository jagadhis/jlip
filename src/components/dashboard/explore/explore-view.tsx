import React from 'react';
import CategoryGrid from './category-grid';
import BadgeList from './badge-list';
import { DashboardShell } from '@/components/shell';

export default function ExploreView() {
  return (
    <DashboardShell>
      <div className="space-y-6 p-4">
        <CategoryGrid />
        <BadgeList />
      </div>
    </DashboardShell>
  );
}