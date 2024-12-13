import { DashboardShell } from '@/components/shell';
import BadgeGrid from './badge-grid';
import { Badge } from '@/types/badge';

const mockBadges: Badge[] = [
  {
    id: '1',
    title: 'Google Sheets Ace',
    description: 'Master spreadsheet skills with fun challenges!',
    category: 'education',
    status: 'available',
    imageUrl: '/badges/sheets.png',
    stars: 3
  },
  // Add more mock badges
];

export default function BadgesView() {
  return (
    <DashboardShell>
      <div className="p-4 space-y-6">
        <header>
          <h1 className="text-2xl font-bold mb-2">My Badges 🏆</h1>
          <p className="text-gray-600">Collect badges and show off your skills!</p>
        </header>
        <BadgeGrid badges={mockBadges} />
      </div>
    </DashboardShell>
  );
}