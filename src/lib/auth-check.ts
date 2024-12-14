// lib/auth-check.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

export async function checkAdminStatus() {
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) return false

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', session.user.id)
    .single()

  return !!profile?.is_admin
}