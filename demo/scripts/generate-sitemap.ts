import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Handle ES modules __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://premium-react-loaders.ishansasika.dev';
const LAST_MOD = new Date().toISOString().split('T')[0];

// Component IDs - update this list when adding new components
const COMPONENT_IDS = [
  'skeleton',
  'skeleton-text',
  'skeleton-avatar',
  'skeleton-image',
  'skeleton-card',
  'skeleton-list',
  'skeleton-table',
  'skeleton-page',
  'spinner-circle',
  'spinner-ring',
  'spinner-dots',
  'spinner-bars',
  'spinner-grid',
  'progress-bar',
  'progress-circle',
  'progress-ring',
  'pulse-dots',
  'pulse-wave',
  'pulse-bars',
  'loader-overlay',
];

function generateSitemap() {
  const urls = [
    // Main pages
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/playground', priority: '0.9', changefreq: 'weekly' },
    { loc: '/gallery', priority: '0.9', changefreq: 'weekly' },
    { loc: '/docs', priority: '0.8', changefreq: 'monthly' },

    // Component pages
    ...COMPONENT_IDS.map((id) => ({
      loc: `/playground/${id}`,
      priority: '0.7',
      changefreq: 'monthly',
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${BASE_URL}${url.loc}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, sitemap);
  console.log('✅ Sitemap generated successfully at:', outputPath);
  console.log(`📊 Total URLs: ${urls.length}`);
}

generateSitemap();
