// hooks/use-user.ts
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Profile } from '@/types/supabase'

interface UserWithProfile extends Profile {
  user_metadata?: {
    name?: string
    avatar_url?: string
  }
}

export function useUser() {
  const [user, setUser] = useState<UserWithProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        checkUser()
      } else {
        setUser(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        setUser(null)
        setLoading(false)
        return
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (error || !profile) {
        // Create default user profile if it doesn't exist
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            id: session.user.id,
            email: session.user.email!,
            is_admin: false
          })
          .select()
          .single()

        if (!createError && newProfile) {
          setUser({
            ...newProfile,
            user_metadata: session.user.user_metadata
          })
        }
      } else {
        setUser({
          ...profile,
          user_metadata: session.user.user_metadata
        })
      }
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    isAdmin: user?.is_admin ?? false
  }
}