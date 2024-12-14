// app/auth/callback/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })

    try {
      await supabase.auth.exchangeCodeForSession(code)
      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', session.user.id)
          .single()

        return NextResponse.redirect(
          new URL(
            profile?.is_admin ? '/admin' : '/dashboard/explore',
            requestUrl.origin
          )
        )
      }
    } catch (error) {
      // Handle error
      return NextResponse.redirect(
        new URL('/auth?error=server_error', requestUrl.origin)
      )
    }
  }

  return NextResponse.redirect(new URL('/auth', requestUrl.origin))
}