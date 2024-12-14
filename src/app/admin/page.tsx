'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {
  useEffect(() => {
    async function checkAdmin() {
      const { data: { session } } = await supabase.auth.getSession()
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', session?.user?.id)
        .single()

      console.log('Session:', session)
      console.log('Profile:', profile)
    }
    checkAdmin()
  }, [])

  return <div>Admin Dashboard</div>
}