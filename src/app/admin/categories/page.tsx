// app/admin/categories/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Category } from '@/types/admin'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { CategoryList } from '@/components/admin/categories/category-list'
import { CategoryForm } from '@/components/admin/categories/category-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('order_index')

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

  const handleSubmit = async (formData: Partial<Category>) => {
    try {
      if (selectedCategory) {
        // Update
        const { error } = await supabase
          .from('categories')
          .update(formData)
          .eq('id', selectedCategory.id)

        if (error) throw error

        toast({
          title: 'Success',
          description: 'Category updated successfully',
        })
      } else {
        // Create
        const { error } = await supabase
          .from('categories')
          .insert(formData)

        if (error) throw error

        toast({
          title: 'Success',
          description: 'Category created successfully',
        })
      }

      setIsDialogOpen(false)
      fetchCategories()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save category',
        variant: 'destructive',
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast({
        title: 'Success',
        description: 'Category deleted successfully',
      })

      fetchCategories()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete category',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button onClick={() => {
          setSelectedCategory(null)
          setIsDialogOpen(true)
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <CategoryList
        categories={categories}
        onEdit={(category) => {
          setSelectedCategory(category)
          setIsDialogOpen(true)
        }}
        onDelete={handleDelete}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedCategory ? 'Edit Category' : 'Create Category'}
            </DialogTitle>
          </DialogHeader>
          <CategoryForm
            initialData={selectedCategory || undefined}
            onSubmit={handleSubmit}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}