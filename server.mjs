import express from 'express';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const ADMIN_KEY = process.env.ADMIN_KEY || 'cambiame-en-render';
const DATA_DIR = process.env.NOTES_DIR || path.join(__dirname, 'data');
const NOTES_FILE = path.join(DATA_DIR, 'notes.json');

const app = express();
app.use(express.json({ limit: '32kb' }));
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '5m',
  setHeaders(res, filePath) {
    if (filePath.endsWith('.html')) res.setHeader('Cache-Control', 'no-store');
  }
}));

async function ensureNotesFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try { await fs.access(NOTES_FILE); }
  catch { await fs.writeFile(NOTES_FILE, '[]\n', 'utf8'); }
}

async function readNotes() {
  await ensureNotesFile();
  const raw = await fs.readFile(NOTES_FILE, 'utf8');
  try { return JSON.parse(raw); } catch { return []; }
}

async function writeNotes(notes) {
  await ensureNotesFile();
  await fs.writeFile(NOTES_FILE, JSON.stringify(notes, null, 2) + '\n', 'utf8');
}

function clean(str, max = 2000) {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, max);
}

app.post('/api/notes', async (req, res) => {
  try {
    const name = clean(req.body?.name, 120);
    const text = clean(req.body?.text, 2000);
    const slideId = clean(req.body?.slideId, 80);
    const slideTitle = clean(req.body?.slideTitle, 200);
    if (!name || !text) return res.status(400).json({ ok: false, error: 'name y text son requeridos' });
    const notes = await readNotes();
    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name, text, slideId, slideTitle,
      createdAt: new Date().toISOString(),
      ip: req.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() || req.socket.remoteAddress || null,
      ua: clean(req.headers['user-agent'] || '', 300)
    };
    notes.push(entry);
    await writeNotes(notes);
    res.json({ ok: true, id: entry.id });
  } catch (err) {
    console.error('POST /api/notes', err);
    res.status(500).json({ ok: false, error: 'server' });
  }
});

app.get('/api/notes', async (req, res) => {
  if ((req.query.key || '') !== ADMIN_KEY) return res.status(401).json({ ok: false, error: 'unauthorized' });
  const notes = await readNotes();
  res.json({ ok: true, count: notes.length, notes });
});

app.get('/health', (_req, res) => res.json({ ok: true, ts: Date.now() }));

app.listen(PORT, () => {
  console.log(`[seprio-propuesta] listening on :${PORT}`);
  console.log(`[seprio-propuesta] notes file: ${NOTES_FILE}`);
});
