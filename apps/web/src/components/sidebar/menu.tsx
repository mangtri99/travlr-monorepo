'use client';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function Menu() {
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
    <div>
      {menu.map((item, index) => (
        <div
          key={index}
          className="flex items-center px-4 py-3 text-gray-900 transition-all hover:underline hover:text-gray-950 hover:cursor-pointer"
        >
          <Icon icon={item.icon} className="text-lg" />
          <Link href={item.link} className="ml-4 text-lg text-gray-900">
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
