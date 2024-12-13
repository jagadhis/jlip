import { Card } from '@/components/ui/card';
import { Gamepad2, GraduationCap, Heart, Wallet } from 'lucide-react';

const categories = [
  {
    id: 'lifestyle',
    title: 'Lifestyle',
    icon: Gamepad2,
    color: 'bg-purple-100 hover:bg-purple-200'
  },
  {
    id: 'finance',
    title: 'Finance',
    icon: Wallet,
    color: 'bg-green-100 hover:bg-green-200'
  },
  {
    id: 'health',
    title: 'Health',
    icon: Heart,
    color: 'bg-red-100 hover:bg-red-200'
  },
  {
    id: 'education',
    title: 'Education',
    icon: GraduationCap,
    color: 'bg-blue-100 hover:bg-blue-200'
  }
];

export default function CategoryGrid() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Choose Your Adventure! 🚀</h2>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card
              key={category.id}
              className={`${category.color} p-6 cursor-pointer transition-all hover:scale-105`}
            >
              <div className="flex flex-col items-center text-center">
                <Icon className="w-10 h-10 mb-2" />
                <h3 className="font-semibold">{category.title}</h3>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}