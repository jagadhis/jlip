'use client'

import { Course, Badge } from '@/types/admin'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge as UIBadge } from '@/components/ui/badge'
import { difficultyColors, DifficultyLevel, getDifficultyColor } from '@/lib/color'
import Link from 'next/link'

interface CourseWithBadges extends Course {
  badges: Badge[]
}

interface CourseListProps {
  courses: CourseWithBadges[]
}

export function CourseList({ courses }: CourseListProps) {
  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <Link
          key={course.id}
          href={`/dashboard/explore/courses/${course.id}`}
        >
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div>
                <h3 className="font-semibold">{course.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {course.description}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <UIBadge className={getDifficultyColor(course.difficulty_level)}>
                  Level {course.difficulty_level}
                </UIBadge>

                {course.duration && (
                  <UIBadge variant="outline">
                    {course.duration}
                  </UIBadge>
                )}
              </div>
              {course.badges.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-muted-foreground mb-2">
                    Available Badges:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {course.badges.map((badge) => (
                      <div key={badge.id} className="flex items-center">
                        <span className="text-xl mr-1">{badge.icon}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}