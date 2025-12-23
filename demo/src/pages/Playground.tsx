import { useParams, Navigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Sidebar } from '../components/layout/Sidebar';
import { ComponentPlayground } from '../components/playground/ComponentPlayground';
import { getComponentById, COMPONENTS } from '../data/components';

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

  return (
    <Layout showSidebar sidebar={<Sidebar />}>
      <div className="p-8 max-w-5xl mx-auto">
        <ComponentPlayground metadata={metadata} />
      </div>
    </Layout>
  );
}
