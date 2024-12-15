'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Compass, Award, User, LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const navigation = [
  {
    name: 'Explore',
    href: '/dashboard/explore',
    icon: Compass
  },
  {
    name: 'Badges',
    href: '/dashboard/badges',
    icon: Award
  },
  {
    name: 'Profile',
    href: '/dashboard/profile',
    icon: User
  },
]

export function MobileNav() {
  const pathname = usePathname()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-background">
      <div className="flex items-center justify-around h-16">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          )
        })}
        <button
          onClick={handleSignOut}
          className="flex flex-col items-center justify-center w-full h-full text-muted-foreground"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-xs mt-1">Logout</span>
        </button>
      </div>
    </nav>
  )
}