'use client'

import { useState, useEffect } from 'react'
import { Badge, UserProgress } from '@/types/admin'
import { Progress } from '@/components/ui/progress'
import { supabase } from '@/lib/supabase'
import { useUser } from '@/hooks/use-user'
import { BadgeCard } from '../badges/badge-card'

export function BadgeProgress() {
  const [userBadges, setUserBadges] = useState<(Badge & { progress: UserProgress })[]>([])
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      fetchUserBadges()
    }
  }, [user?.id])

  const fetchUserBadges = async () => {
    const { data, error } = await supabase
      .from('user_progress')
      .select(`
        *,
        badge:badges (*)
      `)
      .eq('user_id', user?.id)
      .order('started_at', { ascending: false })

    if (error) return

    const badges = data.map(progress => ({
      ...progress.badge,
      progress: {
        status: progress.status,
        current_step: progress.current_step,
        completed_steps: progress.completed_steps,
        started_at: progress.started_at,
        completed_at: progress.completed_at
      }
    }))

    setUserBadges(badges)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Your Badges</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userBadges.map((badge) => (
          <div key={badge.id} className="space-y-2">
            <BadgeCard badge={badge} />
            <Progress
              value={(badge.progress.completed_steps.length / badge.steps.length) * 100}
            />
          </div>
        ))}
      </div>
    </div>
  )
}