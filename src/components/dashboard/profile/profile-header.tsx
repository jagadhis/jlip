import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

export default function ProfileHeader() {
  return (
    <Card className="p-6">
      <div className="flex items-center space-x-4">
        <Avatar className="w-20 h-20">
          <AvatarImage src="/placeholder-avatar.png" />
          <AvatarFallback>EX</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Explorer Name</h1>
          <div className="flex items-center mt-1">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="ml-1">Level 5 Explorer</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Completed 12 challenges
          </p>
        </div>
      </div>
    </Card>
  );
}