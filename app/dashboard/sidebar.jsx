'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Activity,
  Calendar,
  FileText,
  Brain,
  Star,
  AlertCircle,
} from 'lucide-react';

export default function Sidebar({ setIsSidebarOpen }) {
  const pathname = usePathname();

  const sidebarItemsUser = [
    { id: 'overview', label: 'Overview', icon: Activity, href: '/dashboard' },
    {
      id: 'appointments',
      label: 'My Appointments',
      icon: Calendar,
      href: '/dashboard/appointments',
    },
    {
      id: 'diagnosis',
      label: 'Diagnosis',
      icon: Brain,
      href: '/dashboard/diagnosis',
    },
    {
      id: 'reports',
      label: 'My Reports',
      icon: FileText,
      href: '/dashboard/user/ reports',
    },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: Star,
      href: '/dashboard/favorites',
    },
    {
      id: 'help',
      label: 'Help Center',
      icon: AlertCircle,
      href: '/dashboard/help',
    },
  ];

  return (
    <nav className="p-4 space-y-2">
      {sidebarItemsUser.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          onClick={() => setIsSidebarOpen(false)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm ${
            pathname === item.href
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <item.icon className="w-5 h-5" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
