export interface Program {
  id: string;
  category_id: string;
  name: string;
  description?: string;
  icon?: string;
  order_index: number;
  created_at: string;
}

export interface Course {
  id: string;
  program_id: string;
  name: string;
  description?: string;
  difficulty_level: number;
  duration?: string;
  order_index: number;
  created_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: number;
  points: number;
  requirements: {
    prerequisites?: string[];
    conditions?: string[];
  } | null;
  steps: {
    order: number;
    title: string;
    description: string;
    validation_type: 'automatic' | 'manual';
    validation_rules?: any;
  }[];
  created_at: string;
}

export interface CourseBadge {
  id: string;
  course_id: string;
  badge_id: string;
  order_index: number;
  required: boolean;
  created_at: string;
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


export interface UserProgress {
  id: string;
  user_id: string;
  badge_id: string;
  course_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  current_step: number;
  completed_steps: number[];
  started_at: string;
  completed_at?: string;
}