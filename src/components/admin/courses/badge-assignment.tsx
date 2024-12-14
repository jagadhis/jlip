'use client'

import { useState, useEffect } from 'react'
import { Badge, Course, CourseBadge } from '@/types/admin'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Badge as UIBadge } from '@/components/ui/badge'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

interface BadgeAssignmentProps {
  course: Course
  onClose: () => void
}

export function BadgeAssignment({ course, onClose }: BadgeAssignmentProps) {
  const [badges, setBadges] = useState<Badge[]>([])
  const [courseBadges, setCourseBadges] = useState<CourseBadge[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchBadges()
    fetchCourseBadges()
  }, [course.id])

  const fetchBadges = async () => {
    const { data, error } = await supabase
      .from('badges')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch badges',
        variant: 'destructive',
      })
      return
    }

    setBadges(data || [])
  }

  const fetchCourseBadges = async () => {
    const { data, error } = await supabase
      .from('course_badges')
      .select('*')
      .eq('course_id', course.id)
      .order('order_index')

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch course badges',
        variant: 'destructive',
      })
      return
    }

    setCourseBadges(data || [])
    setLoading(false)
  }

  const handleAssignment = async (badgeId: string, isAssigned: boolean) => {
    try {
      if (isAssigned) {
        // Add badge to course
        const maxOrder = Math.max(...courseBadges.map(cb => cb.order_index), -1)
        const { error } = await supabase
          .from('course_badges')
          .insert({
            course_id: course.id,
            badge_id: badgeId,
            order_index: maxOrder + 1,
            required: false
          })

        if (error) throw error
      } else {
        // Remove badge from course
        const { error } = await supabase
          .from('course_badges')
          .delete()
          .eq('course_id', course.id)
          .eq('badge_id', badgeId)

        if (error) throw error
      }

      await fetchCourseBadges()
      toast({
        title: 'Success',
        description: `Badge ${isAssigned ? 'assigned to' : 'removed from'} course`,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update badge assignment',
        variant: 'destructive',
      })
    }
  }

  const updateRequired = async (badgeId: string, required: boolean) => {
    try {
      const { error } = await supabase
        .from('course_badges')
        .update({ required })
        .eq('course_id', course.id)
        .eq('badge_id', badgeId)

      if (error) throw error

      await fetchCourseBadges()
      toast({
        title: 'Success',
        description: `Badge ${required ? 'marked as required' : 'marked as optional'}`,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update badge requirement',
        variant: 'destructive',
      })
    }
  }

  const updateOrder = async (badgeId: string, order: number) => {
    try {
      const { error } = await supabase
        .from('course_badges')
        .update({ order_index: order })
        .eq('course_id', course.id)
        .eq('badge_id', badgeId)

      if (error) throw error

      await fetchCourseBadges()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update badge order',
        variant: 'destructive',
      })
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Assigned</TableHead>
            <TableHead>Badge</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Required</TableHead>
            <TableHead>Order</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {badges.map((badge) => {
            const courseBadge = courseBadges.find(cb => cb.badge_id === badge.id)
            const isAssigned = !!courseBadge

            return (
              <TableRow key={badge.id}>
                <TableCell>
                  <Checkbox
                    checked={isAssigned}
                    onCheckedChange={(checked) =>
                      handleAssignment(badge.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span>{badge.icon}</span>
                    <span className="font-medium">{badge.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <UIBadge variant="outline">
                    Level {badge.difficulty}
                  </UIBadge>
                </TableCell>
                <TableCell>{badge.points}</TableCell>
                <TableCell>
                  {isAssigned && (
                    <Checkbox
                      checked={courseBadge.required}
                      onCheckedChange={(checked) =>
                        updateRequired(badge.id, checked as boolean)
                      }
                    />
                  )}
                </TableCell>
                <TableCell>
                  {isAssigned && (
                    <Input
                      type="number"
                      value={courseBadge.order_index}
                      onChange={(e) =>
                        updateOrder(badge.id, parseInt(e.target.value))
                      }
                      className="w-20"
                    />
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <div className="flex justify-end">
        <Button onClick={onClose}>Done</Button>
      </div>
    </div>
  )
}