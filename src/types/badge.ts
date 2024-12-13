export interface Badge {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'available' | 'in_progress' | 'completed';
  imageUrl?: string;
  stars: number;
}

export interface BadgeDetails extends Badge {
  steps: BadgeStep[];
  requirements: string[];
  learningOutcomes: string[];
}

export interface BadgeStep {
  id: number;
  title: string;
  description: string;
  status: 'locked' | 'available' | 'completed';
}
