'use client'

import { useUser } from '@/hooks/use-user'
import { usePathname, redirect } from 'next/navigation'
import { Header } from '@/components/dashboard/header'
import { MobileNav } from '@/components/dashboard/mobile-nav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading, isAdmin } = useUser()
  const pathname = usePathname()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    )
  }

  if (!user) {
    redirect('/auth')
  }

  if (isAdmin && pathname.startsWith('/dashboard')) {
    redirect('/admin')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 py-4 pb-20">
        {children}
      </main>
      <MobileNav />
    </div>
  )
}