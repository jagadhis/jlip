'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/types/admin'
import { Plus, Trash2 } from 'lucide-react'

interface BadgeFormProps {
  initialData?: Badge
  onSubmit: (data: Partial<Badge>) => Promise<void>
  onCancel: () => void
}

export function BadgeForm({ initialData, onSubmit, onCancel }: BadgeFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    icon: initialData?.icon || '',
    difficulty: initialData?.difficulty || 1,
    points: initialData?.points || 0,
    requirements: initialData?.requirements || {
      prerequisites: [],
      conditions: []
    },
    steps: initialData?.steps || [{
      order: 1,
      title: '',
      description: '',
      validation_type: 'manual' as const
    }]
  })

  const addStep = () => {
    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, {
        order: prev.steps.length + 1,
        title: '',
        description: '',
        validation_type: 'manual' as const
      }]
    }))
  }

  const removeStep = (index: number) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
        .map((step, i) => ({ ...step, order: i + 1 }))
    }))
  }

  const updateStep = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.map((step, i) =>
        i === index ? { ...step, [field]: value } : step
      )
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Badge Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="icon">Icon</Label>
          <Input
            id="icon"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select
            value={formData.difficulty.toString()}
            onValueChange={(value) => setFormData({ ...formData, difficulty: parseInt(value) })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
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
          <Label htmlFor="points">Points</Label>
          <Input
            id="points"
            type="number"
            value={formData.points}
            onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Steps</Label>
          <Button type="button" variant="outline" size="sm" onClick={addStep}>
            <Plus className="h-4 w-4 mr-2" />
            Add Step
          </Button>
        </div>

        {formData.steps.map((step, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Step {step.order}</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeStep(index)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={step.title}
                  onChange={(e) => updateStep(index, 'title', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={step.description}
                  onChange={(e) => updateStep(index, 'description', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label>Validation Type</Label>
                <Select
                  value={step.validation_type}
                  onValueChange={(value) => updateStep(index, 'validation_type', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update' : 'Create'} Badge
        </Button>
      </div>
    </form>
  )
}