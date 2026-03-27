"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ApiStatusCard() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const res = await axios.get("http://localhost:2000/api/status");

        if (isMounted) {
          setData(res.data);
          setStatus("up");
        }
      } catch (err) {
        if (isMounted) {
          setStatus("down");
        }
        console.error("API Status Error:", err.message);
      }
    }

    load();
    const interval = setInterval(load, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">System Status</h2>

      {/* Overall Status */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-3 h-3 rounded-full ${
            status === "up"
              ? "bg-green-500 animate-pulse"
              : status === "down"
              ? "bg-red-500"
              : "bg-yellow-400"
          }`}
        />
        <span className="text-gray-700 font-medium">
          {status === "loading"
            ? "Checking..."
            : status === "up"
            ? "All systems operational"
            : "System issues detected"}
        </span>
      </div>

      {/* Metrics */}
      {data && (
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            ⏱ Uptime: <span className="font-medium">{data.metrics.uptime}</span>
          </p>

          <p>
            ⚡ Response Time:{" "}
            <span className="font-medium">
              {data.metrics.responseTime}
            </span>
          </p>

          <p>
            💾 Memory:{" "}
            <span className="font-medium">{data.metrics.memory}</span>
          </p>

          <p>
            🧠 Database:{" "}
            <span
              className={`font-medium ${
                data.services.database === "connected"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {data.services.database}
            </span>
          </p>

          <p>
            ⚡ Redis:{" "}
            <span
              className={`font-medium ${
                data.services.redis === "connected"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {data.services.redis}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}