#!/usr/bin/env node
// Descarga las notas del servidor Render y las guarda en seprio-propuesta/notes.json
// Uso:
//   ADMIN_KEY=xxx SITE_URL=https://seprio-propuesta.onrender.com node scripts/pull-notes.mjs
// (o configurar como variables en .env / shell)

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = process.env.SITE_URL || 'https://seprio-propuesta.onrender.com';
const ADMIN_KEY = process.env.ADMIN_KEY;
const OUT_FILE = path.resolve(__dirname, '..', '..', 'notes.json');

if (!ADMIN_KEY) {
  console.error('falta ADMIN_KEY en el entorno');
  process.exit(2);
}

const url = `${SITE_URL.replace(/\/$/, '')}/api/notes?key=${encodeURIComponent(ADMIN_KEY)}`;
console.log(`GET ${url}`);
const res = await fetch(url);
if (!res.ok) {
  console.error('HTTP', res.status, await res.text());
  process.exit(1);
}
const body = await res.json();
await fs.writeFile(OUT_FILE, JSON.stringify(body, null, 2) + '\n', 'utf8');
console.log(`✓ ${body.count} notas guardadas en ${OUT_FILE}`);
