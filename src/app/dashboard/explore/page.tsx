'use client'

import { useEffect, useState } from 'react'
import { Category } from '@/types/admin'
import { CategoryGrid } from '@/components/dashboard/explore/category-grid'
import { supabase } from '@/lib/supabase'

export default function ExplorePage() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('order_index')

    if (data) {
      setCategories(data)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Explore</h1>
      <CategoryGrid categories={categories} />
    </div>
  )
}