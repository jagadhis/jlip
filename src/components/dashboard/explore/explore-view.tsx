'use client'

import { useEffect, useState } from 'react'
import { Category } from '@/types/admin'
import { CategoryGrid } from './category-grid'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'
import { DashboardShell } from '@/components/shell'

export function ExploreView() {
  const [categories, setCategories] = useState<Category[]>([])
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
        variant: 'destructive'
      })
      return
    }

    setCategories(data)
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Explore Learning Paths</h1>
        <CategoryGrid categories={categories} />
      </div>
    </DashboardShell>
  )
}