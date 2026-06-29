import { COMPONENTS } from '../data/components';

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

const BASE_URL = 'https://premium-react-loaders.ishansasika.dev';

// Organization (global)
export const organizationSchema: StructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Premium React Loaders',
  url: BASE_URL,
  logo: `${BASE_URL}/icon-512.png`,
  sameAs: [
    'https://github.com/ishansasika/premium-react-loaders',
    'https://www.npmjs.com/package/premium-react-loaders',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Developer',
    url: 'https://github.com/ishansasika',
  },
};

// Website (global)
export const websiteSchema: StructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Premium React Loaders',
  url: BASE_URL,
  description:
    '65+ production-ready loading components for React with TypeScript. Zero dependencies.',
  author: {
    '@type': 'Person',
    name: 'Ishan Karunaratne',
    url: 'https://ishansasika.dev',
  },
};

// Software Application (homepage)
export const softwareApplicationSchema: StructuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Premium React Loaders',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    '65+ production-ready loading components for React including skeleton screens, spinners, progress bars, neon loaders, particle effects, 3D animations and more. TypeScript support, zero dependencies.',
  url: BASE_URL,
  downloadUrl: 'https://www.npmjs.com/package/premium-react-loaders',
  softwareVersion: '4.1.1',
  programmingLanguage: ['TypeScript', 'React'],
  screenshot: `${BASE_URL}/og-image.png`,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    ratingCount: '1',
  },
};

// Component-specific Software
export function getComponentSchema(componentId: string): StructuredData | null {
  const component = COMPONENTS.find((c) => c.id === componentId);
  if (!component) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: component.name,
    description: component.description,
    programmingLanguage: 'TypeScript',
    codeRepository: 'https://github.com/ishansasika/premium-react-loaders',
    codeSampleType: 'full solution',
    targetProduct: {
      '@type': 'SoftwareApplication',
      name: 'Premium React Loaders',
    },
    url: `${BASE_URL}/playground/${componentId}`,
  };
}

// Breadcrumb for component pages
export function getComponentBreadcrumb(
  componentId: string
): StructuredData | null {
  const component = COMPONENTS.find((c) => c.id === componentId);
  if (!component) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Playground',
        item: `${BASE_URL}/playground`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: component.name,
        item: `${BASE_URL}/playground/${componentId}`,
      },
    ],
  };
}
