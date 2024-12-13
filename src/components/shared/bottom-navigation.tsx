'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trophy, User, Compass, BookOpen } from 'lucide-react';

export function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Explore',
      href: '/explore',
      icon: Compass
    },
    {
      label: 'Badges',
      href: '/badges',
      icon: Trophy
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: User
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
      <nav className="flex justify-around px-4 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center py-1 px-2"
            >
              <Icon
                className={`h-6 w-6 ${
                  isActive ? 'text-blue-500' : 'text-gray-500'
                }`}
              />
              <span
                className={`text-xs mt-1 ${
                  isActive ? 'text-blue-500 font-medium' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}