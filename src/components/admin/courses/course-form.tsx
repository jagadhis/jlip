'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Course, Program } from '@/types/admin'

interface CourseFormProps {
  initialData?: Course
  programs: Program[]
  onSubmit: (data: Partial<Course>) => Promise<void>
  onCancel: () => void
}

export function CourseForm({ initialData, programs, onSubmit, onCancel }: CourseFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    program_id: initialData?.program_id || '',
    difficulty_level: initialData?.difficulty_level || 1,
    duration: initialData?.duration || '',
    order_index: initialData?.order_index || 0
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="program">Program</Label>
        <Select
          value={formData.program_id}
          onValueChange={(value) => setFormData({ ...formData, program_id: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a program" />
          </SelectTrigger>
          <SelectContent>
            {programs.map((program) => (
              <SelectItem key={program.id} value={program.id}>
                {program.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="name">Course Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="difficulty_level">Difficulty Level</Label>
        <Select
          value={formData.difficulty_level.toString()}
          onValueChange={(value) => setFormData({ ...formData, difficulty_level: parseInt(value) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select difficulty level" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((level) => (
              <SelectItem key={level} value={level.toString()}>
                Level {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="duration">Duration</Label>
        <Input
          id="duration"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          placeholder="e.g., 2 hours, 3 days"
        />
      </div>

      <div>
        <Label htmlFor="order_index">Order</Label>
        <Input
          id="order_index"
          type="number"
          value={formData.order_index}
          onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update' : 'Create'} Course
        </Button>
      </div>
    </form>
  )
}