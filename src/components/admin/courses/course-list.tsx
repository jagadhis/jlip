'use client'

import { useCallback } from 'react'
import { Course, Program } from '@/types/admin'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2, Award, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface CourseListProps {
  courses: Course[]
  programs: Program[]
  onEdit: (course: Course) => void
  onDelete: (id: string) => void
  onManageBadges: (course: Course) => void
  onPreview: (course: Course) => void
}

export function CourseList({ courses, programs, onEdit, onDelete, onManageBadges, onPreview }: CourseListProps) {
  const getProgramName = useCallback((programId: string) => {
    return programs.find(prog => prog.id === programId)?.name || 'Unknown Program'
  }, [programs])

  const getDifficultyBadge = useCallback((level: number) => {
    const colors = {
      1: 'bg-green-100 text-green-800',
      2: 'bg-blue-100 text-blue-800',
      3: 'bg-yellow-100 text-yellow-800',
      4: 'bg-orange-100 text-orange-800',
      5: 'bg-red-100 text-red-800'
    }

    return (
      <Badge className={colors[level as keyof typeof colors]}>
        Level {level}
      </Badge>
    )
  }, [])

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
        <tr className="bg-gray-50">
          <th className="px-4 py-3 text-left">Name</th>
          <th className="px-4 py-3 text-left">Program</th>
          <th className="px-4 py-3 text-left">Difficulty</th>
          <th className="px-4 py-3 text-left">Duration</th>
          <th className="px-4 py-3 text-left">Order</th>
          <th className="px-4 py-3 text-right">Actions</th>
        </tr>
        </thead>
        <tbody>
        {courses.map((course) => (
          <tr key={course.id} className="border-t">
            <td className="px-4 py-3">{course.name}</td>
            <td className="px-4 py-3">{getProgramName(course.program_id)}</td>
            <td className="px-4 py-3">{getDifficultyBadge(course.difficulty_level)}</td>
            <td className="px-4 py-3">{course.duration}</td>
            <td className="px-4 py-3">{course.order_index}</td>
            <td className="px-4 py-3">
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(course)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onManageBadges(course)}
                >
                  <Award className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onPreview(course)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(course.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}