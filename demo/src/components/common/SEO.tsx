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
      <meta name="author" content="Ishan Karunaratne" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={ogType} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:site_name" content="Premium React Loaders" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImage && <meta property="og:image:width" content="1200" />}
      {ogImage && <meta property="og:image:height" content="630" />}
      {ogImage && (
        <meta
          property="og:image:alt"
          content={ogTitle || title}
        />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      {canonical && <meta name="twitter:url" content={canonical} />}
      <meta name="twitter:site" content="@ishansasika" />
      <meta name="twitter:creator" content="@ishansasika" />
      <meta name="twitter:title" content={twitterTitle || ogTitle || title} />
      <meta
        name="twitter:description"
        content={twitterDescription || ogDescription || description}
      />
      {(twitterImage || ogImage) && (
        <meta name="twitter:image" content={twitterImage || ogImage} />
      )}
      {(twitterImage || ogImage) && (
        <meta name="twitter:image:alt" content={ogTitle || title} />
      )}
    </Helmet>
  );
}
