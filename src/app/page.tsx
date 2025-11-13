// src/app/page.tsx
'use client';

import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center transform transition hover:scale-105">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Hallo, Lehnsherr! 👑
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Deine <span className="font-bold text-purple-600">Next.js 16</span> Seite ist <span className="text-green-600">LIVE</span>!
        </p>

        <button
          onClick={() => setCount(count + 1)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xl py-4 px-10 rounded-full transition transform hover:-translate-y-1 active:scale-95 shadow-lg"
        >
          Klick mich: <span className="ml-2">{count}</span>
        </button>

        <p className="mt-8 text-sm text-gray-500">
          Bereit für <span className="font-bold">Vercel Deploy</span> ⚡
        </p>
      </div>
    </main>
  );
}