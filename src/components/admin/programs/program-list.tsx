'use client'

import { useCallback } from 'react'
import { Program, Category } from '@/types/admin'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'

interface ProgramListProps {
  programs: Program[]
  categories: Category[]
  onEdit: (program: Program) => void
  onDelete: (id: string) => void
}

export function ProgramList({ programs, categories, onEdit, onDelete }: ProgramListProps) {
  const getCategoryName = useCallback((categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'Unknown Category'
  }, [categories])

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
        <tr className="bg-gray-50">
          <th className="px-4 py-3 text-left">Name</th>
          <th className="px-4 py-3 text-left">Category</th>
          <th className="px-4 py-3 text-left">Icon</th>
          <th className="px-4 py-3 text-left">Order</th>
          <th className="px-4 py-3 text-right">Actions</th>
        </tr>
        </thead>
        <tbody>
        {programs.map((program) => (
          <tr key={program.id} className="border-t">
            <td className="px-4 py-3">{program.name}</td>
            <td className="px-4 py-3">{getCategoryName(program.category_id)}</td>
            <td className="px-4 py-3">{program.icon}</td>
            <td className="px-4 py-3">{program.order_index}</td>
            <td className="px-4 py-3">
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(program)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(program.id)}
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