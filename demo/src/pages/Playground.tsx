import { useParams, Navigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Sidebar } from '../components/layout/Sidebar';
import { ComponentPlayground } from '../components/playground/ComponentPlayground';
import { getComponentById, COMPONENTS } from '../data/components';
import { SEO } from '../components/common/SEO';
import { StructuredData } from '../components/common/StructuredData';
import { getComponentSEO, playgroundHubSEO } from '../utils/seo';
import {
  getComponentSchema,
  getComponentBreadcrumb,
  websiteSchema,
  type StructuredData as StructuredDataType,
} from '../utils/structuredData';

export function Playground() {
  const { componentId } = useParams();

  // Default to first component if none selected
  if (!componentId) {
    return <Navigate to={`/playground/${COMPONENTS[0].id}`} replace />;
  }

  const metadata = getComponentById(componentId);

  if (!metadata) {
    return <Navigate to={`/playground/${COMPONENTS[0].id}`} replace />;
  }

  const seoData = getComponentSEO(componentId) || playgroundHubSEO;

  // Generate structured data for component pages
  const structuredData = componentId
    ? ([getComponentSchema(componentId), getComponentBreadcrumb(componentId)].filter(
        (item): item is StructuredDataType => item !== null
      ) as StructuredDataType[])
    : [websiteSchema];

  return (
    <>
      <SEO metadata={seoData} />
      <StructuredData data={structuredData} />
      <Layout showSidebar sidebar={<Sidebar />}>
      <div className="p-8 max-w-5xl mx-auto">
        <ComponentPlayground metadata={metadata} />
      </div>
    </Layout>
    </>
  );
}
