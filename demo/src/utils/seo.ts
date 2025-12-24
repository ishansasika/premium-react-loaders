import { COMPONENTS, CATEGORIES } from '../data/components';

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
}

export const BASE_URL = 'https://premium-react-loaders.ishansasika.dev';
export const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

// Homepage SEO
export const homeSEO: SEOMetadata = {
  title: 'Premium React Loaders - 20 Production-Ready Loading Components',
  description:
    'Premium React Loaders provides 20 beautiful, customizable loading components for React. Includes skeleton screens, spinners, progress bars, and pulse loaders with TypeScript support and Tailwind CSS styling.',
  keywords: [
    'react loaders',
    'react loading components',
    'react spinners',
    'react skeleton',
    'react progress bar',
    'premium react loaders',
    'loading animation react',
    'skeleton screen react',
    'react loading indicators',
    'typescript react loaders',
    'tailwind react loaders',
  ],
  ogType: 'website',
  ogImage: DEFAULT_OG_IMAGE,
  twitterCard: 'summary_large_image',
  canonical: BASE_URL,
};

// Gallery page SEO
export const gallerySEO: SEOMetadata = {
  title: 'Component Gallery - Premium React Loaders',
  description:
    'Browse all 20 React loading components: skeleton screens, spinners, progress bars, and pulse animations. Interactive examples with live previews and customization options.',
  keywords: [
    'react component gallery',
    'loading component examples',
    'react loader showcase',
    'skeleton loader examples',
    'spinner examples react',
    'progress bar gallery',
  ],
  ogImage: DEFAULT_OG_IMAGE,
  twitterCard: 'summary_large_image',
  canonical: `${BASE_URL}/gallery`,
};

// Docs page SEO
export const docsSEO: SEOMetadata = {
  title: 'Documentation - Premium React Loaders',
  description:
    'Complete documentation for Premium React Loaders. Installation guide, setup instructions, API reference, and usage examples for all 20 components with TypeScript and Tailwind CSS.',
  keywords: [
    'react loaders documentation',
    'premium react loaders docs',
    'react loading components guide',
    'react skeleton documentation',
    'react spinner api',
    'react loader setup',
  ],
  ogImage: DEFAULT_OG_IMAGE,
  twitterCard: 'summary_large_image',
  canonical: `${BASE_URL}/docs`,
};

// Playground hub (when no component selected)
export const playgroundHubSEO: SEOMetadata = {
  title: 'Interactive Playground - Premium React Loaders',
  description:
    'Try all Premium React Loaders components interactively. Customize props, see live previews, and copy code snippets instantly. 20 production-ready loading components to explore.',
  keywords: [
    'react loader playground',
    'interactive component demo',
    'react loading components demo',
    'live react component editor',
    'react loader customization',
  ],
  ogImage: DEFAULT_OG_IMAGE,
  twitterCard: 'summary_large_image',
  canonical: `${BASE_URL}/playground`,
};

// Generate component-specific SEO
export function getComponentSEO(componentId: string): SEOMetadata | null {
  const component = COMPONENTS.find((c) => c.id === componentId);
  if (!component) return null;

  const category = CATEGORIES.find((cat) => cat.id === component.category);
  const categoryName = category?.name || component.category;

  // Create targeted keywords based on component type
  const keywords = [
    `react ${component.name.toLowerCase()}`,
    `${component.name.toLowerCase()} component`,
    `react ${component.category} loader`,
    `${component.name.toLowerCase()} react`,
    `react loading ${component.name.toLowerCase()}`,
    'react loader',
    'premium react loaders',
    'typescript react component',
    'tailwind css loader',
  ];

  // Add category-specific keywords
  if (component.category === 'skeleton') {
    keywords.push(
      'react skeleton screen',
      'skeleton loader',
      'content placeholder react',
      'skeleton ui react'
    );
  } else if (component.category === 'spinner') {
    keywords.push(
      'react spinner',
      'loading spinner',
      'rotating loader react',
      'circular spinner'
    );
  } else if (component.category === 'progress') {
    keywords.push(
      'react progress bar',
      'progress indicator',
      'loading progress react',
      'progress component'
    );
  } else if (component.category === 'pulse') {
    keywords.push(
      'pulse animation',
      'bouncing loader',
      'pulsing loader react',
      'animated dots'
    );
  } else if (component.category === 'overlay') {
    keywords.push(
      'loading overlay',
      'loader backdrop',
      'fullscreen loader',
      'modal loader'
    );
  }

  return {
    title: `${component.name} - React ${categoryName} Component | Premium React Loaders`,
    description: `${component.description}. Fully customizable ${component.name} component with TypeScript support and Tailwind CSS. Try it live in our interactive playground with real-time preview and code generation.`,
    keywords,
    ogTitle: `${component.name} - Premium React Loaders`,
    ogDescription: `${component.description}. Customize and preview live with real-time code generation.`,
    ogImage: `${BASE_URL}/og-image.png`,
    twitterCard: 'summary_large_image',
    canonical: `${BASE_URL}/playground/${componentId}`,
  };
}
