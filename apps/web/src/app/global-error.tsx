'use client';

export default function GlobalError() {
  return (
    <div className="fixed inset-0">
      <div className="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
        <div className="flex flex-col items-center justify-center w-full h-full bg-white rounded-lg">
          <h1 className="text-2xl font-bold text-center">
            500 - Internal Server Error
          </h1>
          <p className="text-center">
            Something went wrong. Please try again later.
          </p>
        </div>
      </div>
    </div>
  );
}
