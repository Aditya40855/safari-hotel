const express = require('express');
const router = express.Router();
const db = require('../db'); // <--- IMPORT YOUR EXISTING DB

router.get('/sitemap.xml', async (req, res) => {
  try {
    // ⚠️ Change this to your real website domain
    const baseUrl = 'https://safariandhotels.com'; 

    // 1. Static Pages
    const staticPages = [
      { url: '/', changefreq: 'daily', priority: 1.0 },
      { url: '/safaris', changefreq: 'daily', priority: 0.8 },
      { url: '/hotels', changefreq: 'daily', priority: 0.8 },
      { url: '/contact', changefreq: 'monthly', priority: 0.5 },
    ];

    // 2. Fetch IDs using your existing DB Query
    const hotels = await db.query("SELECT id FROM hotels");
    const safaris = await db.query("SELECT id FROM safaris");

    // 3. Build XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // 4. Add Static Pages
    staticPages.forEach(page => {
      xml += `
      <url>
        <loc>${baseUrl}${page.url}</loc>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
      </url>`;
    });

    // 5. Add Hotels
    hotels.rows.forEach(h => {
      xml += `
      <url>
        <loc>${baseUrl}/hotels/${h.id}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>`;
    });

    // 6. Add Safaris
    safaris.rows.forEach(s => {
      xml += `
      <url>
        <loc>${baseUrl}/safaris/${s.id}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);

  } catch (error) {
    console.error("Sitemap Generation Error:", error);
    res.status(500).end();
  }
});

module.exports = router;