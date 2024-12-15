'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/types/admin'
import { BadgeGrid } from './badge-grid'
import { BadgeDetailsView } from './badge-details-view'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'
import { DashboardShell } from '@/components/shell'

interface BadgesViewProps {
  courseId?: string
}

export function BadgesView({ courseId }: BadgesViewProps) {
  const [badges, setBadges] = useState<Badge[]>([])
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchBadges()
  }, [courseId])

  const fetchBadges = async () => {
    const query = courseId
      ? supabase
        .from('course_badges')
        .select(`
            badge_id,
            required,
            order_index,
            badges (*)
          `)
        .eq('course_id', courseId)
        .order('order_index')
      : supabase
        .from('badges')
        .select('*')
        .order('created_at')

    const { data, error } = await query

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch badges',
        variant: 'destructive'
      })
      return
    }

    const badgeData = courseId
      ? data.map(item => ({
        ...item.badges,
        required: item.required,
        order_index: item.order_index
      }))
      : data

    setBadges(badgeData)
  }

  return (
    <>
      <DashboardShell>
        <BadgeGrid
          badges={badges}
          onBadgeClick={(badge) => setSelectedBadge(badge)}
        />

        <Dialog open={!!selectedBadge} onOpenChange={() => setSelectedBadge(null)}>
          <DialogHeader>
            <DialogTitle>{selectedBadge?.name}</DialogTitle>
          </DialogHeader>
          <DialogContent className="max-w-4xl">
            {selectedBadge && (
              <BadgeDetailsView
                badgeId={selectedBadge.id}
                courseId={courseId}
              />
            )}
          </DialogContent>
        </Dialog>
      </DashboardShell>
    </>
  )
}