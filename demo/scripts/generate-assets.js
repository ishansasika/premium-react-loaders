#!/usr/bin/env node
/**
 * Generates all static image assets for the demo app:
 *   - og-image.png (1200x630) — social share card
 *   - favicon.svg              — scalable icon
 *   - favicon-32x32.png
 *   - favicon-16x16.png
 *   - apple-touch-icon.png (180x180)
 *   - icon-192.png  (PWA)
 *   - icon-512.png  (PWA)
 *
 * Run: node scripts/generate-assets.js
 */

import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');

// ─── SVG Sources ────────────────────────────────────────────────────────────

const ogImageSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
    <linearGradient id="ring1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#93c5fd" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#60a5fa" stop-opacity="0.3"/>
    </linearGradient>
    <linearGradient id="ring2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#bfdbfe" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.2"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Subtle grid overlay -->
  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" stroke-width="0.3" stroke-opacity="0.08"/>
  </pattern>
  <rect width="1200" height="630" fill="url(#grid)"/>

  <!-- Decorative spinner rings (right side) -->
  <!-- Outer ring -->
  <circle cx="920" cy="315" r="220" fill="none" stroke="url(#ring1)" stroke-width="3" stroke-opacity="0.4"/>
  <!-- Middle ring full -->
  <circle cx="920" cy="315" r="170" fill="none" stroke="white" stroke-width="2" stroke-opacity="0.12"/>
  <!-- Spinner arc (partial circle) -->
  <path d="M 920 135 A 180 180 0 0 1 1087 378" fill="none" stroke="#93c5fd" stroke-width="12" stroke-linecap="round" stroke-opacity="0.85" filter="url(#glow)"/>
  <!-- Inner spinner arc -->
  <path d="M 920 175 A 140 140 0 0 0 780 315" fill="none" stroke="#bfdbfe" stroke-width="8" stroke-linecap="round" stroke-opacity="0.7"/>
  <!-- Dots -->
  <circle cx="920" cy="135" r="8" fill="#93c5fd" opacity="0.9" filter="url(#glow)"/>
  <circle cx="1087" cy="378" r="6" fill="#60a5fa" opacity="0.8"/>
  <circle cx="780" cy="315" r="5" fill="#bfdbfe" opacity="0.7"/>
  <!-- Outer decorative ring -->
  <circle cx="920" cy="315" r="260" fill="none" stroke="white" stroke-width="1" stroke-opacity="0.06"/>

  <!-- Skeleton placeholder bars (left of rings, decorative) -->
  <rect x="680" y="490" width="120" height="10" rx="5" fill="white" opacity="0.15"/>
  <rect x="680" y="508" width="80" height="10" rx="5" fill="white" opacity="0.1"/>

  <!-- Left content area -->
  <!-- Icon badge -->
  <rect x="72" y="72" width="56" height="56" rx="14" fill="white" opacity="0.15"/>
  <circle cx="100" cy="100" r="18" fill="none" stroke="white" stroke-width="3.5" stroke-opacity="0.9"/>
  <path d="M 100 82 A 18 18 0 0 1 118 100" fill="none" stroke="#93c5fd" stroke-width="4" stroke-linecap="round" filter="url(#glow)"/>

  <!-- Main heading -->
  <text x="72" y="196" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-weight="700" font-size="68" fill="white" letter-spacing="-1">Premium React</text>
  <text x="72" y="275" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-weight="700" font-size="68" fill="white" letter-spacing="-1">Loaders</text>

  <!-- Accent underline -->
  <rect x="72" y="294" width="280" height="5" rx="2.5" fill="#93c5fd" opacity="0.8"/>

  <!-- Subtitle -->
  <text x="72" y="352" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-weight="400" font-size="30" fill="white" opacity="0.85">65+ Production-Ready Loading</text>
  <text x="72" y="390" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-weight="400" font-size="30" fill="white" opacity="0.85">Components for React</text>

  <!-- Tags -->
  <rect x="72" y="430" width="148" height="38" rx="19" fill="white" fill-opacity="0.15"/>
  <text x="146" y="454" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="18" fill="white" opacity="0.9" text-anchor="middle">TypeScript</text>

  <rect x="232" y="430" width="170" height="38" rx="19" fill="white" fill-opacity="0.15"/>
  <text x="317" y="454" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="18" fill="white" opacity="0.9" text-anchor="middle">65+ Components</text>

  <rect x="414" y="430" width="152" height="38" rx="19" fill="white" fill-opacity="0.15"/>
  <text x="490" y="454" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="18" fill="white" opacity="0.9" text-anchor="middle">Zero Deps</text>

  <!-- URL -->
  <text x="72" y="558" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="22" fill="white" opacity="0.6">premium-react-loaders.ishansasika.dev</text>
