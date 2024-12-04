import { Icon } from '@iconify/react';

export default function LoadingSpin() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Icon
        icon="mdi:loading"
        className="w-20 h-20 text-gray-800 animate-spin"
      />
      <div className="mt-4 text-gray-800">Loading...</div>
    </div>
  );
}
