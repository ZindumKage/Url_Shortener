"use client";

import ApiStatusCard from "@/components/ApiStatusCard";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-12"> 
      
      {/* Hero Section */}
      <div className="text-center max-w-2xl mt-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Smart URL Shortener 🚀
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          Shorten links, track analytics, and understand your audience in real time.
        </p>

        <div className="mt-6 flex gap-4 justify-center flex-wrap">
          <Link href="/shorten">
            <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition">
              Shorten URL
            </button>
          </Link>

          <Link href="/dashboard">
            <button className="bg-gray-200 text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-300 transition">
              Dashboard
            </button>
          </Link>
        </div>
      </div>

      {/* API Status (🔥 better placement) */}
      <div className="mt-10 w-full flex justify-center">
        <ApiStatusCard />
      </div>

      {/* Features */}
      <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl w-full">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
          <h3 className="font-semibold text-lg">⚡ Fast Redirects</h3>
          <p className="text-gray-500 mt-2">
            Powered by Redis caching for lightning-fast performance.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
          <h3 className="font-semibold text-lg">📊 Real-time Analytics</h3>
          <p className="text-gray-500 mt-2">
            Track clicks, countries, and user activity instantly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
          <h3 className="font-semibold text-lg">🌍 Geo Tracking</h3>
          <p className="text-gray-500 mt-2">
            See where your users are coming from globally.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 text-gray-400 text-sm text-center">
        Built with Next.js, Sequelize, Redis & MySQL
        <br />
        <span className="font-medium text-gray-500">
          Built with ♥️ by ZindumKage ©2026
        </span>
      </div>
    </main>
  );
}