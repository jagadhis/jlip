'use client'

import { useEffect, useState } from 'react'
import { Badge, UserProgress } from '@/types/admin'
import { BadgeDescription } from './badge-details/description'
import { BadgeSteps } from './badge-details/steps'
import { BadgeStatus } from './badge-details/status'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'
import { useUser } from '@/hooks/use-user' // Assuming you have a user hook

interface BadgeDetailsViewProps {
  badgeId: string
  courseId?: string
}

export function BadgeDetailsView({ badgeId, courseId }: BadgeDetailsViewProps) {
  const [badge, setBadge] = useState<Badge | null>(null)
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const { user } = useUser()
  const { toast } = useToast()

  useEffect(() => {
    fetchBadgeDetails()
    if (user) {
      fetchUserProgress()
    }
  }, [badgeId, user?.id])

  const fetchBadgeDetails = async () => {
    const { data, error } = await supabase
      .from('badges')
      .select('*')
      .eq('id', badgeId)
      .single()

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch badge details',
        variant: 'destructive',
      })
      return
    }

    setBadge(data)
  }

  const fetchUserProgress = async () => {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('badge_id', badgeId)
      .eq('user_id', user?.id)
      .eq('course_id', courseId)
      .single()

    if (error && error.code !== 'PGRST116') { // No rows returned
      toast({
        title: 'Error',
        description: 'Failed to fetch progress',
        variant: 'destructive',
      })
      return
    }

    setProgress(data)
  }

  const handleStepComplete = async (stepIndex: number) => {
    if (!user || !badge) return

    try {
      let newProgress: UserProgress

      if (!progress) {
        // Start the badge
        const { data, error } = await supabase
          .from('user_progress')
          .insert({
            user_id: user.id,
            badge_id: badgeId,
            course_id: courseId,
            status: 'in_progress',
            current_step: stepIndex,
            completed_steps: [stepIndex],
            started_at: new Date().toISOString()
          })
          .single()

        if (error) throw error
        newProgress = data
      } else {
        // Update existing progress
        const completedSteps = new Set([...progress.completed_steps, stepIndex])
        const newStatus = completedSteps.size === badge.steps.length ? 'completed' : 'in_progress'

        const { data, error } = await supabase
          .from('user_progress')
          .update({
            status: newStatus,
            current_step: stepIndex + 1,
            completed_steps: Array.from(completedSteps),
            completed_at: newStatus === 'completed' ? new Date().toISOString() : null
          })
          .eq('id', progress.id)
          .single()

        if (error) throw error
        newProgress = data
      }

      setProgress(newProgress)
      toast({
        title: 'Success',
        description: 'Progress updated'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update progress',
        variant: 'destructive',
      })
    }
  }

  if (!badge) return null

  return (
    <div className="space-y-6">
      <BadgeDescription badge={badge} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <BadgeSteps
            badge={badge}
            currentStep={progress?.current_step ?? 0}
            completedSteps={progress?.completed_steps ?? []}
            onStepComplete={handleStepComplete}
          />
        </div>
        <div>
          <BadgeStatus
            badge={badge}
            currentStep={progress?.current_step ?? 0}
            completedSteps={progress?.completed_steps ?? []}
            startedAt={progress?.started_at}
          />
        </div>
      </div>
    </div>
  )
}