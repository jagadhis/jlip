'use client'

import { useEffect, useState } from 'react'
import { Course, Badge } from '@/types/admin'
import { CourseList } from '@/components/dashboard/explore/course-list'
import { supabase } from '@/lib/supabase'
import { use } from 'react'

interface CourseBadge {
  badge_id: string;
  badges: Badge;
}

interface CourseWithBadges extends Course {
  course_badges: CourseBadge[];
  badges: Badge[];
}

export default function ProgramPage({ params }: { params: Promise<{ programId: string }> }) {
  const resolvedParams = use(params)
  const [courses, setCourses] = useState<CourseWithBadges[]>([])

  useEffect(() => {
    fetchCourses()
  }, [resolvedParams.programId])

  const fetchCourses = async () => {
    const { data: coursesData } = await supabase
      .from('courses')
      .select(`
        *,
        course_badges (
          badge_id,
          badges (*)
        )
      `)
      .eq('program_id', resolvedParams.programId)
      .order('order_index')

    if (coursesData) {
      const coursesWithBadges = coursesData.map(course => ({
        ...course,
        badges: course.course_badges.map((cb: CourseBadge) => cb.badges)
      }))
      setCourses(coursesWithBadges)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Courses</h1>
      <CourseList courses={courses} />
    </div>
  )
}