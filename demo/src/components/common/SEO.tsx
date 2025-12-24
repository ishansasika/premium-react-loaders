import { Helmet } from 'react-helmet-async';
import type { SEOMetadata } from '../../utils/seo';

interface SEOProps {
  metadata: SEOMetadata;
}

export function SEO({ metadata }: SEOProps) {
  const {
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogType = 'website',
    twitterCard = 'summary_large_image',
    twitterTitle,
    twitterDescription,
    twitterImage,
    canonical,
  } = metadata;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:site_name" content="Premium React Loaders" />

      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      {canonical && <meta property="twitter:url" content={canonical} />}
      <meta
        property="twitter:title"
        content={twitterTitle || ogTitle || title}
      />
      <meta
        property="twitter:description"
        content={twitterDescription || ogDescription || description}
      />
      {(twitterImage || ogImage) && (
        <meta property="twitter:image" content={twitterImage || ogImage} />
      )}
      <meta name="twitter:creator" content="@ishansasika" />

      {/* Additional Meta Tags */}
      <meta name="author" content="Ishan Sasika" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
    </Helmet>
  );
}
