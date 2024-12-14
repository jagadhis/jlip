// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Get session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // No session = redirect to auth
  if (!session) {
    if (req.nextUrl.pathname !== '/auth') {
      return NextResponse.redirect(new URL('/auth', req.url))
    }
    return res
  }

  // Get admin status
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', session.user.id)
    .single()

  const isAdmin = !!profile?.is_admin
  const path = req.nextUrl.pathname

  // If user is on auth page and logged in
  if (path === '/auth' && session) {
    return NextResponse.redirect(
      new URL(isAdmin ? '/admin' : '/dashboard/explore', req.url)
    )
  }

  // Admin routes protection
  if (path.startsWith('/admin')) {
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/dashboard/explore', req.url))
    }
    return res
  }

  // Non-admin route protection
  if (path.startsWith('/dashboard')) {
    if (isAdmin) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
    if (path === '/dashboard') {
      return NextResponse.redirect(new URL('/dashboard/explore', req.url))
    }
    return res
  }

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}