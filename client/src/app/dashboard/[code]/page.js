"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Chart from "../../../components/Chart";
import StatsCard from "../../../components/StatsCard";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const params = useParams();
  const code = params.code;

  useEffect(() => {
    if (!code) return;

    async function fetchData() {
      const res = await axios.get(
        `http://localhost:2000/api/analytics/${code}`
      );
      setData(res.data);
    }

    fetchData();
  }, [code]);

  if (!data) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>

      <div className="grid grid-cols-3 gap-4">
        <StatsCard title="Total Clicks" value={data.totalClicks} />
        <StatsCard title="Top IP" value={data.topIPs[0] || "N/A"} />
        <StatsCard
          title="Top Country"
          value={data.topCountries[0]?.country || "N/A"}
        />
      </div>

      <Chart data={data.clicksOverTime} />
    </div>
  );
}