import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, image, url, type = "website", schema }) {
  const siteTitle = "Safari & Hotels Jawai";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDesc = description || "Book authentic leopard safaris and luxury heritage stays in Jawai, Rajasthan. Verified guides and instant booking.";
  const metaImg = image || "https://yourdomain.com/default-share-image.jpg"; // Replace with your actual domain image
  const metaUrl = url || window.location.href;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={metaUrl} />

      {/* Facebook / Open Graph (For when people share links) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={metaImg} />
      <meta property="og:url" content={metaUrl} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={metaImg} />

      {/* STRUCTURED DATA (The Secret Weapon for Google) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}