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
            This library requires React and Tailwind CSS:
          </p>
          <CodeBlock
            code="npm install react react-dom tailwindcss"
            language="bash"
          />
        </section>

        {/* Setup */}
        <section className="mb-12">
          <h2 className="section-header">Setup</h2>

          <h3 className="text-xl font-semibold mb-4">1. Import Styles</h3>
          <p className="text-gray-600 mb-4">
            Import the styles in your main entry file (e.g., main.tsx or App.tsx):
          </p>
          <CodeBlock
            code="import 'premium-react-loaders/styles';"
            language="tsx"
          />

          <h3 className="text-xl font-semibold mb-4 mt-8">2. Configure Tailwind</h3>
          <p className="text-gray-600 mb-4">
            Add the library to your tailwind.config.js content array:
          </p>
          <CodeBlock
            code={`module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/premium-react-loaders/dist/**/*.{js,ts,jsx,tsx}',
  ],
  // ... rest of your config
};`}
            language="javascript"
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

        {/* Component Categories */}
        <section className="mb-12">
          <h2 className="section-header">Component Categories</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Skeleton (7 components)</h3>
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
