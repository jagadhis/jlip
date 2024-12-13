'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trophy, User } from 'lucide-react';

export function NavigationMenu() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around p-4">
        <Link
          href="/explore"
          className={`flex flex-col items-center ${
            pathname === '/explore' ? 'text-blue-500' : 'text-gray-500'
          }`}
        >
          <Trophy className="h-6 w-6" />
          <span className="text-xs mt-1">Explore</span>
        </Link>
        <Link
          href="/profile"
          className={`flex flex-col items-center ${
            pathname === '/profile' ? 'text-blue-500' : 'text-gray-500'
          }`}
        >
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
}