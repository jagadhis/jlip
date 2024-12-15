'use client'

import { useUser } from '@/hooks/use-user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function ProfileHeader() {
  const { user } = useUser()

  if (!user) return null

  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src={user.user_metadata?.avatar_url} />
        <AvatarFallback>
          {user.user_metadata?.name?.charAt(0) || user.email?.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-2xl font-bold">{user.user_metadata?.name || 'User'}</h1>
        <p className="text-muted-foreground">{user.email}</p>
      </div>
    </div>
  )
}