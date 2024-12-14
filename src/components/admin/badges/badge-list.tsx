'use client'

import { Badge } from '@/types/admin'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import { Badge as UIBadge } from '@/components/ui/badge'

interface BadgeListProps {
  badges: Badge[]
  onEdit: (badge: Badge) => void
  onDelete: (id: string) => void
}

export function BadgeList({ badges, onEdit, onDelete }: BadgeListProps) {
  const getDifficultyColor = (level: number) => {
    const colors = {
      1: 'bg-green-100 text-green-800',
      2: 'bg-blue-100 text-blue-800',
      3: 'bg-yellow-100 text-yellow-800',
      4: 'bg-orange-100 text-orange-800',
      5: 'bg-red-100 text-red-800'
    }
    return colors[level as keyof typeof colors]
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {badges.map((badge) => (
        <div key={badge.id} className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{badge.icon}</span>
              <h3 className="font-medium">{badge.name}</h3>
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(badge)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(badge.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <p className="text-sm text-gray-600">{badge.description}</p>

          <div className="flex items-center space-x-2">
            <UIBadge className={getDifficultyColor(badge.difficulty)}>
              Level {badge.difficulty}
            </UIBadge>
            <UIBadge variant="outline">{badge.points} points</UIBadge>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Steps ({badge.steps.length})</h4>
            <div className="space-y-1">
              {badge.steps.map((step, index) => (
                <div key={index} className="text-sm text-gray-600">
                  {index + 1}. {step.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}