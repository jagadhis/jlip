'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/types/admin'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { BadgeList } from '@/components/admin/badges/badge-list'
import { BadgeForm } from '@/components/admin/badges/badge-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

export default function BadgesPage() {
  const [badges, setBadges] = useState<Badge[]>([])
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchBadges()
  }, [])

  const fetchBadges = async () => {
    const { data, error } = await supabase
      .from('badges')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch badges',
        variant: 'destructive',
      })
      return
    }

    setBadges(data || [])
  }

  const handleSubmit = async (formData: Partial<Badge>) => {
    try {
      if (selectedBadge) {
        // Update
        const { error } = await supabase
          .from('badges')
          .update(formData)
          .eq('id', selectedBadge.id)

        if (error) throw error

        toast({
          title: 'Success',
          description: 'Badge updated successfully',
        })
      } else {
        // Create
        const { error } = await supabase
          .from('badges')
          .insert(formData)

        if (error) throw error

        toast({
          title: 'Success',
          description: 'Badge created successfully',
        })
      }

      setIsDialogOpen(false)
      fetchBadges()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save badge',
        variant: 'destructive',
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('badges')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast({
        title: 'Success',
        description: 'Badge deleted successfully',
      })

      fetchBadges()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete badge',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Badges</h1>
        <Button onClick={() => {
          setSelectedBadge(null)
          setIsDialogOpen(true)
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Badge
        </Button>
      </div>

      <BadgeList
        badges={badges}
        onEdit={(badge) => {
          setSelectedBadge(badge)
          setIsDialogOpen(true)
        }}
        onDelete={handleDelete}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedBadge ? 'Edit Badge' : 'Create Badge'}
            </DialogTitle>
          </DialogHeader>
          <BadgeForm
            initialData={selectedBadge || undefined}
            onSubmit={handleSubmit}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}