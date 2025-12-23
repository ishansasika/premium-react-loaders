import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { SpinnerCircle, ProgressBar, Skeleton, PulseDots } from '@lib/components';

export function Home() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Premium React Loaders</h1>
          <p className="text-xl text-gray-600 mb-8">
            18 production-ready loading components for React with TypeScript and Tailwind CSS
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/playground" className="btn-primary">
              Try Playground
            </Link>
            <Link to="/gallery" className="btn-secondary">
              View Gallery
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-500 mb-2">18</div>
            <div className="font-semibold mb-2">Components</div>
            <div className="text-sm text-gray-600">
              Skeleton, Spinner, Progress, and Pulse loaders
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-500 mb-2">100%</div>
            <div className="font-semibold mb-2">TypeScript</div>
            <div className="text-sm text-gray-600">
              Full type safety with exported definitions
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-500 mb-2">0</div>
            <div className="font-semibold mb-2">Dependencies</div>
            <div className="text-sm text-gray-600">
              Lightweight with no runtime dependencies
            </div>
          </div>
        </div>

        {/* Featured Components */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Components</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="component-card">
              <h3 className="font-semibold mb-4">Skeleton</h3>
              <div className="flex items-center justify-center p-6 bg-gray-50 rounded">
                <Skeleton width={120} height={20} />
              </div>
            </div>
            <div className="component-card">
              <h3 className="font-semibold mb-4">Spinner</h3>
              <div className="flex items-center justify-center p-6 bg-gray-50 rounded">
                <SpinnerCircle size={40} />
              </div>
            </div>
            <div className="component-card">
              <h3 className="font-semibold mb-4">Progress</h3>
              <div className="flex items-center justify-center p-6 bg-gray-50 rounded">
                <div className="w-full">
                  <ProgressBar value={75} />
                </div>
              </div>
            </div>
            <div className="component-card">
              <h3 className="font-semibold mb-4">Pulse</h3>
              <div className="flex items-center justify-center p-6 bg-gray-50 rounded">
                <PulseDots dotCount={3} />
              </div>
            </div>
          </div>
        </div>

        {/* Installation */}
        <div className="bg-gray-900 text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
          <pre className="bg-gray-800 p-4 rounded mb-4 overflow-x-auto">
            <code>npm install premium-react-loaders</code>
          </pre>
          <pre className="bg-gray-800 p-4 rounded overflow-x-auto">
            <code>{`import { SpinnerCircle } from 'premium-react-loaders';
import 'premium-react-loaders/styles';

function App() {
  return <SpinnerCircle size={40} />;
}`}</code>
          </pre>
        </div>
      </div>
    </Layout>
  );
}
