import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Link from 'next/link';

const badges = [
  {
    id: '1',
    title: 'Math Wizard',
    description: 'Master basic math skills',
    stars: 3,
    category: 'education'
  },
  // Add more badges
];

export default function BadgeList() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Available Badges 🏆</h2>
      <div className="space-y-4">
        {badges.map((badge) => (
          <Card key={badge.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold">{badge.title}</h3>
                <p className="text-sm text-gray-600">{badge.description}</p>
                <div className="flex mt-2">
                  {Array.from({ length: badge.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
              </div>
              <Link href={`/badges/${badge.id}`}>
                <Button>View Details</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}