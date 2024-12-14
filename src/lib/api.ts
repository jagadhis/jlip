import { supabase } from '@/lib/supabase'
import { UserProgress } from '@/types/database.types'

export const api = {
  categories: {
    getWithPrograms: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select(`
          *,
          programs: programs(
            *,
            courses: courses(
              *,
              course_badges(
                *,
                badges(*)
              )
            )
          )
        `)
        .order('order_index')

      if (error) throw error
      return data
    }
  },

  programs: {
    getWithCourses: async (categoryId: string) => {
      const { data, error } = await supabase
        .from('programs')
        .select(`
          *,
          courses: courses(
            *,
            course_badges(
              *,
              badges(*)
            )
          )
        `)
        .eq('category_id', categoryId)
        .order('order_index')

      if (error) throw error
      return data
    }
  },

  courses: {
    getWithBadges: async (programId: string) => {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          course_badges(
            *,
            badges(*)
          )
        `)
        .eq('program_id', programId)
        .order('order_index')

      if (error) throw error
      return data
    }
  },

  userProgress: {
    getProgress: async (userId: string) => {
      const { data, error } = await supabase
        .from('user_progress')
        .select(`
          *,
          badges(*),
          courses(*)
        `)
        .eq('user_id', userId)

      if (error) throw error
      return data
    },

    updateProgress: async (userId: string, badgeId: string, courseId: string, updates: Partial<UserProgress>) => {
      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          badge_id: badgeId,
          course_id: courseId,
          ...updates
        })

      if (error) throw error
      return data
    }
  }
}