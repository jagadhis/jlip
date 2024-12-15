'use client'

import { Badge } from '@/types/admin'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Award, Clock } from 'lucide-react'

interface BadgeStatusProps {
  badge: Badge
  currentStep: number
  completedSteps: number[]
  startedAt?: string
}

export function BadgeStatus({
  badge,
  currentStep,
  completedSteps,
  startedAt
}: BadgeStatusProps) {
  const progress = (completedSteps.length / badge.steps.length) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={progress} />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {completedSteps.length} of {badge.steps.length} steps complete
              </span>
            </div>
            {startedAt && (
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Started {new Date(startedAt).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}