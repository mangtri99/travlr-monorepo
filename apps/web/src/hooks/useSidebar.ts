import { useRef } from 'react';

export const useSidebar = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  function toggleSidebar() {
    if (sidebarRef.current) {
      sidebarRef.current.classList.toggle('-translate-x-full');
    }
  }

  return { toggleSidebar, sidebarRef };
};
