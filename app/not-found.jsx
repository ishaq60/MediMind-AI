"use client";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        {/* 404 Number */}
        <h1 className="text-8xl font-bold text-indigo-400 mb-4">404</h1>
        
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Page Not Found
        </h2>
        
        {/* Description */}
        <p className="text-gray-600 mb-8">
          Sorry, the page you are looking for does not exist.
        </p>
        
        {/* Button */}
        <a
          href="/"
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Go Back Home
        </a>
      </div>
    </main>
  );
}