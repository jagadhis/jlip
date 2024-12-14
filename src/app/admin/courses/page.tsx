'use client'

import { useState, useEffect } from 'react'
import { Course, Program } from '@/types/admin'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { CourseList } from '@/components/admin/courses/course-list'
import { CourseForm } from '@/components/admin/courses/course-form'
import { BadgeAssignment } from '@/components/admin/courses/badge-assignment'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'
import { CoursePreview } from '@/components/admin/courses/courses-preview'

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [programs, setPrograms] = useState<Program[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
  const [isBadgeDialogOpen, setIsBadgeDialogOpen] = useState(false)
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)

  const { toast } = useToast()

  useEffect(() => {
    fetchCourses()
    fetchPrograms()
  }, [])

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('order_index')

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch courses',
        variant: 'destructive',
      })
      return
    }

    setCourses(data || [])
  }

  const fetchPrograms = async () => {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('order_index')

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch programs',
        variant: 'destructive',
      })
      return
    }

    setPrograms(data || [])
  }

  const handleSubmit = async (formData: Partial<Course>) => {
    try {
      if (selectedCourse) {
        const { error } = await supabase
          .from('courses')
          .update(formData)
          .eq('id', selectedCourse.id)

        if (error) throw error

        toast({
          title: 'Success',
          description: 'Course updated successfully',
        })
      } else {
        const { error } = await supabase
          .from('courses')
          .insert(formData)

        if (error) throw error

        toast({
          title: 'Success',
          description: 'Course created successfully',
        })
      }

      setIsFormDialogOpen(false)
      fetchCourses()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save course',
        variant: 'destructive',
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast({
        title: 'Success',
        description: 'Course deleted successfully',
      })

      fetchCourses()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete course',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Button onClick={() => {
          setSelectedCourse(null)
          setIsFormDialogOpen(true)
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </Button>
      </div>

      <CourseList
        courses={courses}
        programs={programs}
        onEdit={(course) => {
          setSelectedCourse(course)
          setIsFormDialogOpen(true)
        }}
        onDelete={handleDelete}
        onManageBadges={(course) => {
          setSelectedCourse(course)
          setIsBadgeDialogOpen(true)
        }}
        onPreview={(course) => {
          setSelectedCourse(course)
          setIsPreviewDialogOpen(true)
        }}
      />

      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedCourse ? 'Edit Course' : 'Create Course'}
            </DialogTitle>
          </DialogHeader>
          <CourseForm
            initialData={selectedCourse || undefined}
            programs={programs}
            onSubmit={handleSubmit}
            onCancel={() => setIsFormDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isBadgeDialogOpen} onOpenChange={setIsBadgeDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Manage Badges - {selectedCourse?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <BadgeAssignment
              course={selectedCourse}
              onClose={() => setIsBadgeDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Course Preview</DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <CoursePreview course={selectedCourse} />
          )}
        </DialogContent>
      </Dialog>

    </div>
  )
}