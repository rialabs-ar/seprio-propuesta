/* ============================================================
   DIAGRAMAS SVG ANIMADOS — uno por slide
   Estilo: RIA Labs (gold/blue + flujos animados)
   ============================================================ */

const SVG_NS = 'http://www.w3.org/2000/svg';

const DIAGRAMS = {

  /* ====================== COVER ====================== */
  cover: () => `
    <svg viewBox="0 0 720 280" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="cov-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ef9f27" stop-opacity="0.35"/>
          <stop offset="60%" stop-color="#ef9f27" stop-opacity="0.05"/>
          <stop offset="100%" stop-color="#ef9f27" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="cov-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#4a8fd4" stop-opacity="0"/>
          <stop offset="50%" stop-color="#ef9f27" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#ff1430" stop-opacity="0"/>
        </linearGradient>
      </defs>

      <!-- Halo -->
      <circle cx="360" cy="140" r="120" fill="url(#cov-glow)">
        <animate attributeName="r" values="118;130;118" dur="6s" repeatCount="indefinite"/>
      </circle>

      <!-- Núcleo central -->
      <circle cx="360" cy="140" r="50" fill="none" stroke="#ef9f27" stroke-width="1.2" stroke-opacity="0.5">
        <animate attributeName="r" values="48;56;48" dur="5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="360" cy="140" r="38" fill="#0b0a14" stroke="#ef9f27" stroke-width="1.5"/>
      <text x="360" y="146" text-anchor="middle" font-family="DM Mono" font-size="14" font-weight="500" fill="#ef9f27" letter-spacing="2">SEPRIO</text>

      <!-- Órbitas conectando módulos -->
      <ellipse cx="360" cy="140" rx="180" ry="90" fill="none" stroke="#ef9f27" stroke-width="0.5" stroke-opacity="0.18" stroke-dasharray="3 4"/>
      <ellipse cx="360" cy="140" rx="240" ry="118" fill="none" stroke="#4a8fd4" stroke-width="0.5" stroke-opacity="0.14" stroke-dasharray="3 4"/>

      <!-- Módulos satélite -->
      ${[
        {x: 180, y: 140, label: 'Servicios', color: '#10b981', active: true},
        {x: 360, y: 50, label: 'Comunicaciones', color: '#ef9f27', big: true},
        {x: 540, y: 140, label: 'Ventas', color: '#4a8fd4'},
        {x: 470, y: 220, label: 'Repuestos', color: '#7f77dd'},
        {x: 250, y: 220, label: 'Admin', color: '#06b6d4'}
      ].map((m, i) => `
        <g>
          <circle cx="${m.x}" cy="${m.y}" r="${m.big ? 26 : 16}" fill="#0b0a14" stroke="${m.color}" stroke-width="${m.big ? 1.8 : 1.2}" opacity="${m.active || m.big ? 1 : 0.6}"/>
          ${m.big ? `<circle cx="${m.x}" cy="${m.y}" r="26" fill="none" stroke="${m.color}" stroke-width="1" opacity="0.4"><animate attributeName="r" values="26;38;26" dur="2.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite"/></circle>` : ''}
          <text x="${m.x}" y="${m.y + (m.big ? 44 : 32)}" text-anchor="middle" font-family="DM Mono" font-size="9" fill="${m.color}" letter-spacing="1.5">${m.label.toUpperCase()}</text>
          <line x1="360" y1="140" x2="${m.x}" y2="${m.y}" stroke="${m.color}" stroke-width="0.6" stroke-opacity="0.3" stroke-dasharray="2 3">
            <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="${3 + i * 0.3}s" repeatCount="indefinite"/>
          </line>
        </g>
      `).join('')}

      <!-- Línea base decorativa -->
      <line x1="60" y1="262" x2="660" y2="262" stroke="url(#cov-line)" stroke-width="1"/>
      <text x="360" y="276" text-anchor="middle" font-family="DM Mono" font-size="8" fill="#8a8478" letter-spacing="2">PLATAFORMA SEPRIO · ARQUITECTURA MODULAR</text>
    </svg>
  `,

  /* ====================== PROBLEMA ====================== */
  problema: () => `
    <svg viewBox="0 0 520 460" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="pb-vanish" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ff1430" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#ff1430" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <!-- Celulares dispersos -->
      ${[
        {x: 70, y: 80, rot: -12, label: 'celular vendedor A'},
        {x: 210, y: 60, rot: 6, label: 'celular vendedor B'},
        {x: 360, y: 90, rot: -8, label: 'celular service'},
        {x: 120, y: 220, rot: 14, label: 'celular vendedor C'},
        {x: 310, y: 240, rot: -6, label: 'celular admin'}
      ].map((p, i) => `
        <g transform="translate(${p.x} ${p.y}) rotate(${p.rot})">
          <rect x="0" y="0" width="64" height="100" rx="8" fill="#100f1e" stroke="#8a8478" stroke-width="0.8" stroke-opacity="0.5"/>
          <rect x="6" y="14" width="52" height="78" rx="2" fill="#0b0a14"/>
          <!-- mensajes -->
          <rect x="10" y="20" width="${24 + (i % 3) * 8}" height="6" rx="1" fill="#4a8fd4" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="${2 + i * 0.4}s" repeatCount="indefinite"/>
          </rect>
          <rect x="10" y="30" width="${18 + (i % 2) * 12}" height="6" rx="1" fill="#ef9f27" opacity="0.5"/>
          <rect x="10" y="40" width="${28 + (i % 4) * 4}" height="6" rx="1" fill="#7f77dd" opacity="0.4"/>
          <rect x="10" y="50" width="20" height="6" rx="1" fill="#4a8fd4" opacity="0.3"/>
          <circle cx="48" cy="55" r="3" fill="#ff1430">
            <animate attributeName="opacity" values="0;1;0" dur="${1.8 + i * 0.2}s" repeatCount="indefinite"/>
          </circle>
        </g>
      `).join('')}

      <!-- Vapor de información que se evapora -->
      <g opacity="0.7">
        ${Array.from({length: 14}).map((_, i) => {
          const x = 60 + (i * 32) + (i % 2) * 14;
          const startY = 380;
          const delay = i * 0.3;
          return `
            <circle cx="${x}" cy="${startY}" r="2" fill="#ff1430" opacity="0.6">
              <animate attributeName="cy" values="${startY};${startY - 280}" dur="4s" begin="${delay}s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.7;0" dur="4s" begin="${delay}s" repeatCount="indefinite"/>
              <animate attributeName="r" values="2;5;2" dur="4s" begin="${delay}s" repeatCount="indefinite"/>
            </circle>
          `;
        }).join('')}
      </g>

      <!-- Banner inferior - información perdida -->
      <rect x="40" y="395" width="440" height="46" rx="2" fill="url(#pb-vanish)" stroke="#ff1430" stroke-width="0.6" stroke-opacity="0.4" stroke-dasharray="4 3"/>
      <text x="260" y="416" text-anchor="middle" font-family="DM Mono" font-size="10" fill="#ff1430" letter-spacing="2.5">INFORMACIÓN QUE SE EVAPORA</text>
      <text x="260" y="430" text-anchor="middle" font-family="DM Mono" font-size="8" fill="#8a8478" letter-spacing="1.5">leads · reclamos · promesas · contexto</text>
    </svg>
  `,

  /* ====================== CENTRALIZACIÓN ====================== */
  centralizacion: () => `
    <svg viewBox="0 0 520 460" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="cen-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ef9f27" stop-opacity="0.45"/>
          <stop offset="60%" stop-color="#ef9f27" stop-opacity="0.08"/>
          <stop offset="100%" stop-color="#ef9f27" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <!-- Clientes (entradas) izquierda -->
      ${[
        {y: 60, label: 'WhatsApp', color: '#4a8fd4'},
        {y: 130, label: 'Llamada', color: '#7f77dd'},
        {y: 200, label: 'Audio', color: '#06b6d4'},
        {y: 270, label: 'Foto', color: '#10b981'},
        {y: 340, label: 'Video', color: '#ff1430'}
      ].map((c, i) => `
        <g>
          <circle cx="50" cy="${c.y}" r="14" fill="#0b0a14" stroke="${c.color}" stroke-width="1.2"/>
          <text x="50" y="${c.y + 4}" text-anchor="middle" font-family="DM Mono" font-size="9" fill="${c.color}">${c.label[0]}</text>
          <text x="50" y="${c.y + 30}" text-anchor="middle" font-family="DM Mono" font-size="7" fill="#8a8478" letter-spacing="1">${c.label.toUpperCase()}</text>
          <path d="M 64 ${c.y} L 240 230" stroke="${c.color}" stroke-width="0.8" stroke-opacity="0.4" stroke-dasharray="3 3" fill="none">
            <animate attributeName="stroke-dashoffset" from="0" to="-30" dur="${3 + i * 0.2}s" repeatCount="indefinite"/>
          </path>
          <!-- partículas viajando hacia el núcleo -->
          <circle r="2.5" fill="${c.color}">
            <animateMotion path="M 64 ${c.y} L 240 230" dur="${3 + i * 0.3}s" repeatCount="indefinite" begin="${i * 0.5}s"/>
            <animate attributeName="opacity" values="0;1;1;0" dur="${3 + i * 0.3}s" repeatCount="indefinite" begin="${i * 0.5}s"/>
          </circle>
        </g>
      `).join('')}

      <!-- Núcleo central - número único -->
      <circle cx="260" cy="230" r="58" fill="url(#cen-core)"/>
      <circle cx="260" cy="230" r="44" fill="#0b0a14" stroke="#ef9f27" stroke-width="1.6"/>
      <circle cx="260" cy="230" r="44" fill="none" stroke="#ef9f27" stroke-width="0.6" opacity="0.5">
        <animate attributeName="r" values="44;54;44" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite"/>
      </circle>
      <text x="260" y="226" text-anchor="middle" font-family="DM Mono" font-size="9" fill="#8a8478" letter-spacing="2">UN ÚNICO</text>
      <text x="260" y="240" text-anchor="middle" font-family="Saira" font-size="13" font-weight="600" fill="#ef9f27">NÚMERO</text>

      <!-- Distribución -- nodos derecha (áreas) -->
      ${[
        {y: 80, label: 'Ventas', color: '#4a8fd4'},
        {y: 170, label: 'Service', color: '#f97316'},
        {y: 260, label: 'Repuestos', color: '#7f77dd'},
        {y: 350, label: 'Gerencia', color: '#06b6d4'}
      ].map((a, i) => `
        <g>
          <path d="M 304 230 L 422 ${a.y}" stroke="${a.color}" stroke-width="0.8" stroke-opacity="0.4" stroke-dasharray="3 3" fill="none">
            <animate attributeName="stroke-dashoffset" from="0" to="-30" dur="${2.5 + i * 0.3}s" repeatCount="indefinite"/>
          </path>
          <circle r="2.5" fill="${a.color}">
            <animateMotion path="M 304 230 L 422 ${a.y}" dur="${2.5 + i * 0.3}s" repeatCount="indefinite" begin="${i * 0.4 + 1}s"/>
            <animate attributeName="opacity" values="0;1;1;0" dur="${2.5 + i * 0.3}s" repeatCount="indefinite" begin="${i * 0.4 + 1}s"/>
          </circle>
          <rect x="432" y="${a.y - 14}" width="84" height="28" rx="2" fill="#100f1e" stroke="${a.color}" stroke-width="0.8"/>
          <text x="474" y="${a.y + 4}" text-anchor="middle" font-family="DM Mono" font-size="9" fill="${a.color}" letter-spacing="1.5">${a.label.toUpperCase()}</text>
        </g>
      `).join('')}

      <text x="50" y="430" font-family="DM Mono" font-size="9" fill="#8a8478" letter-spacing="2">CANALES → DISTRIBUCIÓN INTELIGENTE → ÁREAS</text>
    </svg>
  `,

  /* ====================== MULTIMEDIA ====================== */
  multimedia: () => `
    <svg viewBox="0 0 520 460" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="mm-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ef9f27" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#4a8fd4" stop-opacity="0.05"/>
        </linearGradient>
      </defs>

      <!-- Card central: ficha del cliente -->
      <g transform="translate(140 80)">
        <rect x="0" y="0" width="240" height="300" rx="6" fill="#100f1e" stroke="#ef9f27" stroke-width="1" stroke-opacity="0.4"/>
        <rect x="0" y="0" width="240" height="44" rx="6" fill="url(#mm-grad)"/>
        <text x="16" y="22" font-family="DM Mono" font-size="8" fill="#8a8478" letter-spacing="2">CLIENTE</text>
        <text x="16" y="36" font-family="Saira" font-size="14" font-weight="500" fill="#f0ece0">Juan Pérez · Fiat Cronos</text>

        <!-- Items multimedia -->
        <!-- Audio -->
        <g transform="translate(16 60)">
          <rect x="0" y="0" width="208" height="42" rx="3" fill="#0b0a14" stroke="#4a8fd4" stroke-width="0.6" stroke-opacity="0.4"/>
          <circle cx="16" cy="21" r="9" fill="none" stroke="#4a8fd4" stroke-width="1"/>
          <path d="M 13 18 L 13 24 M 16 16 L 16 26 M 19 18 L 19 24" stroke="#4a8fd4" stroke-width="1" stroke-linecap="round"/>
          <text x="32" y="18" font-family="DM Mono" font-size="8" fill="#8a8478" letter-spacing="1">AUDIO · 0:34</text>
          <text x="32" y="32" font-family="Saira" font-size="10" fill="#f0ece0">"hace un ruido raro cuando…"</text>
          ${Array.from({length: 9}).map((_, i) => {
            const x = 170 + i * 4.5;
            const h1 = 3 + Math.abs(Math.sin(i + 1)) * 6;
            const h2 = 3 + Math.abs(Math.sin(i + 3)) * 6;
            return `
            <rect x="${x}" y="${18 - h1/2}" width="2" height="${h1}" fill="#4a8fd4" opacity="0.55">
              <animate attributeName="height" values="${h1};${h2};${h1}" dur="${1 + (i % 3) * 0.3}s" repeatCount="indefinite"/>
              <animate attributeName="y" values="${18 - h1/2};${18 - h2/2};${18 - h1/2}" dur="${1 + (i % 3) * 0.3}s" repeatCount="indefinite"/>
            </rect>
          `;}).join('')}
        </g>

        <!-- Foto -->
        <g transform="translate(16 112)">
          <rect x="0" y="0" width="208" height="42" rx="3" fill="#0b0a14" stroke="#10b981" stroke-width="0.6" stroke-opacity="0.4"/>
          <rect x="6" y="6" width="30" height="30" rx="2" fill="#100f1e" stroke="#10b981" stroke-width="0.8"/>
          <circle cx="14" cy="13" r="2" fill="#10b981"/>
          <path d="M 6 32 L 16 22 L 24 28 L 36 18" stroke="#10b981" stroke-width="1" fill="none" stroke-opacity="0.6"/>
          <text x="44" y="18" font-family="DM Mono" font-size="8" fill="#8a8478" letter-spacing="1">FOTO · GOLPE TRASERO</text>
          <text x="44" y="32" font-family="Saira" font-size="10" fill="#f0ece0">2026-05-12 · taller</text>
        </g>

        <!-- Video -->
        <g transform="translate(16 164)">
          <rect x="0" y="0" width="208" height="42" rx="3" fill="#0b0a14" stroke="#7f77dd" stroke-width="0.6" stroke-opacity="0.4"/>
          <rect x="6" y="6" width="30" height="30" rx="2" fill="#100f1e" stroke="#7f77dd" stroke-width="0.8"/>
          <polygon points="14,12 14,28 28,20" fill="#7f77dd" opacity="0.7">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
          </polygon>
          <text x="44" y="18" font-family="DM Mono" font-size="8" fill="#8a8478" letter-spacing="1">VIDEO · TABLERO</text>
          <text x="44" y="32" font-family="Saira" font-size="10" fill="#f0ece0">testigo encendido · 0:12</text>
        </g>

        <!-- Archivo -->
        <g transform="translate(16 216)">
          <rect x="0" y="0" width="208" height="42" rx="3" fill="#0b0a14" stroke="#ef9f27" stroke-width="0.6" stroke-opacity="0.4"/>
          <rect x="8" y="8" width="22" height="26" rx="1" fill="none" stroke="#ef9f27" stroke-width="1"/>
          <path d="M 24 8 L 24 14 L 30 14" stroke="#ef9f27" stroke-width="1" fill="none"/>
          <line x1="12" y1="20" x2="26" y2="20" stroke="#ef9f27" stroke-width="0.6"/>
          <line x1="12" y1="24" x2="26" y2="24" stroke="#ef9f27" stroke-width="0.6"/>
          <line x1="12" y1="28" x2="22" y2="28" stroke="#ef9f27" stroke-width="0.6"/>
          <text x="44" y="18" font-family="DM Mono" font-size="8" fill="#8a8478" letter-spacing="1">PRESUPUESTO.PDF</text>
          <text x="44" y="32" font-family="Saira" font-size="10" fill="#f0ece0">$ 145.000 · service mayor</text>
        </g>

        <!-- Footer -->
        <text x="16" y="288" font-family="DM Mono" font-size="7" fill="#8a8478" letter-spacing="1.5">TODO LIGADO AL CLIENTE Y AL VEHÍCULO</text>
      </g>

      <!-- Partículas orbitando alrededor del card -->
      ${Array.from({length: 10}).map((_, i) => {
        const cx = 260, cy = 230, rx = 200, ry = 130;
        const startDeg = (i / 10) * 360;
        const px = cx + Math.cos(startDeg * Math.PI / 180) * rx;
        const py = cy + Math.sin(startDeg * Math.PI / 180) * ry;
        return `
          <circle cx="${px.toFixed(2)}" cy="${py.toFixed(2)}" r="2" fill="${i % 2 === 0 ? '#ef9f27' : '#4a8fd4'}" opacity="0.55">
            <animateTransform attributeName="transform" type="rotate" from="0 ${cx} ${cy}" to="360 ${cx} ${cy}" dur="${22 + (i % 4) * 3}s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.55;0.15;0.55" dur="${4 + (i % 3)}s" repeatCount="indefinite"/>
          </circle>
        `;
      }).join('')}
    </svg>
  `,

  /* ====================== TELEFONÍA ====================== */
  telefonia: () => `
    <svg viewBox="0 0 520 460" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="tel-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#4a8fd4"/>
          <stop offset="50%" stop-color="#ef9f27"/>
          <stop offset="100%" stop-color="#7f77dd"/>
        </linearGradient>
      </defs>

      <!-- Timeline horizontal: una sola línea unificada -->
      <line x1="60" y1="230" x2="460" y2="230" stroke="url(#tel-line)" stroke-width="1.6"/>

      <!-- Marcadores temporales -->
      <text x="60" y="260" text-anchor="middle" font-family="DM Mono" font-size="9" fill="#8a8478" letter-spacing="1.5">09:14</text>
      <text x="180" y="260" text-anchor="middle" font-family="DM Mono" font-size="9" fill="#8a8478" letter-spacing="1.5">11:32</text>
      <text x="300" y="260" text-anchor="middle" font-family="DM Mono" font-size="9" fill="#8a8478" letter-spacing="1.5">14:08</text>
      <text x="420" y="260" text-anchor="middle" font-family="DM Mono" font-size="9" fill="#8a8478" letter-spacing="1.5">16:45</text>

      <!-- Evento 1: Llamada entrante -->
      <g transform="translate(60 230)">
        <circle r="10" fill="#0b0a14" stroke="#4a8fd4" stroke-width="1.6"/>
        <path d="M -4 -2 Q -4 4 4 4" stroke="#4a8fd4" stroke-width="1.4" fill="none" stroke-linecap="round"/>
        <circle r="14" fill="none" stroke="#4a8fd4" stroke-width="0.6">
          <animate attributeName="r" values="10;22;10" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite"/>
        </circle>
        <text x="0" y="-38" text-anchor="middle" font-family="DM Mono" font-size="8" fill="#4a8fd4" letter-spacing="1.5">LLAMADA · 4:32</text>
        <text x="0" y="-22" text-anchor="middle" font-family="Saira" font-size="10" fill="#f0ece0">entrante</text>
      </g>

      <!-- Evento 2: WhatsApp -->
      <g transform="translate(180 230)">
        <circle r="10" fill="#0b0a14" stroke="#10b981" stroke-width="1.6"/>
        <path d="M -4 -3 L 4 -3 L 4 2 L 0 2 L -3 5 L -3 2 L -4 2 Z" stroke="#10b981" stroke-width="1" fill="#10b981" fill-opacity="0.2"/>
        <text x="0" y="-38" text-anchor="middle" font-family="DM Mono" font-size="8" fill="#10b981" letter-spacing="1.5">WHATSAPP</text>
        <text x="0" y="-22" text-anchor="middle" font-family="Saira" font-size="10" fill="#f0ece0">"mandé fotos"</text>
      </g>

      <!-- Evento 3: Audio -->
      <g transform="translate(300 230)">
        <circle r="10" fill="#0b0a14" stroke="#7f77dd" stroke-width="1.6"/>
        <path d="M -4 -2 L -4 2 M -1 -4 L -1 4 M 2 -3 L 2 3 M 5 -1 L 5 1" stroke="#7f77dd" stroke-width="1" stroke-linecap="round"/>
        <text x="0" y="-38" text-anchor="middle" font-family="DM Mono" font-size="8" fill="#7f77dd" letter-spacing="1.5">AUDIO · 0:42</text>
        <text x="0" y="-22" text-anchor="middle" font-family="Saira" font-size="10" fill="#f0ece0">cliente</text>
      </g>

      <!-- Evento 4: Llamada saliente -->
      <g transform="translate(420 230)">
        <circle r="10" fill="#0b0a14" stroke="#ef9f27" stroke-width="1.6"/>
        <path d="M -4 2 Q -4 -4 4 -4" stroke="#ef9f27" stroke-width="1.4" fill="none" stroke-linecap="round"/>
        <text x="0" y="-38" text-anchor="middle" font-family="DM Mono" font-size="8" fill="#ef9f27" letter-spacing="1.5">LLAMADA · 2:14</text>
        <text x="0" y="-22" text-anchor="middle" font-family="Saira" font-size="10" fill="#f0ece0">saliente</text>
      </g>

      <!-- Header: número oficial -->
      <rect x="100" y="60" width="320" height="60" rx="4" fill="#100f1e" stroke="#ef9f27" stroke-width="1" stroke-opacity="0.5"/>
      <text x="260" y="84" text-anchor="middle" font-family="DM Mono" font-size="9" fill="#8a8478" letter-spacing="2">NÚMERO OFICIAL SEPRIO</text>
      <text x="260" y="106" text-anchor="middle" font-family="Saira" font-size="20" font-weight="500" fill="#ef9f27" letter-spacing="3">+54 341 ··· ····</text>

      <!-- Conexiones del header a la timeline -->
      <line x1="260" y1="120" x2="260" y2="170" stroke="#ef9f27" stroke-width="0.6" stroke-dasharray="3 3" stroke-opacity="0.5">
        <animate attributeName="stroke-dashoffset" from="0" to="-30" dur="3s" repeatCount="indefinite"/>
      </line>

      <!-- Línea inferior: grabación + transcripción -->
      <rect x="60" y="320" width="400" height="96" rx="4" fill="#100f1e" stroke="#4a8fd4" stroke-width="0.6" stroke-opacity="0.4"/>
      <text x="80" y="344" font-family="DM Mono" font-size="9" fill="#4a8fd4" letter-spacing="1.5">▶ GRABACIÓN · LLAMADA 16:45</text>
      <text x="80" y="364" font-family="Saira" font-size="11" fill="#f0ece0" font-weight="300">"Hola Juan, te llamo para confirmarte que mañana</text>
      <text x="80" y="380" font-family="Saira" font-size="11" fill="#f0ece0" font-weight="300">vino el repuesto que estábamos esperando…"</text>
      <text x="80" y="396" font-family="DM Mono" font-size="8" fill="#8a8478" letter-spacing="1.5">TRANSCRIPCIÓN AUTOMÁTICA · BUSCABLE</text>

      <!-- Onda animada, centrada en la fila de GRABACIÓN (y≈340) -->
      ${Array.from({length: 18}).map((_, i) => {
        const cy = 340;
        const h1 = 3 + Math.abs(Math.sin(i)) * 5;
        const h2 = 3 + Math.abs(Math.sin(i + 4)) * 5;
        return `
        <rect x="${340 + i * 4}" y="${cy - h1/2}" width="2" height="${h1}" fill="#4a8fd4" opacity="0.55">
          <animate attributeName="height" values="${h1};${h2};${h1}" dur="${1 + (i % 3) * 0.3}s" repeatCount="indefinite"/>
          <animate attributeName="y" values="${cy - h1/2};${cy - h2/2};${cy - h1/2}" dur="${1 + (i % 3) * 0.3}s" repeatCount="indefinite"/>
        </rect>
      `;}).join('')}
    </svg>
  `,

  /* ====================== PROFESIONALIZACIÓN ====================== */
  profesionalizacion: () => `
    <svg viewBox="0 0 520 460" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="prof-row" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#100f1e"/>
          <stop offset="100%" stop-color="#0b0a14"/>
        </linearGradient>
      </defs>

      <!-- Dashboard mockup -->
      <rect x="40" y="40" width="440" height="380" rx="6" fill="#100f1e" stroke="#ef9f27" stroke-width="0.8" stroke-opacity="0.4"/>

      <!-- Top bar dashboard -->
      <rect x="40" y="40" width="440" height="32" rx="6" fill="#0b0a14"/>
      <circle cx="58" cy="56" r="3" fill="#ff1430" opacity="0.6"/>
      <circle cx="68" cy="56" r="3" fill="#ef9f27" opacity="0.6"/>
      <circle cx="78" cy="56" r="3" fill="#10b981" opacity="0.6"/>
      <text x="240" y="60" text-anchor="middle" font-family="DM Mono" font-size="9" fill="#8a8478" letter-spacing="2">PANEL GERENCIAL · COMUNICACIONES</text>

      <!-- KPI cards -->
      ${[
        {x: 50, y: 84, label: 'Hoy', value: '47', color: '#ef9f27', sub: 'conversaciones'},
        {x: 156, y: 84, label: 'Resp <2m', value: '82%', color: '#10b981', sub: 'tiempo respuesta'},
        {x: 262, y: 84, label: 'Sin contestar', value: '3', color: '#ff1430', sub: 'urgente'},
        {x: 368, y: 84, label: 'Leads', value: '+12', color: '#4a8fd4', sub: 'avanzaron'}
      ].map((k, i) => `
        <g>
          <rect x="${k.x}" y="${k.y}" width="102" height="76" rx="3" fill="url(#prof-row)" stroke="${k.color}" stroke-width="0.8" stroke-opacity="0.5"/>
          <text x="${k.x + 12}" y="${k.y + 20}" font-family="DM Mono" font-size="8" fill="#8a8478" letter-spacing="0.8">${k.label.toUpperCase()}</text>
          <text x="${k.x + 12}" y="${k.y + 52}" font-family="Saira" font-size="26" font-weight="500" fill="${k.color}">${k.value}</text>
          <text x="${k.x + 12}" y="${k.y + 66}" font-family="DM Mono" font-size="7" fill="#8a8478" letter-spacing="0.4">${k.sub}</text>
        </g>
      `).join('')}

      <!-- Lista vendedores -->
      <text x="56" y="186" font-family="DM Mono" font-size="9" fill="#8a8478" letter-spacing="2">CARGA POR VENDEDOR · TIEMPO MEDIO DE RESPUESTA</text>

      ${[
        {name: 'Nazareno · Ventas', load: 14, time: '1m 12s', bar: 85, color: '#10b981'},
        {name: 'María · Service', load: 11, time: '2m 04s', bar: 65, color: '#4a8fd4'},
        {name: 'Diego · Ventas', load: 9, time: '0m 48s', bar: 90, color: '#10b981'},
        {name: 'Lucía · Repuestos', load: 7, time: '4m 22s', bar: 45, color: '#ef9f27'},
        {name: 'Pablo · Service', load: 6, time: '8m 15s', bar: 20, color: '#ff1430'}
      ].map((v, i) => `
        <g transform="translate(56 ${204 + i * 36})">
          <rect x="0" y="0" width="408" height="28" rx="2" fill="url(#prof-row)" stroke="${v.color}" stroke-width="0.4" stroke-opacity="0.3"/>
          <text x="12" y="18" font-family="Saira" font-size="11" font-weight="400" fill="#f0ece0">${v.name}</text>
          <text x="180" y="18" font-family="DM Mono" font-size="9" fill="#8a8478">${v.load} convs</text>
          <text x="240" y="18" font-family="DM Mono" font-size="9" fill="#8a8478">${v.time}</text>
          <!-- barra -->
          <rect x="300" y="11" width="96" height="6" rx="1" fill="#0b0a14"/>
          <rect x="300" y="11" width="0" height="6" rx="1" fill="${v.color}">
            <animate attributeName="width" from="0" to="${(v.bar/100) * 96}" dur="1.4s" begin="${i * 0.18}s" fill="freeze"/>
          </rect>
        </g>
      `).join('')}

      <!-- Footer auditable -->
      <text x="56" y="408" font-family="DM Mono" font-size="8" fill="#8a8478" letter-spacing="1.5">CADA CONVERSACIÓN AUDITABLE · CADA NÚMERO TRAZABLE</text>
      <circle cx="464" cy="404" r="3" fill="#10b981">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
      </circle>
    </svg>
  `,

  /* ====================== MÉTRICAS + IA ====================== */
  'metricas-ia': () => `
    <svg viewBox="0 0 520 460" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="ia-brain" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#7f77dd" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="#7f77dd" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="ia-bar" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ef9f27"/>
          <stop offset="100%" stop-color="#7a5008"/>
        </linearGradient>
      </defs>

      <!-- Núcleo IA -->
      <circle cx="260" cy="200" r="80" fill="url(#ia-brain)"/>
      <circle cx="260" cy="200" r="50" fill="#0b0a14" stroke="#7f77dd" stroke-width="1.4"/>
      <circle cx="260" cy="200" r="50" fill="none" stroke="#7f77dd" stroke-width="0.6" opacity="0.5">
        <animate attributeName="r" values="50;64;50" dur="3.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.6;0;0.6" dur="3.5s" repeatCount="indefinite"/>
      </circle>
      <text x="260" y="196" text-anchor="middle" font-family="DM Mono" font-size="9" fill="#8a8478" letter-spacing="2">MOTOR</text>
      <text x="260" y="212" text-anchor="middle" font-family="Saira" font-size="14" font-weight="600" fill="#7f77dd" letter-spacing="2">IA</text>

      <!-- Datos entrando (izquierda) -->
      ${[
        {y: 90, label: 'conversaciones'},
        {y: 140, label: 'tiempos'},
        {y: 190, label: 'transcripciones'},
        {y: 240, label: 'sentimiento'},
        {y: 290, label: 'historial'}
      ].map((d, i) => `
        <g>
          <text x="100" y="${d.y + 4}" text-anchor="end" font-family="DM Mono" font-size="9" fill="#8a8478" letter-spacing="1">${d.label}</text>
          <line x1="110" y1="${d.y}" x2="210" y2="200" stroke="#4a8fd4" stroke-width="0.6" stroke-opacity="0.3" stroke-dasharray="3 3"/>
          <circle r="2" fill="#4a8fd4">
            <animateMotion path="M 110 ${d.y} L 210 200" dur="${2.5 + i * 0.2}s" repeatCount="indefinite" begin="${i * 0.4}s"/>
            <animate attributeName="opacity" values="0;1;1;0" dur="${2.5 + i * 0.2}s" repeatCount="indefinite" begin="${i * 0.4}s"/>
          </circle>
        </g>
      `).join('')}

      <!-- Insights saliendo (derecha) -->
      ${[
        {y: 90, label: 'Resumen', icon: '≡'},
        {y: 140, label: 'Lead caliente', icon: '★'},
        {y: 190, label: 'Sentimiento', icon: '♥'},
        {y: 240, label: 'Sugerencia', icon: '→'},
        {y: 290, label: 'Búsqueda', icon: '⌕'}
      ].map((d, i) => `
        <g>
          <text x="410" y="${d.y + 4}" text-anchor="middle" font-family="Saira" font-size="14" fill="#ef9f27">${d.icon}</text>
          <text x="424" y="${d.y + 4}" font-family="DM Mono" font-size="9" fill="#ef9f27" letter-spacing="1">${d.label}</text>
          <line x1="310" y1="200" x2="400" y2="${d.y}" stroke="#ef9f27" stroke-width="0.6" stroke-opacity="0.3" stroke-dasharray="3 3"/>
          <circle r="2" fill="#ef9f27">
            <animateMotion path="M 310 200 L 400 ${d.y}" dur="${2 + i * 0.25}s" repeatCount="indefinite" begin="${i * 0.4 + 1.4}s"/>
            <animate attributeName="opacity" values="0;1;1;0" dur="${2 + i * 0.25}s" repeatCount="indefinite" begin="${i * 0.4 + 1.4}s"/>
          </circle>
        </g>
      `).join('')}

      <!-- Gráfico inferior: serie temporal -->
      <g transform="translate(60 340)">
        <text x="0" y="0" font-family="DM Mono" font-size="9" fill="#8a8478" letter-spacing="1.5">CONVERSIÓN · ÚLTIMOS 30 DÍAS</text>
        <line x1="0" y1="70" x2="400" y2="70" stroke="#8a8478" stroke-width="0.4" stroke-opacity="0.4"/>
        ${(() => {
          const vals = [22, 28, 24, 35, 30, 42, 38, 48, 44, 55, 52, 60];
          const max = 70;
          const w = 28, gap = 6;
          return vals.map((v, i) => `
            <rect x="${i * (w + gap)}" y="${70 - (v / max) * 60}" width="${w}" height="0" rx="1" fill="url(#ia-bar)">
              <animate attributeName="height" from="0" to="${(v / max) * 60}" dur="0.8s" begin="${i * 0.05 + 0.3}s" fill="freeze"/>
              <animate attributeName="y" from="70" to="${70 - (v / max) * 60}" dur="0.8s" begin="${i * 0.05 + 0.3}s" fill="freeze"/>
            </rect>
          `).join('');
        })()}
        <text x="400" y="14" text-anchor="end" font-family="DM Mono" font-size="14" font-weight="500" fill="#10b981">↗ +172%</text>
      </g>
    </svg>
  `,

  /* ====================== POR QUÉ IMPORTA ====================== */
  'por-que-importa': () => `
    <svg viewBox="0 0 520 460" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="pq-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#4a8fd4"/>
          <stop offset="50%" stop-color="#ef9f27"/>
          <stop offset="100%" stop-color="#ff1430"/>
        </linearGradient>
      </defs>

      <!-- Tres columnas: hoy / mañana / siempre -->
      ${[
        {x: 32, label: 'HOY', sub: 'Orden + visibilidad', icon: 'clock', color: '#4a8fd4', items: ['Atención ordenada', 'Equipo profesional', 'Visibilidad real']},
        {x: 188, label: 'MAÑANA', sub: 'Central completa', icon: 'phone', color: '#ef9f27', items: ['+ Telefonía', '+ Multimedia avanzada', '+ Integraciones']},
        {x: 344, label: 'SIEMPRE', sub: 'Inteligencia acumulada', icon: 'infinity', color: '#ff1430', items: ['Datos históricos', 'Aprendizaje IA', 'Mejores decisiones']}
      ].map((c, i) => `
        <g transform="translate(${c.x} 50)">
          <rect x="0" y="0" width="144" height="340" rx="4" fill="#100f1e" stroke="${c.color}" stroke-width="1" stroke-opacity="0.5"/>
          <rect x="0" y="0" width="144" height="48" rx="4" fill="${c.color}" fill-opacity="0.1"/>
          <text x="72" y="22" text-anchor="middle" font-family="DM Mono" font-size="9" fill="#8a8478" letter-spacing="2.5">FASE 0${i+1}</text>
          <text x="72" y="40" text-anchor="middle" font-family="Saira" font-size="18" font-weight="600" fill="${c.color}" letter-spacing="3">${c.label}</text>
          <text x="72" y="72" text-anchor="middle" font-family="Saira" font-size="11" fill="#f0ece0" font-weight="300">${c.sub}</text>

          <!-- ícono central -->
          <circle cx="72" cy="140" r="32" fill="none" stroke="${c.color}" stroke-width="0.8" stroke-opacity="0.5">
            <animate attributeName="r" values="32;38;32" dur="${3 + i * 0.5}s" repeatCount="indefinite"/>
          </circle>
          <circle cx="72" cy="140" r="22" fill="#0b0a14" stroke="${c.color}" stroke-width="1.2"/>
          ${i === 0 ? `<circle cx="72" cy="140" r="12" fill="none" stroke="${c.color}" stroke-width="1.2"/><line x1="72" y1="140" x2="72" y2="132" stroke="${c.color}" stroke-width="1.4" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 72 140" to="360 72 140" dur="6s" repeatCount="indefinite"/></line><line x1="72" y1="140" x2="78" y2="140" stroke="${c.color}" stroke-width="1.4" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 72 140" to="360 72 140" dur="20s" repeatCount="indefinite"/></line>` : ''}
          ${i === 1 ? `<path d="M 65 132 L 67 130 Q 72 130 72 135 L 72 138 L 77 144 Q 79 146 77 148 L 75 150 Q 70 150 68 148 L 65 145 Q 63 140 65 132 Z" fill="${c.color}" fill-opacity="0.4" stroke="${c.color}" stroke-width="1"/>` : ''}
          ${i === 2 ? `<path d="M 60 140 Q 60 130 68 130 Q 72 130 72 140 Q 72 150 76 150 Q 84 150 84 140 Q 84 130 76 130 Q 72 130 72 140 Q 72 150 68 150 Q 60 150 60 140 Z" fill="none" stroke="${c.color}" stroke-width="1.4"><animateTransform attributeName="transform" type="rotate" from="0 72 140" to="360 72 140" dur="14s" repeatCount="indefinite"/></path>` : ''}

          <!-- items -->
          ${c.items.map((it, j) => `
            <g transform="translate(14 ${198 + j * 30})">
              <circle cx="6" cy="8" r="2" fill="${c.color}"/>
              <text x="18" y="12" font-family="Saira" font-size="10.5" font-weight="300" fill="#f0ece0">${it}</text>
            </g>
          `).join('')}
        </g>
      `).join('')}

      <!-- Línea de continuidad inferior -->
      <line x1="50" y1="420" x2="470" y2="420" stroke="url(#pq-grad)" stroke-width="1.4"/>
      <text x="50" y="440" font-family="DM Mono" font-size="9" fill="#8a8478" letter-spacing="2">UNA PIEZA QUE CAMBIA TRES COSAS A LA VEZ</text>

      <!-- Partícula viajando por la línea -->
      <circle r="4" fill="#ef9f27">
        <animateMotion path="M 50 420 L 470 420" dur="6s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0;1;1;0" dur="6s" repeatCount="indefinite"/>
      </circle>
    </svg>
  `,

  /* ====================== ARQUITECTURA MODULAR ====================== */
  arquitectura: () => `
    <svg viewBox="0 0 520 460" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="ar-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ef9f27" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#4a8fd4" stop-opacity="0.05"/>
        </linearGradient>
      </defs>

      <!-- Núcleo Plataforma Seprio -->
      <rect x="200" y="190" width="120" height="80" rx="4" fill="url(#ar-glow)" stroke="#ef9f27" stroke-width="1.2"/>
      <text x="260" y="216" text-anchor="middle" font-family="DM Mono" font-size="8" fill="#8a8478" letter-spacing="2.5">NÚCLEO</text>
      <text x="260" y="234" text-anchor="middle" font-family="Saira" font-size="13" font-weight="600" fill="#ef9f27">Plataforma</text>
      <text x="260" y="252" text-anchor="middle" font-family="Saira" font-size="13" font-weight="600" fill="#ef9f27">Seprio</text>
      <text x="260" y="265" text-anchor="middle" font-family="DM Mono" font-size="7" fill="#8a8478" letter-spacing="1.5">datos · auth · IA</text>

      <!-- Módulos -->
      ${[
        {x: 50,  y: 80,  w: 150, h: 64, label: 'Servicios', status: 'ACTIVO', sub: 'LPR · flujo taller', color: '#10b981', done: true},
        {x: 320, y: 80,  w: 150, h: 64, label: 'Comunicaciones', status: 'PROPUESTA', sub: 'esta presentación', color: '#ef9f27', proposed: true},
        {x: 50,  y: 316, w: 150, h: 64, label: 'Ventas', status: 'POSIBLE', sub: 'pipeline comercial', color: '#4a8fd4'},
        {x: 320, y: 316, w: 150, h: 64, label: 'Repuestos · Admin', status: 'POSIBLE', sub: 'stock · facturación', color: '#7f77dd'}
      ].map((m, i) => `
        <g>
          <!-- conexión al núcleo -->
          <line x1="${m.x + m.w/2}" y1="${m.y + m.h/2}" x2="260" y2="230" stroke="${m.color}" stroke-width="0.6" stroke-opacity="${m.done || m.proposed ? 0.6 : 0.25}" stroke-dasharray="${m.done ? '0' : '3 3'}">
            ${!m.done ? `<animate attributeName="stroke-dashoffset" from="0" to="-30" dur="${3 + i * 0.4}s" repeatCount="indefinite"/>` : ''}
          </line>
          ${m.proposed ? `
            <circle r="3" fill="${m.color}">
              <animateMotion path="M ${m.x + m.w/2} ${m.y + m.h/2} L 260 230" dur="2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite"/>
            </circle>
          ` : ''}

          <!-- box -->
          <rect x="${m.x}" y="${m.y}" width="${m.w}" height="${m.h}" rx="3" fill="#100f1e" stroke="${m.color}" stroke-width="${m.proposed ? 1.6 : 1}" stroke-opacity="${m.done || m.proposed ? 1 : 0.5}" stroke-dasharray="${m.done || m.proposed ? '0' : '4 3'}"/>
          ${m.proposed ? `<rect x="${m.x}" y="${m.y}" width="${m.w}" height="${m.h}" rx="3" fill="none" stroke="${m.color}" stroke-width="0.6" opacity="0.5"><animate attributeName="stroke-width" values="0.6;2;0.6" dur="2.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.7;0;0.7" dur="2.4s" repeatCount="indefinite"/></rect>` : ''}

          <!-- status badge -->
          <text x="${m.x + 10}" y="${m.y + 16}" font-family="DM Mono" font-size="7" fill="${m.color}" letter-spacing="1.5">${m.status}</text>
          ${m.done ? `<circle cx="${m.x + m.w - 14}" cy="${m.y + 14}" r="3" fill="${m.color}"/>` : ''}
          ${m.proposed ? `<circle cx="${m.x + m.w - 14}" cy="${m.y + 14}" r="3" fill="${m.color}"><animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite"/></circle>` : ''}

          <text x="${m.x + 10}" y="${m.y + 38}" font-family="Saira" font-size="13" font-weight="500" fill="#f0ece0">${m.label}</text>
          <text x="${m.x + 10}" y="${m.y + 54}" font-family="DM Mono" font-size="8" fill="#8a8478" letter-spacing="1">${m.sub}</text>
        </g>
      `).join('')}

      <!-- Avatares de rol por área (cada usuario sólo accede a su área) -->
      ${[
        {x: 28,  y: 30,  color: '#10b981', label: 'SERVICE',   anchor: 'start', tx: 18},
        {x: 492, y: 30,  color: '#ef9f27', label: 'GERENCIA',  anchor: 'end',   tx: -18},
        {x: 28,  y: 418, color: '#4a8fd4', label: 'VENTAS',    anchor: 'start', tx: 18},
        {x: 492, y: 418, color: '#7f77dd', label: 'REPUESTOS', anchor: 'end',   tx: -18}
      ].map(av => {
        const rgba = av.color === '#10b981' ? '16,185,129' :
                     av.color === '#ef9f27' ? '239,159,39' :
                     av.color === '#4a8fd4' ? '74,143,212' : '127,119,221';
        return `
        <g transform="translate(${av.x} ${av.y})">
          <circle r="11" fill="rgba(${rgba},0.12)" stroke="${av.color}" stroke-width="1"/>
          <circle cy="-2.5" r="3" fill="${av.color}"/>
          <path d="M -5.5 6 Q 0 1.5 5.5 6" stroke="${av.color}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
          <text x="${av.tx}" y="3" text-anchor="${av.anchor}" font-family="DM Mono" font-size="8" fill="${av.color}" letter-spacing="1.5">${av.label}</text>
        </g>
      `;}).join('')}

      <!-- Caption -->
      <text x="260" y="445" text-anchor="middle" font-family="DM Mono" font-size="8" fill="#8a8478" letter-spacing="2.5">CADA ROL VE SÓLO SU MÓDULO · NÚCLEO COMPARTE DATOS Y IA</text>
    </svg>
  `,

  /* ====================== CIERRE ====================== */
  cierre: () => `
    <svg viewBox="0 0 520 460" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="cl-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ef9f27" stop-opacity="0.5"/>
          <stop offset="60%" stop-color="#ef9f27" stop-opacity="0.1"/>
          <stop offset="100%" stop-color="#ef9f27" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <!-- Sol central -->
      <circle cx="260" cy="200" r="120" fill="url(#cl-sun)"/>
      <circle cx="260" cy="200" r="48" fill="#0b0a14" stroke="#ef9f27" stroke-width="1.6"/>

      <!-- Rayos animados -->
      ${Array.from({length: 12}).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x1 = 260 + Math.cos(angle) * 60;
        const y1 = 200 + Math.sin(angle) * 60;
        const x2 = 260 + Math.cos(angle) * 100;
        const y2 = 200 + Math.sin(angle) * 100;
        return `
          <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#ef9f27" stroke-width="1" stroke-opacity="0.6">
            <animate attributeName="stroke-opacity" values="0.6;0.2;0.6" dur="${2 + (i % 3) * 0.5}s" repeatCount="indefinite" begin="${i * 0.1}s"/>
          </line>
        `;
      }).join('')}

      <!-- Texto central -->
      <text x="260" y="196" text-anchor="middle" font-family="DM Mono" font-size="9" fill="#8a8478" letter-spacing="2.5">PRÓXIMO</text>
      <text x="260" y="216" text-anchor="middle" font-family="Saira" font-size="16" font-weight="600" fill="#ef9f27">MÓDULO</text>

      <!-- Órbita exterior con módulos a venir -->
      <circle cx="260" cy="200" r="160" fill="none" stroke="#ef9f27" stroke-width="0.4" stroke-opacity="0.2" stroke-dasharray="3 4"/>

      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 260 200" to="360 260 200" dur="40s" repeatCount="indefinite"/>
        ${[
          {angle: 0, label: 'Comunicaciones', color: '#ef9f27', big: true},
          {angle: 72, label: 'Ventas', color: '#4a8fd4'},
          {angle: 144, label: 'Repuestos', color: '#7f77dd'},
          {angle: 216, label: 'Admin', color: '#06b6d4'},
          {angle: 288, label: 'Servicios', color: '#10b981', big: true}
        ].map(m => {
          const a = (m.angle / 360) * Math.PI * 2;
          const x = 260 + Math.cos(a) * 160;
          const y = 200 + Math.sin(a) * 160;
          return `
            <g transform="translate(${x} ${y})">
              <circle r="${m.big ? 10 : 7}" fill="#0b0a14" stroke="${m.color}" stroke-width="${m.big ? 1.4 : 1}"/>
              <g transform="rotate(${-m.angle})">
                <text y="${m.big ? 26 : 20}" text-anchor="middle" font-family="DM Mono" font-size="8" fill="${m.color}" letter-spacing="1.5">${m.label.toUpperCase()}</text>
              </g>
            </g>
          `;
        }).join('')}
      </g>

      <!-- CTA inferior -->
      <text x="260" y="420" text-anchor="middle" font-family="Saira" font-size="14" font-weight="400" fill="#f0ece0">Dejá tu feedback. Lo recibimos del otro lado.</text>
      <text x="260" y="442" text-anchor="middle" font-family="DM Mono" font-size="9" fill="#8a8478" letter-spacing="2.5">RIA LABS · SEPRIO · 2026</text>
    </svg>
  `
};

// Renderizar diagramas en cada slot
function renderDiagrams() {
  document.querySelectorAll('[data-art]').forEach(el => {
    const key = el.getAttribute('data-art');
    if (DIAGRAMS[key]) {
      el.innerHTML = DIAGRAMS[key]();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderDiagrams);
} else {
  renderDiagrams();
}
