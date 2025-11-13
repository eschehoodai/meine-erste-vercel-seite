// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [globalCount, setGlobalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Lade globalen Counter
  useEffect(() => {
    fetch('/api/counter')
      .then(res => res.json())
      .then(data => {
        setGlobalCount(data.count);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const clickButton1 = async () => {
    setCount1(count1 + 1);
    const res = await fetch('/api/counter', { method: 'POST' });
    const data = await res.json();
    setGlobalCount(data.count);
  };

  const clickButton2 = async () => {
    setCount2(count2 + 1);
    const res = await fetch('/api/counter', { method: 'POST' });
    const data = await res.json();
    setGlobalCount(data.count);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center transform transition hover:scale-105">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Hallo, Lehnsherr! 👑
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          Deine <span className="font-bold text-purple-600">Next.js 16</span> Seite ist <span className="text-green-600">LIVE</span>!
        </p>

        {/* GLOBALER COUNTER */}
        <div className="mb-8 p-6 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl text-white">
          <p className="text-sm font-semibold uppercase">Ewiger Klecks-Counter</p>
          <p className="text-4xl font-bold">
            {loading ? '...' : globalCount.toLocaleString()}
          </p>
          <p className="text-xs mt-1">Gespeichert in Vercel Blob – für immer!</p>
        </div>

        <button
          onClick={clickButton1}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xl py-4 px-10 rounded-full transition transform hover:-translate-y-1 active:scale-95 shadow-lg mb-4 block w-full"
        >
          Button 1: <span className="ml-2">{count1}</span>
        </button>

        <button
          onClick={clickButton2}
          className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white font-bold text-xl py-4 px-10 rounded-full transition transform hover:-translate-y-1 active:scale-95 shadow-lg block w-full"
        >
          Button 2: <span className="ml-2">{count2}</span>
        </button>

        <p className="mt-8 text-sm text-gray-500">
          Bereit für <span className="font-bold">Vercel Deploy</span> ⚡
        </p>
      </div>
    </main>
  );
}