export default function LoadingSpin() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-20 h-20 border-t-4 border-b-4 border-gray-800 rounded-full animate-spin"></div>
      <div className="mt-4 text-gray-800">Loading...</div>
    </div>
  );
}
