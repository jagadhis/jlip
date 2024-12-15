'use client'

import { Program } from '@/types/admin'
import { Card, CardHeader } from '@/components/ui/card'
import Link from 'next/link'

interface ProgramListProps {
  programs: Program[]
}

export function ProgramList({ programs }: ProgramListProps) {
  return (
    <div className="space-y-4">
      {programs.map((program) => (
        <Link
          key={program.id}
          href={`/dashboard/explore/programs/${program.id}`}
        >
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{program.icon}</span>
                <div>
                  <h3 className="font-semibold">{program.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {program.description}
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}