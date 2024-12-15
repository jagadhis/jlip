'use client'

import { Badge } from '@/types/admin'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge as UIBadge } from '@/components/ui/badge'
import { Award } from 'lucide-react'
import { getDifficultyColor } from '@/lib/color'

interface BadgeCardProps {
  badge: Badge
  onClick?: () => void
}

export function BadgeCard({ badge, onClick }: BadgeCardProps) {
  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{badge.icon}</span>
          <CardTitle className="text-lg">{badge.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {badge.description}
          </p>
          <div className="flex items-center justify-between">
            <UIBadge variant="outline" className="flex items-center gap-1">
              <Award className="h-3 w-3" />
              {badge.points} points
            </UIBadge>
            <UIBadge className={getDifficultyColor(badge.difficulty)}>
              Level {badge.difficulty}
            </UIBadge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}