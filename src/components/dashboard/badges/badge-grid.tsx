'use client'

import { Badge } from '@/types/admin'
import { BadgeCard } from './badge-card'

interface BadgeGridProps {
  badges: Badge[]
  onBadgeClick: (badge: Badge) => void
}

export function BadgeGrid({ badges, onBadgeClick }: BadgeGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {badges.map((badge) => (
        <BadgeCard
          key={badge.id}
          badge={badge}
          onClick={() => onBadgeClick(badge)}
        />
      ))}
    </div>
  )
}