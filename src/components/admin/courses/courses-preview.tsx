'use client'

import { useEffect, useState } from 'react'
import { Badge, Course, CourseBadge } from '@/types/admin'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge as UIBadge } from '@/components/ui/badge'
import { Award, Check, Clock } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

interface CoursePreviewProps {
  course: Course
}

type BadgeWithDetails = Badge & {
  course_badge: CourseBadge
}

export function CoursePreview({ course }: CoursePreviewProps) {
  const [courseBadges, setCourseBadges] = useState<BadgeWithDetails[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchCourseBadges()
  }, [course.id])

  const fetchCourseBadges = async () => {
    const { data, error } = await supabase
      .from('course_badges')
      .select(`
        *,
        badge:badges (*)
      `)
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

    // Transform the data to match our BadgeWithDetails type
    const formattedBadges = data.map(item => ({
      ...item.badge,
      course_badge: {
        id: item.id,
        course_id: item.course_id,
        badge_id: item.badge_id,
        required: item.required,
        order_index: item.order_index
      }
    }))

    setCourseBadges(formattedBadges)
  }

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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{course.name}</CardTitle>
              <CardDescription className="mt-2">{course.description}</CardDescription>
            </div>
            <div className="flex gap-2">
              <UIBadge className={getDifficultyColor(course.difficulty_level)}>
                Level {course.difficulty_level}
              </UIBadge>
              {course.duration && (
                <UIBadge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {course.duration}
                </UIBadge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Award className="h-5 w-5" />
                Available Badges
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courseBadges.map((badge) => (
                  <Card key={badge.id} className="relative">
                    {badge.course_badge.required && (
                      <UIBadge
                        className="absolute top-2 right-2 bg-yellow-100 text-yellow-800"
                      >
                        Required
                      </UIBadge>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{badge.icon}</span>
                        <CardTitle>{badge.name}</CardTitle>
                      </div>
                      <CardDescription>{badge.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <UIBadge variant="outline" className="flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          {badge.points} points
                        </UIBadge>
                        <UIBadge className={getDifficultyColor(badge.difficulty)}>
                          Level {badge.difficulty}
                        </UIBadge>
                      </div>
                      <div className="mt-4 space-y-2">
                        {badge.steps.map((step, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <Check className="h-4 w-4 mt-0.5 text-green-500" />
                            <span>{step.title}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}