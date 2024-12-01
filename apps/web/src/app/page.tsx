import Link from 'next/link';

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full h-screen">
      <h1 className="mb-4 text-2xl font-bold text-center md:text-6xl text-blue-950">
        Welcome to Travlr Technical Test
      </h1>
      <p className="mb-4 text-xl">Get started by </p>
      <div className="flex space-x-4">
        <Link
          href="/login"
          className="px-3 py-2 text-lg text-white transition-all bg-blue-900 rounded-sm hover:bg-blue-950"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="px-3 py-2 text-lg text-white transition-all bg-blue-900 rounded-sm hover:bg-blue-950"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
