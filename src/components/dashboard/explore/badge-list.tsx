'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge as UIBadge } from '@/components/ui/badge'
import { Award } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/types/admin'
import { supabase } from '@/lib/supabase'
import { difficultyColors } from '@/lib/color'


export function BadgeList() {
  const [badges, setBadges] = useState<Badge[]>([])

  useEffect(() => {
    fetchBadges()
  }, [])

  const fetchBadges = async () => {
    const { data, error } = await supabase
      .from('badges')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setBadges(data)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Available Badges 🏆</h2>
      <div className="space-y-4">
        {badges.map((badge) => (
          <Card key={badge.id} className="p-4">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{badge.icon}</span>
                  <h3 className="font-bold">{badge.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
                <div className="flex items-center gap-2">
                  <UIBadge variant="outline" className="flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    {badge.points} points
                  </UIBadge>
                  <UIBadge
                    className={difficultyColors[badge.difficulty as keyof typeof difficultyColors].full}
                  >
                    Level {badge.difficulty}
                  </UIBadge>
                </div>
              </div>
              <Link href={`/dashboard/badges/${badge.id}`}>
                <Button>View Details</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}