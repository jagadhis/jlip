// components/admin/require-admin.tsx
'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/auth')
        return
      }

      const { data } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', session.user.id)
        .single()

      if (!data?.is_admin) {
        router.push('/dashboard/explore')
      }
    }

    checkAdmin()
  }, [])

  return <>{children}</>
}