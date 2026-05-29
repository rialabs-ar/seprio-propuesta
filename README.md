# Seprio · Propuesta Módulo Comunicaciones

Presentación comercial standalone (RIA Labs → Seprio) del próximo módulo de la Plataforma Seprio. Vanilla HTML/CSS/JS + Express para servir y recibir notas de feedback.

## Estructura

```
site/
├── package.json
├── server.mjs                   # Express (sirve /public + /api/notes)
├── render.yaml                  # Blueprint para Render
├── public/
│   ├── index.html               # 10 slides + modales
│   ├── styles.css               # Tema dark RIA + acento Fiat
│   ├── diagrams.js              # SVG animados por slide
│   ├── app.js                   # Navegación, modales, notas
│   ├── byte-logo.png
│   ├── ria-isotipo.svg
│   └── ria-lockup.svg
├── scripts/
│   └── pull-notes.mjs           # Descarga notas a notes.json local
└── data/
    └── notes.json               # Notas recibidas (creado al primer POST)
```

## Desarrollo local

```bash
npm install
npm start
# http://localhost:3000
```

Variables de entorno opcionales:
- `PORT` (default `3000`)
- `ADMIN_KEY` (default placeholder — **cambialo en Render**)
- `NOTES_DIR` (default `./data`)

## Navegación

- **Desktop**: flechas `←` `→`, `Space`/`Enter` next, `Home`/`End`, click en dots, scroll de mouse.
- **Mobile**: swipe horizontal entre slides, scroll vertical dentro del slide. Layout vertical: contenido arriba, diagrama abajo.
- **Modales**: `Esc` cierra.

## Notas (feedback)

Cada slide tiene un botón **Dejar nota**. El visitante ingresa su nombre la primera vez; luego sólo escribe la nota. Las notas se almacenan en `data/notes.json` en el servidor.

### Traer las notas al proyecto local

```bash
SITE_URL=https://seprio-propuesta.onrender.com \
ADMIN_KEY=xxxxx \
npm run pull-notes
```

Esto genera `seprio-propuesta/notes.json` (un nivel arriba del `site/`) con todas las notas recibidas. Después podés pedirle a Claude *"traé las notas de la presentación"* y las lee de ahí.

## Endpoints

- `GET /` — sitio
- `POST /api/notes` — `{ name, text, slideId, slideTitle }` → guarda
- `GET /api/notes?key=ADMIN_KEY` — dump JSON
- `GET /health`

## Deploy Render

1. Crear repo (recomendado un repo nuevo dedicado).
2. Conectar a Render como Web Service (Node 20).
3. **Root Directory**: `site/`
4. **Build**: `npm install`
5. **Start**: `node server.mjs`
6. Setear `ADMIN_KEY` (auto-generada con `render.yaml`).

> **Aviso**: el plan Free de Render no tiene disco persistente. Las notas viven en filesystem efímero — se pierden si la instancia se recicla. Para durabilidad: subir a Starter + descomentar el bloque `disk` del `render.yaml` y setear `NOTES_DIR=/var/data/notes`.

### Dominio

CNAME desde `<sub>.seprio.byt.ar` → Render. Sugerencia: `propuesta-comms.seprio.byt.ar` o `comunicaciones.seprio.byt.ar` (este último está libre; `comms.seprio.byt.ar` ya está ocupado por el módulo activo).
