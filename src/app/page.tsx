// src/app/page.tsx
'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Lade Counter beim Start
  useEffect(() => {
    fetch('/api/counter')
      .then(res => res.json())
      .then(data => setCount(data.count))
      .catch(() => setCount(0));
  }, []);

  // POST → +1
  const increment = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/counter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      setCount(data.count);
    } catch (err) {
      console.error("Fehler beim Hochzählen:", err);
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      background: '#f7f7f7',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#0070f3' }}>
        Vercel Blob Counter
      </h1>

      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        textAlign: 'center',
        minWidth: '300px'
      }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
          Aktueller Zähler:
        </p>
        <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#0070f3' }}>
          {count === null ? 'Lade...' : count}
        </p>

        <button
          onClick={increment}
          disabled={loading}
          style={{
            marginTop: '1.5rem',
            padding: '1rem 2rem',
            fontSize: '1.3rem',
            background: loading ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Speichert...' : '+1'}
        </button>
      </div>

      <p style={{ marginTop: '2rem', color: '#666', fontSize: '0.9rem' }}>
        Jeder Klick speichert global im Vercel Blob Store
      </p>
    </div>
  );
}