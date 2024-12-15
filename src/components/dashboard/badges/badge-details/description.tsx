'use client'

import { Badge } from '@/types/admin'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

interface BadgeDescriptionProps {
  badge: Badge
}

export function BadgeDescription({ badge }: BadgeDescriptionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <span className="text-3xl">{badge.icon}</span>
          <div>
            <CardTitle>{badge.name}</CardTitle>
            <CardDescription>
              {badge.requirements?.prerequisites && badge.requirements.prerequisites.length > 0 && (
                <span>Prerequisites: {badge.requirements.prerequisites.join(', ')}</span>
              )}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{badge.description}</p>
      </CardContent>
    </Card>
  )
}