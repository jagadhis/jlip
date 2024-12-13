import { BottomNavigation } from './shared/bottom-navigation';

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <main className="pb-20">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
}