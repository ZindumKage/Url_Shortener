"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function DashboardList() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    async function fetchUrls() {
      const res = await axios.get("http://localhost:2000/api/urls");
      setUrls(res.data);
    }

    fetchUrls();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Your Links</h1>

      <div className="space-y-4">
        {urls.map((u) => (
          <div
            key={u.id}
            className="p-4 bg-white rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{u.originalUrl}</p>
              <p className="text-sm text-gray-500">
                {`http://localhost:2000/api/${u.shortCode}`}
              </p>
              <p className="text-sm">Clicks: {u.clicks}</p>
            </div>

            <Link href={`/dashboard/${u.shortCode}`}>
              <button className="bg-black text-white px-4 py-2 rounded-lg">
                View Analytics
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}