'use client';

import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/config/api';

type HealthResponse = {
  status: string;
  message: string;
};

export default function HomePage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHealth() {
      try {
        const res = await fetch(`${API_BASE_URL}/health`);
        if (!res.ok) {
          throw new Error('Failed to fetch health');
        }
        const data: HealthResponse = await res.json();
        setHealth(data);
        setError(null);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        setHealth(null);
      }
    }

    fetchHealth();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 p-8 font-sans">
      <h1 className="text-3xl font-bold">🧪 Ziv Cocktails Admin</h1>
      <p className="text-zinc-600">Testing connection between frontend and backend</p>

      {health && (
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div>status: {health.status}</div>
          <div>message: {health.message}</div>
        </div>
      )}

      {error && <div className="text-red-600">Error calling API: {error}</div>}
    </main>
  );
}
