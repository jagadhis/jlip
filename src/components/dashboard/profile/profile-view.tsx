import { DashboardShell } from '@/components/shell';
import ProfileHeader from './profile-header';
import BadgeProgress from './badge-progress';

export default function ProfileView() {
  return (
    <DashboardShell>
      <div className="space-y-6 p-4">
        <ProfileHeader />
        <BadgeProgress />
      </div>
    </DashboardShell>
  );
}