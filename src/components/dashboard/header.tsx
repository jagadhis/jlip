'use client'

import Link from 'next/link'
import { useUser } from '@/hooks/use-user'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function Header() {
  const { user } = useUser()

  return (
    <header className="border-b">
      <div className="p-4 flex items-center justify-between">
        <Link href="/dashboard" className="text-xl font-bold">
          LearningQuest
        </Link>
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            {user?.email?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}