'use client'

import { useEffect, useState } from 'react'
import { Course, Badge } from '@/types/admin'
import { supabase } from '@/lib/supabase'
import { use } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge as UIBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Clock, Award, ChevronRight } from 'lucide-react'
import { getDifficultyColor } from '@/lib/color'


interface CourseBadge {
  badge_id: string;
  badges: Badge;
  required: boolean;
  order_index: number;
}

interface CourseDetail extends Course {
  course_badges: CourseBadge[];
}

export default function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = use(params)
  const [course, setCourse] = useState<CourseDetail | null>(null)

  useEffect(() => {
    fetchCourseDetails()
  }, [resolvedParams.courseId])

  const fetchCourseDetails = async () => {
    const { data } = await supabase
      .from('courses')
      .select(`
        *,
        course_badges (
          badge_id,
          required,
          order_index,
          badges (*)
        )
      `)
      .eq('id', resolvedParams.courseId)
      .single()

    if (data) {
      setCourse(data)
    }
  }

  if (!course) return null

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{course.name}</h1>
            <div className="flex items-center gap-2">
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
          <p className="text-muted-foreground">{course.description}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h2 className="font-semibold">Your Progress</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Progress value={0} />
            <p className="text-sm text-muted-foreground">
              Start this course to track your progress
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Badges to Earn</h2>
        {course.course_badges
          .sort((a, b) => a.order_index - b.order_index)
          .map(({ badges: badge, required }) => (
            <Card key={badge.id} className="group cursor-pointer hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{badge.icon}</span>
                    <div>
                      <h3 className="font-semibold">{badge.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {required && (
                      <UIBadge variant="outline" className="bg-yellow-50">
                        Required
                      </UIBadge>
                    )}
                    <UIBadge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Award className="h-3 w-3" />
                      {badge.points} points
                    </UIBadge>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
      </div>

      <div className="fixed bottom-20 left-0 right-0 p-4 bg-background border-t">
        <Button className="w-full" size="lg">
          Start Course
        </Button>
      </div>
    </div>
  )
}