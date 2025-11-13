// src/app/api/counter/route.ts
import { put } from '@vercel/blob';

const COUNTER_FILE = 'counter.json';

export async function GET() {
  try {
    const { url } = await put(COUNTER_FILE, '', { access: 'public', addRandomSuffix: false });
    const res = await fetch(url);
    const data = await res.json();
    return Response.json({ count: data.count || 0 });
  } catch {
    return Response.json({ count: 0 });
  }
}

export async function POST() {
  let count = 0;
  try {
    // Lese aktuellen Wert
    const { url } = await put(COUNTER_FILE, '', { access: 'public', addRandomSuffix: false });
    const res = await fetch(url);
    const data = await res.json();
    count = (data.count || 0) + 1;
  } catch {
    count = 1;
  }

  // Schreibe neuen Wert
  await put(COUNTER_FILE, JSON.stringify({ count }), {
    access: 'public',
    addRandomSuffix: false,
  });

  return Response.json({ count });
}