'use client'

import { Badge } from '@/types/admin'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'

interface BadgeStepsProps {
  badge: Badge
  currentStep?: number
  completedSteps?: number[]
  onStepComplete?: (stepIndex: number) => void
}

export function BadgeSteps({
  badge,
  currentStep = 0,
  completedSteps = [],
  onStepComplete
}: BadgeStepsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Steps to Earn</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {badge.steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3 p-3 rounded-lg
                ${index === currentStep ? 'bg-muted' : ''}
                ${completedSteps.includes(index) ? 'opacity-50' : ''}`}
            >
              <Checkbox
                checked={completedSteps.includes(index)}
                onCheckedChange={() => onStepComplete?.(index)}
                disabled={index !== currentStep}
              />
              <div>
                <h4 className="font-medium">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}