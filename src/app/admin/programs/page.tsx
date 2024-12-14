'use client'

import { useState, useEffect } from 'react'
import { Program, Category } from '@/types/admin'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { ProgramList } from '@/components/admin/programs/program-list'
import { ProgramForm } from '@/components/admin/programs/program-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchPrograms()
    fetchCategories()
  }, [])

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

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch categories',
        variant: 'destructive',
      })
      return
    }

    setCategories(data || [])
  }

  const handleSubmit = async (formData: Partial<Program>) => {
    try {
      if (selectedProgram) {
        // Update
        const { error } = await supabase
          .from('programs')
          .update(formData)
          .eq('id', selectedProgram.id)

        if (error) throw error

        toast({
          title: 'Success',
          description: 'Program updated successfully',
        })
      } else {
        // Create
        const { error } = await supabase
          .from('programs')
          .insert(formData)

        if (error) throw error

        toast({
          title: 'Success',
          description: 'Program created successfully',
        })
      }

      setIsDialogOpen(false)
      fetchPrograms()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save program',
        variant: 'destructive',
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast({
        title: 'Success',
        description: 'Program deleted successfully',
      })

      fetchPrograms()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete program',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Programs</h1>
        <Button onClick={() => {
          setSelectedProgram(null)
          setIsDialogOpen(true)
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Program
        </Button>
      </div>

      <ProgramList
        programs={programs}
        categories={categories}
        onEdit={(program) => {
          setSelectedProgram(program)
          setIsDialogOpen(true)
        }}
        onDelete={handleDelete}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedProgram ? 'Edit Program' : 'Create Program'}
            </DialogTitle>
          </DialogHeader>
          <ProgramForm
            initialData={selectedProgram || undefined}
            categories={categories}
            onSubmit={handleSubmit}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}