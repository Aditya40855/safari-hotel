const express = require('express');
const router = express.Router();
const db = require('../db'); 

router.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = 'https://jawaiunfiltered.com'; 
    const today = new Date().toISOString(); // Core for the <lastmod> tag

    // 1. Static Pages (Updated with your new routes)
    const staticPages = [
      { url: '/', changefreq: 'daily', priority: 1.0 },
      { url: '/safaris', changefreq: 'daily', priority: 0.9 },
      { url: '/hotels', changefreq: 'daily', priority: 0.9 },
      { url: '/celebrate', changefreq: 'weekly', priority: 0.8 }, // New high-value page
      { url: '/legal', changefreq: 'monthly', priority: 0.3 },   // Low priority for SEO
      { url: '/contact', changefreq: 'monthly', priority: 0.5 },
    ];

    // 2. Fetch IDs and Timestamps (If your DB has updated_at, use it!)
    const hotels = await db.query("SELECT id FROM hotels");
    const safaris = await db.query("SELECT id FROM safaris");

    // 3. Build XML Header
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`; // Added Image SEO namespace

    // 4. Add Static Pages
    staticPages.forEach(page => {
      xml += `
      <url>
        <loc>${baseUrl}${page.url}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
      </url>`;
    });

    // 5. Add Hotels
    hotels.rows.forEach(h => {
      xml += `
      <url>
        <loc>${baseUrl}/hotels/${h.id}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>`;
    });

    // 6. Add Safaris (Critical for your 20 new packages)
    safaris.rows.forEach(s => {
      xml += `
      <url>
        <loc>${baseUrl}/safaris/${s.id}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml.trim());

  } catch (error) {
    console.error("Sitemap Generation Error:", error);
    res.status(500).end();
  }
});

module.exports = router;