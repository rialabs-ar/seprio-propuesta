import { getStore } from '@netlify/blobs';

/**
 * Reemplaza el `POST/GET /api/notes` de server.mjs (Render).
 *
 * Diferencia importante: en Render las notas vivían en `data/notes.json` sobre el
 * filesystem EFÍMERO del contenedor — se perdían en cada deploy o restart. Acá cada
 * nota es un blob propio, así que además de ser durable no hay read-modify-write
 * (dos personas dejando nota a la vez no se pisan).
 */

const STORE = 'propuesta-notes';

const clean = (str, max = 2000) => (typeof str === 'string' ? str.trim().slice(0, max) : '');

export default async (req) => {
  const store = getStore(STORE);

  if (req.method === 'POST') {
    let body;
    try {
      body = await req.json();
    } catch {
      body = {};
    }
    const name = clean(body?.name, 120);
    const text = clean(body?.text, 2000);
    if (!name || !text) {
      return Response.json({ ok: false, error: 'name y text son requeridos' }, { status: 400 });
    }
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const entry = {
      id,
      name,
      text,
      slideId: clean(body?.slideId, 80),
      slideTitle: clean(body?.slideTitle, 200),
      createdAt: new Date().toISOString(),
      ip: req.headers.get('x-nf-client-connection-ip') || null,
      ua: clean(req.headers.get('user-agent') || '', 300)
    };
    await store.setJSON(id, entry);
    return Response.json({ ok: true, id });
  }

  if (req.method === 'GET') {
    const key = new URL(req.url).searchParams.get('key') || '';
    const admin = process.env.ADMIN_KEY || '';
    if (!admin || key !== admin) {
      return Response.json({ ok: false, error: 'unauthorized' }, { status: 401 });
    }
    const { blobs } = await store.list();
    const notes = (
      await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' }).catch(() => null)))
    ).filter(Boolean);
    notes.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
    return Response.json({ ok: true, count: notes.length, notes });
  }

  return Response.json({ ok: false, error: 'method not allowed' }, { status: 405 });
};

export const config = { path: '/api/notes' };
