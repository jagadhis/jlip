import { DashboardShell } from '@/components/shell';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, Star, Trophy } from 'lucide-react';
import Link from 'next/link';
import BadgeDescription from './badge-details/description';
import BadgeSteps from './badge-details/steps';
import BadgeStatus from './badge-details/status';

interface BadgeDetailsViewProps {
  id: string;
}

export default function BadgeDetailsView({ id }: BadgeDetailsViewProps) {
  return (
    <DashboardShell>
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="p-4">
          <Link href="/badges">
            <Button variant="ghost" size="sm" className="mb-2">
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to Badges
            </Button>
          </Link>
        </div>
      </div>

      {/* Badge Content */}
      <div className="p-4 space-y-4">
        {/* Badge Preview */}
        <div className="bg-white rounded-xl p-6 text-center shadow-md">
          <div className="w-32 h-32 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Trophy className="w-16 h-16 text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Google Sheets Ace</h1>
          <div className="flex justify-center mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 text-yellow-400 fill-yellow-400"
              />
            ))}
          </div>
          <Button className="w-full bg-green-500 hover:bg-green-600">
            Add to Wallet
          </Button>
        </div>

        {/* Badge Details Tabs */}
        <Tabs defaultValue="description" className="bg-white rounded-xl shadow-md">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="steps">Steps</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
          </TabsList>

          <TabsContent value="description">
            <BadgeDescription />
          </TabsContent>

          <TabsContent value="steps">
            <BadgeSteps />
          </TabsContent>

          <TabsContent value="status">
            <BadgeStatus />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
}