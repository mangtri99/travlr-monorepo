'use client';
import { useRef } from 'react';
import { Icon } from '@iconify/react';
import Button from '../../components/button';
import Menu from '../../components/sidebar/menu';
import { signOut } from 'next-auth/react';
import { Toaster } from 'sonner';

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const sidebarContentRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  function toggleSidebar() {
    if (sidebarRef.current && contentRef.current) {
      sidebarRef.current.classList.toggle('-translate-x-full');
    }
  }

  return (
    <div className="flex">
      <Toaster position="bottom-right" richColors />
      <div
        ref={sidebarRef}
        className="fixed z-10 w-64 h-full transition-transform -translate-x-full bg-white border-r md:translate-x-0"
      >
        <div
          className="flex flex-col transition-transform"
          ref={sidebarContentRef}
        >
          <div className="relative flex items-center justify-center w-full px-3 py-4">
            <p className="text-2xl font-bold">Travlr</p>
            <div className="absolute top-5 right-4">
              <button onClick={toggleSidebar} className="text-xl md:hidden">
                <Icon icon="mdi:close" className="text-xl" />
              </button>
            </div>
          </div>

          <div className="flex-1 h-full px-4 py-4 overflow-auto">
            <Menu />
          </div>
        </div>
      </div>

      <div
        id="content"
        ref={contentRef}
        className="flex flex-col flex-1 w-full h-full ml-0 transition-transform md:ml-64"
      >
        <div className="flex items-center justify-between w-full px-3 py-4 bg-white border-b">
          <div className="flex items-center">
            <button type="button" onClick={toggleSidebar} className="md:hidden">
              <Icon icon="mdi:format-list-bulleted" className="text-2xl" />
            </button>

            <div>Dashboard</div>
          </div>

          <div className="flex items-center">
            <Button
              type="button"
              onClick={() => {
                signOut({
                  redirect: true,
                  redirectTo: '/login',
                });
              }}
            >
              Logout
            </Button>
          </div>
        </div>
        <div className="flex-1 h-full min-h-[80vh] p-4">{children}</div>
      </div>
    </div>
  );
}
