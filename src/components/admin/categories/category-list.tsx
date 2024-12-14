'use client'

import { useCallback } from 'react'
import { Category } from '@/types/admin'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'

interface CategoryListProps {
  categories: Category[]
  onEdit: (category: Category) => void
  onDelete: (id: string) => void
}

export function CategoryList({ categories, onEdit, onDelete }: CategoryListProps) {
  const renderCategoryColor = useCallback((color: string) => {
    return (
      <div
        className="w-6 h-6 rounded-full"
        style={{ backgroundColor: color }}
      />
    )
  }, [])

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
        <tr className="bg-gray-50">
          <th className="px-4 py-3 text-left">Name</th>
          <th className="px-4 py-3 text-left">Icon</th>
          <th className="px-4 py-3 text-left">Color</th>
          <th className="px-4 py-3 text-left">Order</th>
          <th className="px-4 py-3 text-right">Actions</th>
        </tr>
        </thead>
        <tbody>
        {categories.map((category) => (
          <tr key={category.id} className="border-t">
            <td className="px-4 py-3">{category.name}</td>
            <td className="px-4 py-3">{category.icon}</td>
            <td className="px-4 py-3">
              {renderCategoryColor(category.color)}
            </td>
            <td className="px-4 py-3">{category.order_index}</td>
            <td className="px-4 py-3">
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(category)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(category.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}