export const difficultyColors = {
  1: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    full: 'bg-green-100 text-green-800'
  },
  2: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    full: 'bg-blue-100 text-blue-800'
  },
  3: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    full: 'bg-yellow-100 text-yellow-800'
  },
  4: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    full: 'bg-orange-100 text-orange-800'
  },
  5: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    full: 'bg-red-100 text-red-800'
  }
} as const;

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export function getDifficultyColor(level: number) {
  return difficultyColors[level as DifficultyLevel].full;
}