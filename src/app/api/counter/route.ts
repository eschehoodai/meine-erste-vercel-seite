// src/app/api/counter/route.ts
import { put, list } from '@vercel/blob';

const COUNTER_FILE = 'counter.json';

export async function GET() {
  try {
    const { blobs } = await list();
    const counterBlob = blobs.find(b => b.pathname === COUNTER_FILE);
    
    if (!counterBlob) {
      return Response.json({ count: 0 });
    }

    const res = await fetch(counterBlob.downloadUrl);
    const data = await res.json();
    return Response.json({ count: data.count || 0 });
  } catch (error) {
    console.error('GET error:', error);
    return Response.json({ count: 0 });
  }
}

export async function POST() {
  let count = 0;
  try {
    // Lese aktuellen Wert
    const { blobs } = await list();
    const counterBlob = blobs.find(b => b.pathname === COUNTER_FILE);
    
    if (counterBlob) {
      const res = await fetch(counterBlob.downloadUrl);
      const data = await res.json();
      count = (data.count || 0) + 1;
    } else {
      count = 1;
    }
  } catch (error) {
    console.error('POST read error:', error);
    count = 1;
  }

  try {
    // Speichere neuen Wert
    await put(COUNTER_FILE, JSON.stringify({ count }), {
      access: 'public',
      addRandomSuffix: false,
    });
  } catch (error) {
    console.error('POST write error:', error);
  }

  return Response.json({ count });
}