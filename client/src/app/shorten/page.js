"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function ShortenPage() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
async function handleShorten() {
  try {
    if (!url) return alert("Enter a URL");

    setLoading(true);

    let formattedUrl = url;
    if (!url.startsWith("http")) {
      formattedUrl = "https://" + url;
    }

    const res = await axios.post(
      "http://localhost:2000/shorten",
      { longUrl: formattedUrl },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setShortUrl(res.data.shortUrl);
  } catch (err) {
    console.error("SERVER:", err.response?.data);
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      
      <div className="bg-white p-8 rounded-2xl shadow w-full max-w-xl text-center">
        
        <h1 className="text-2xl font-bold mb-4">
          Shorten Your URL 🔗
        </h1>

        <input
          type="text"
          placeholder="Paste your long URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border w-full px-4 py-3 rounded-xl mb-4"
        />

        <button
          onClick={handleShorten}
          className="bg-black text-white w-full py-3 rounded-xl"
        >
          {loading ? "Processing..." : "Shorten"}
        </button>

        {shortUrl && (
          <div className="mt-4 bg-gray-100 p-3 rounded-xl">
            <p className="text-gray-500">Your short link:</p>
            <a
              href={shortUrl}
              target="_blank"
              className="text-blue-600 font-semibold"
            >
              {shortUrl}
            </a>
          </div>
        )}

        {/* Back */}
        <div className="mt-6">
          <Link href="/">
            <button className="text-sm text-gray-500 hover:underline">
              ← Back to Home
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}