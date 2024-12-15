'use client'

import { useEffect, useState } from 'react'
import { Program } from '@/types/admin'
import { ProgramList } from '@/components/dashboard/explore/program-list'
import { supabase } from '@/lib/supabase'
import { use } from 'react'

export default function CategoryPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const resolvedParams = use(params)
  const [programs, setPrograms] = useState<Program[]>([])

  useEffect(() => {
    fetchPrograms()
  }, [resolvedParams.categoryId])

  const fetchPrograms = async () => {
    const { data } = await supabase
      .from('programs')
      .select('*')
      .eq('category_id', resolvedParams.categoryId)
      .order('order_index')

    if (data) {
      setPrograms(data)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Programs</h1>
      <ProgramList programs={programs} />
    </div>
  )
}