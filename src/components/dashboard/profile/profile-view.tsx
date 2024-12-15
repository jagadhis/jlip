'use client'

import { ProfileHeader } from './profile-header'
import { BadgeProgress } from './badge-progress'
import { DashboardShell } from '@/components/shell'

export function ProfileView() {
  return (
    <DashboardShell>
      <div className="space-y-8">
        <ProfileHeader />
        <BadgeProgress />
      </div>
    </DashboardShell>
  )
}