import { Card, CardContent } from '@/components/ui/card';
import { Badge as BadgeType } from '@/types/badge';
import { Star, Trophy } from 'lucide-react';
import Link from 'next/link';

interface BadgeCardProps {
  badge: BadgeType;
}

export default function BadgeCard({ badge }: BadgeCardProps) {
  return (
    <Link href={`/badges/${badge.id}`}>
      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="aspect-square rounded-lg bg-blue-100 mb-3 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-blue-500" />
          </div>
          <h3 className="font-bold text-sm mb-1">{badge.title}</h3>
          <div className="flex mb-2">
            {Array.from({ length: badge.stars }).map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 text-yellow-400 fill-yellow-400"
              />
            ))}
          </div>
          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
            {badge.status}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}