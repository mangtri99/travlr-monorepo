'use client';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../utils/common';

export default function Menu({ onChangeMenu }: { onChangeMenu: () => void }) {
  const pathname = usePathname();
  const menu = [
    {
      title: 'Dashboard',
      icon: 'mdi:chart-bar-stacked',
      link: '/product',
    },
    {
      title: 'Products',
      icon: 'mdi:application-settings-outline',
      link: '/product/list',
    },
  ];

  return (
    <div className="space-y-2">
      {menu.map((item, index) => (
        <div
          key={index}
          className={cn(
            'flex items-center px-3 py-2 rounded-sm text-gray-900 transition-all hover:bg-blue-100 hover:underline hover:text-gray-950 hover:cursor-pointer',
            {
              'bg-blue-100': pathname === item.link,
            }
          )}
        >
          <Icon icon={item.icon} className="text-lg" />
          <Link
            href={item.link}
            className="w-full ml-4 text-lg text-gray-900"
            onClick={onChangeMenu}
          >
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
