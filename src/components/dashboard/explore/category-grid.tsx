'use client'

import { Category } from '@/types/admin'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

interface CategoryGridProps {
  categories: Category[]
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Link key={category.id} href={`/dashboard/explore/${category.id}`}>
          <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            style={{ borderColor: category.color }}
          >
            <CardHeader>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{category.icon}</span>
                <CardTitle>{category.name}</CardTitle>
              </div>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}