</svg>`;

// Favicon — ring spinner with a gap arc
const faviconSVG = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
  </defs>
  <!-- Background circle -->
  <circle cx="16" cy="16" r="16" fill="url(#bg)"/>
  <!-- Full track ring -->
  <circle cx="16" cy="16" r="10" fill="none" stroke="white" stroke-width="2.5" stroke-opacity="0.25"/>
  <!-- Spinner arc ~270deg -->
  <path d="M 16 6 A 10 10 0 1 1 6 16" fill="none" stroke="white" stroke-width="2.8" stroke-linecap="round"/>
  <!-- Dot at arc end -->
  <circle cx="6" cy="16" r="1.8" fill="#93c5fd"/>
</svg>`;

// Larger icon — same design scaled for 192/512
const iconSVG = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <!-- Background with rounded corners for maskable -->
  <rect width="512" height="512" rx="96" fill="url(#bg)"/>
  <!-- Outer track ring -->
  <circle cx="256" cy="256" r="160" fill="none" stroke="white" stroke-width="18" stroke-opacity="0.2"/>
  <!-- Spinner arc ~270deg -->
  <path d="M 256 96 A 160 160 0 1 1 96 256" fill="none" stroke="white" stroke-width="22" stroke-linecap="round" filter="url(#glow)"/>
  <!-- Inner ring -->
  <circle cx="256" cy="256" r="108" fill="none" stroke="white" stroke-width="12" stroke-opacity="0.15"/>
  <!-- Inner arc -->
  <path d="M 256 148 A 108 108 0 0 0 148 256" fill="none" stroke="#93c5fd" stroke-width="16" stroke-linecap="round" opacity="0.8"/>
  <!-- Center dot -->
  <circle cx="256" cy="256" r="22" fill="white" opacity="0.9"/>
  <!-- Dot at arc ends -->
  <circle cx="256" cy="96" r="14" fill="#bfdbfe" opacity="0.95"/>
  <circle cx="96" cy="256" r="10" fill="#93c5fd" opacity="0.85"/>
</svg>`;

// Apple touch icon — same as large icon but square (no rounded corners — iOS clips it)
const appleTouchSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="512" height="512" fill="url(#bg)"/>
  <circle cx="256" cy="256" r="160" fill="none" stroke="white" stroke-width="18" stroke-opacity="0.2"/>
  <path d="M 256 96 A 160 160 0 1 1 96 256" fill="none" stroke="white" stroke-width="22" stroke-linecap="round" filter="url(#glow)"/>
  <circle cx="256" cy="256" r="108" fill="none" stroke="white" stroke-width="12" stroke-opacity="0.15"/>
  <path d="M 256 148 A 108 108 0 0 0 148 256" fill="none" stroke="#93c5fd" stroke-width="16" stroke-linecap="round" opacity="0.8"/>
  <circle cx="256" cy="256" r="22" fill="white" opacity="0.9"/>
  <circle cx="256" cy="96" r="14" fill="#bfdbfe" opacity="0.95"/>
  <circle cx="96" cy="256" r="10" fill="#93c5fd" opacity="0.85"/>
</svg>`;

// ─── Generate assets ─────────────────────────────────────────────────────────

async function generate() {
  console.log('Generating image assets...\n');

  // favicon.svg — written directly (no rasterization needed)
  const svgPath = join(PUBLIC, 'favicon.svg');
  writeFileSync(svgPath, faviconSVG(32));
  console.log('✓ favicon.svg');

  const tasks = [
    {
      name: 'og-image.png',
      svg: ogImageSVG,
      width: 1200,
      height: 630,
    },
    {
      name: 'favicon-32x32.png',
      svg: faviconSVG(32),
      width: 32,
      height: 32,
    },
    {
      name: 'favicon-16x16.png',
      svg: faviconSVG(16),
      width: 16,
      height: 16,
    },
    {
      name: 'apple-touch-icon.png',
      svg: appleTouchSVG,
      width: 180,
      height: 180,
    },
    {
      name: 'icon-192.png',
      svg: iconSVG(192),
      width: 192,
      height: 192,
    },
    {
      name: 'icon-512.png',
      svg: iconSVG(512),
      width: 512,
      height: 512,
    },
  ];

  for (const { name, svg, width, height } of tasks) {
    await sharp(Buffer.from(svg))
      .resize(width, height)
      .png()
      .toFile(join(PUBLIC, name));
    console.log(`✓ ${name} (${width}×${height})`);
  }

  console.log('\nAll assets written to public/');
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
