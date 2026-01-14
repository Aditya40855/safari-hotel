import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, image, url, type = "website", schema }) {
  const siteTitle = "Safari & Hotels Jawai";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDesc = description || "Book authentic leopard safaris and luxury heritage stays in Jawai, Rajasthan. Verified guides and instant booking.";
  const metaImg = image || "https://www.jawaiunfiltered.com/default-share-image.jpg"; // Updated domain image
  const metaUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const locale = "en_IN";
  const hreflang = "en-IN";

  // Helper to safely stringify schema(s)
  const renderSchemas = () => {
    if (!schema) return null;
    const schemas = Array.isArray(schema) ? schema : [schema];
    return schemas.map((sch, index) => (
      <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sch) }} />
    ));
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={metaUrl} />
      <link rel="alternate" hrefLang={hreflang} href={metaUrl} />

      {/* Robots Meta */}
      <meta name="robots" content="index, follow" />

      {/* Viewport Fallback Safety */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Theme Color */}
      <meta name="theme-color" content="#004d40" />

      {/* Facebook / Open Graph (For when people share links) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={metaImg} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content={locale} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={metaImg} />
      <meta name="twitter:site" content="@yourtwitterhandle" />
      <meta name="twitter:creator" content="@yourtwitterhandle" />

      {/* STRUCTURED DATA (The Secret Weapon for Google) */}
      {renderSchemas()}
    </Helmet>
  );
}