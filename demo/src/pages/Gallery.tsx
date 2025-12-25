import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { COMPONENTS, CATEGORIES } from '../data/components';
import { SEO } from '../components/common/SEO';
import { StructuredData } from '../components/common/StructuredData';
import { gallerySEO } from '../utils/seo';
import { websiteSchema } from '../utils/structuredData';
import { SpinnerCircle } from '@lib/components';

export function Gallery() {
  return (
    <>
      <SEO metadata={gallerySEO} />
      <StructuredData data={websiteSchema} />
      <Layout>
      <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        <h1 className="page-header">Component Gallery</h1>
        <p className="text-gray-600 mb-8">
          Browse all 20 components. Click any card to try it in the playground.
        </p>

        {CATEGORIES.map((category) => {
          const components = COMPONENTS.filter((c) => c.category === category.id);
          return (
            <div key={category.id} className="mb-12">
              <h2 className="section-header">
                {category.name} <span className="text-gray-400">({components.length})</span>
              </h2>
              <p className="text-gray-600 mb-6">{category.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {components.map((component) => {
                  const Component = component.component;
                  return (
                    <Link
                      key={component.id}
                      to={`/playground/${component.id}`}
                      className="component-card group"
                    >
                      <h3 className="font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                        {component.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">{component.description}</p>
                      <div className="flex items-center justify-center p-6 bg-gray-50 rounded relative">
                        {component.id === 'loader-overlay' ? (
                          <Component
                            {...component.defaultProps}
                            loading={true}
                            position="absolute"
                            loader={<SpinnerCircle size={40} color="#3b82f6" />}
                          >
                            <div className="p-8 text-center text-gray-500">
                              Your content here
                            </div>
                          </Component>
                        ) : (
                          <Component {...component.defaultProps} />
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
    </>
  );
}
