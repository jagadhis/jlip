import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Trophy, Medal } from 'lucide-react';

export default function BadgeProgress() {
  return (
    <Tabs defaultValue="ongoing" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="ongoing">
          <Trophy className="mr-2 h-4 w-4" />
          In Progress
        </TabsTrigger>
        <TabsTrigger value="completed">
          <Medal className="mr-2 h-4 w-4" />
          Completed
        </TabsTrigger>
      </TabsList>

      <TabsContent value="ongoing">
        <div className="grid grid-cols-2 gap-4">
          {/* Ongoing Badges */}
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-4">
              <div className="aspect-square rounded-lg bg-blue-100 mb-2 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-medium text-sm">Ongoing Badge {i}</h3>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="completed">
        <div className="grid grid-cols-2 gap-4">
          {/* Completed Badges */}
          {[1, 2].map((i) => (
            <Card key={i} className="p-4">
              <div className="aspect-square rounded-lg bg-green-100 mb-2 flex items-center justify-center">
                <Medal className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-medium text-sm">Completed Badge {i}</h3>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}