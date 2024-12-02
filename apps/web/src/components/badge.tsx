export default function Badge({ status }: { status: string }) {
  const badgeColor = {
    available: 'bg-green-500',
    pending: 'bg-yellow-500',
    sold: 'bg-red-500',
  };

  return (
    <span
      className={`px-2 py-1 rounded text-white text-xs font-semibold ${badgeColor[status]}`}
    >
      {status}
    </span>
  );
}
