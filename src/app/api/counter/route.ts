// src/app/api/counter/route.ts
import { put, get } from '@vercel/blob';

const COUNTER_FILE = 'counter.json';

export async function GET() {
  try {
    const blob = await get(COUNTER_FILE);
    const data = await fetch(blob.url).then(res => res.json());
    return Response.json({ count: data.count || 0 });
  } catch {
    return Response.json({ count: 0 });
  }
}

export async function POST() {
  let count = 0;
  try {
    const blob = await get(COUNTER_FILE);
    const data = await fetch(blob.url).then(res => res.json());
    count = (data.count || 0) + 1;
  } catch {
    count = 1;
  }

  await put(COUNTER_FILE, JSON.stringify({ count }), {
    access: 'public',
    addRandomSuffix: false,
  });

  return Response.json({ count });
}