import { Layout } from '../components/layout/Layout';
import { CodeBlock } from '../components/common/CodeBlock';
import { SEO } from '../components/common/SEO';
import { StructuredData } from '../components/common/StructuredData';
import { docsSEO } from '../utils/seo';
import { websiteSchema } from '../utils/structuredData';

export function Documentation() {
  return (
    <>
      <SEO metadata={docsSEO} />
      <StructuredData data={websiteSchema} />
      <Layout>
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="page-header">Documentation</h1>

        {/* Installation */}
        <section className="mb-12">
          <h2 className="section-header">Installation</h2>
          <CodeBlock
            code="npm install premium-react-loaders"
            language="bash"
          />
        </section>

        {/* Peer Dependencies */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Peer Dependencies</h3>
          <p className="text-gray-600 mb-4">
            This library only requires React (v2.0.0+):
          </p>
          <CodeBlock
            code="npm install react react-dom"
            language="bash"
          />
          <p className="text-sm text-blue-600 mt-2">
            ✨ <strong>New in v2.0.0:</strong> No Tailwind CSS required!
          </p>
        </section>

        {/* Setup */}
        <section className="mb-12">
          <h2 className="section-header">Setup</h2>

          <p className="text-gray-600 mb-4">
            Import the styles in your main entry file (e.g., main.tsx or App.tsx):
          </p>
          <CodeBlock
            code="import 'premium-react-loaders/styles';"
            language="tsx"
          />
          <p className="text-gray-600 mt-4">
            That's it! No Tailwind configuration or additional setup needed.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">
            Optional: Global Theming (v2.1.0+)
          </h3>
          <p className="text-sm text-blue-600 mb-4">
            ✨ <strong>New in v2.1.0:</strong> ThemeProvider for app-wide customization
          </p>
          <p className="text-gray-600 mb-4">
            Wrap your app with ThemeProvider to customize all loaders globally:
          </p>
          <CodeBlock
            code={`import { ThemeProvider } from 'premium-react-loaders';

function App() {
  return (
    <ThemeProvider
      theme={{
        primaryColor: '#8b5cf6',
        secondaryColor: '#ec4899',
        defaultSize: 'lg',
        defaultSpeed: 'fast',
      }}
    >
      <YourApp />
    </ThemeProvider>
  );
}`}
            language="tsx"
          />
        </section>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="section-header">Quick Start</h2>
          <CodeBlock
            code={`import {
  Skeleton,
  SpinnerCircle,
  ProgressBar,
  PulseDots,
} from 'premium-react-loaders';

function App() {
  return (
    <div>
      <Skeleton width={200} height={20} />
      <SpinnerCircle size={40} color="#3b82f6" />
      <ProgressBar value={75} showValue />
      <PulseDots dotCount={3} />
    </div>
  );
}`}
            language="tsx"
          />
        </section>

        {/* Smart Loading UX */}
        <section className="mb-12">
          <h2 className="section-header">Smart Loading UX (v2.1.0+)</h2>
          <p className="text-sm text-blue-600 mb-4">
            ✨ <strong>New in v2.1.0:</strong> useLoader hook for better UX
          </p>
          <p className="text-gray-600 mb-4">
            The useLoader hook provides smart loading state management with delay,
            minimum duration, and auto-hide capabilities:
          </p>
          <CodeBlock
            code={`import { useLoader } from 'premium-react-loaders';
import { SpinnerCircle } from 'premium-react-loaders';

function MyComponent() {
  const { loading, startLoading, stopLoading, isVisible } = useLoader({
    delay: 200,        // Don't show for quick operations
    minDuration: 600,  // Prevent flashing
    autoHide: 5000,    // Auto-hide after timeout (optional)
  });

  const fetchData = async () => {
    startLoading();
    try {
      await api.fetchData();
    } finally {
      stopLoading();
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Load Data</button>
      <SpinnerCircle visible={isVisible} />
    </div>
  );
}`}
            language="tsx"
          />
        </section>

        {/* Component Categories */}
        <section className="mb-12">
          <h2 className="section-header">Component Categories</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Skeleton (9 components)</h3>
              <p className="text-gray-600">
                Placeholder components: Skeleton, SkeletonText, SkeletonAvatar,
                SkeletonImage, SkeletonCard, SkeletonList, SkeletonTable
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Spinner (5 components)</h3>
              <p className="text-gray-600">
                Rotating spinners: SpinnerCircle, SpinnerRing, SpinnerDots,
                SpinnerBars, SpinnerGrid
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Progress (3 components)</h3>
              <p className="text-gray-600">
                Progress indicators: ProgressBar, ProgressCircle, ProgressRing
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Pulse (3 components)</h3>
              <p className="text-gray-600">
                Pulsing animations: PulseDots, PulseWave, PulseBars
              </p>
            </div>
          </div>
        </section>

        {/* Common Props */}
        <section className="mb-12">
          <h2 className="section-header">Common Props</h2>
          <p className="text-gray-600 mb-4">
            All loader components share these common props:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-3 text-left">Prop</th>
                  <th className="border p-3 text-left">Type</th>
                  <th className="border p-3 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3 font-mono text-sm">size</td>
                  <td className="border p-3 text-sm">number | string</td>
                  <td className="border p-3 text-sm">Size of the loader</td>
                </tr>
                <tr>
                  <td className="border p-3 font-mono text-sm">color</td>
                  <td className="border p-3 text-sm">string</td>
                  <td className="border p-3 text-sm">Primary color</td>
                </tr>
                <tr>
                  <td className="border p-3 font-mono text-sm">className</td>
                  <td className="border p-3 text-sm">string</td>
                  <td className="border p-3 text-sm">Custom CSS class</td>
                </tr>
                <tr>
                  <td className="border p-3 font-mono text-sm">style</td>
                  <td className="border p-3 text-sm">CSSProperties</td>
                  <td className="border p-3 text-sm">Inline styles</td>
                </tr>
                <tr>
                  <td className="border p-3 font-mono text-sm">speed</td>
                  <td className="border p-3 text-sm">'slow' | 'normal' | 'fast'</td>
                  <td className="border p-3 text-sm">Animation speed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CSS Variables */}
        <section className="mb-12">
          <h2 className="section-header">CSS Variables (Enhanced in v2.1.0)</h2>
          <p className="text-sm text-blue-600 mb-4">
            ✨ <strong>New in v2.1.0:</strong> Comprehensive CSS variables with dark mode support
          </p>
          <p className="text-gray-600 mb-4">
            Customize the library globally using CSS variables:
          </p>
          <CodeBlock
            code={`:root {
  /* Colors */
  --loader-primary: #3b82f6;
  --loader-secondary: #8b5cf6;
  --skeleton-base: #e5e7eb;
  --skeleton-highlight: #f5f5f5;

  /* Sizes */
  --loader-size-xs: 16px;
  --loader-size-sm: 24px;
  --loader-size-md: 40px;
  --loader-size-lg: 56px;
  --loader-size-xl: 72px;

  /* Animation speeds */
  --loader-transition-fast: 150ms;
  --loader-transition-normal: 300ms;
  --loader-transition-slow: 500ms;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --skeleton-base: #2d3748;
    --skeleton-highlight: #4a5568;
  }
}`}
            language="css"
          />
        </section>

        {/* Links */}
        <section>
          <h2 className="section-header">Links</h2>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://docs.premium-react-loaders.ishansasika.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              📚 Storybook Docs
            </a>
            <a
              href="https://github.com/ishansasika/premium-react-loaders"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/premium-react-loaders"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              npm Package
            </a>
          </div>
        </section>
      </div>
    </Layout>
    </>
  );
}
