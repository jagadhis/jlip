export type Badge = {
  id: string
  name: string
  description: string
  category_id: string
  icon: string
  difficulty: number
  steps: BadgeStep[]
  color: string
  created_at: string
}

export type BadgeStep = {
  title: string
  description: string
  order: number
}

export type Category = {
  id: string
  name: string
  icon: string
  color: string
  description?: string;
  order_index?: number;
  created_at?: string;
}