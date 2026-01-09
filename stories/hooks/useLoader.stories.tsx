import type { Meta, StoryObj } from '@storybook/react';
import { useLoader } from '../../src/hooks';
import { SpinnerCircle, ProgressBar, SkeletonCard } from '../../src/components';

const meta = {
  title: 'Hooks/useLoader',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

// Basic usage example
export const BasicUsage: StoryObj = {
  render: () => {
    const { loading, startLoading, stopLoading, isVisible } = useLoader();

    const simulateLoad = async () => {
      startLoading();
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      stopLoading();
    };

    return (
      <div className="space-y-6 w-96">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Basic useLoader Hook</h3>
          <p className="text-sm text-gray-600">
            Simple loading state management
          </p>
        </div>

        <button
          onClick={simulateLoad}
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Fetch Data'}
        </button>

        <div className="h-16 flex items-center justify-center">
          <SpinnerCircle visible={isVisible} size="lg" />
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <p>• loading: {String(loading)}</p>
          <p>• isVisible: {String(isVisible)}</p>
        </div>
      </div>
    );
  },
};

// With delay - don't show loader for quick operations
export const WithDelay: StoryObj = {
  render: () => {
    const { loading, startLoading, stopLoading, isVisible } = useLoader({
      delay: 300,
    });

    const simulateQuickLoad = async () => {
      startLoading();
      await new Promise((resolve) => setTimeout(resolve, 200)); // Faster than delay
      stopLoading();
    };

    const simulateSlowLoad = async () => {
      startLoading();
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Slower than delay
      stopLoading();
    };

    return (
      <div className="space-y-6 w-96">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">With Delay (300ms)</h3>
          <p className="text-sm text-gray-600">
            Loader only appears if loading takes longer than delay
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={simulateQuickLoad}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            Quick (200ms)
          </button>
          <button
            onClick={simulateSlowLoad}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
          >
            Slow (1s)
          </button>
        </div>

        <div className="h-16 flex items-center justify-center">
          <SpinnerCircle visible={isVisible} size="lg" />
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Quick loads won't show loader (completes before 300ms delay)</p>
          <p>• Slow loads will show loader (exceeds 300ms delay)</p>
        </div>
      </div>
    );
  },
};

// With minimum duration - prevent flashing
export const WithMinDuration: StoryObj = {
  render: () => {
    const { loading, startLoading, stopLoading, isVisible } = useLoader({
      minDuration: 1000,
    });

    const simulateLoad = async () => {
      startLoading();
      await new Promise((resolve) => setTimeout(resolve, 300)); // Quick load
      stopLoading();
    };

    return (
      <div className="space-y-6 w-96">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">With Minimum Duration (1s)</h3>
          <p className="text-sm text-gray-600">
            Loader stays visible for minimum time to prevent flashing
          </p>
        </div>

        <button
          onClick={simulateLoad}
          disabled={loading}
          className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
        >
          Quick Load (300ms)
        </button>

        <div className="h-16 flex items-center justify-center">
          <SpinnerCircle visible={isVisible} size="lg" />
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Load completes in 300ms</p>
          <p>• Loader stays visible for full 1000ms to prevent flash</p>
        </div>
      </div>
    );
  },
};

// With auto-hide
export const WithAutoHide: StoryObj = {
  render: () => {
    const { loading, startLoading, isVisible } = useLoader({
      autoHide: 3000,
    });

    return (
      <div className="space-y-6 w-96">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">With Auto-Hide (3s)</h3>
          <p className="text-sm text-gray-600">
            Loader automatically hides after timeout
          </p>
        </div>

        <button
          onClick={startLoading}
          disabled={loading}
          className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
        >
          Start Loading
        </button>

        <div className="h-16 flex items-center justify-center">
          <SpinnerCircle visible={isVisible} size="lg" />
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Loader will automatically hide after 3 seconds</p>
          <p>• Useful for optimistic UI updates or timeout scenarios</p>
        </div>
      </div>
    );
  },
};

// Complete pattern: delay + minDuration
export const OptimalPattern: StoryObj = {
  render: () => {
    const { loading, startLoading, stopLoading, isVisible } = useLoader({
      delay: 200,
      minDuration: 600,
    });

    const simulateQuickLoad = async () => {
      startLoading();
      await new Promise((resolve) => setTimeout(resolve, 100));
      stopLoading();
    };

    const simulateMediumLoad = async () => {
      startLoading();
      await new Promise((resolve) => setTimeout(resolve, 500));
      stopLoading();
    };

    const simulateSlowLoad = async () => {
      startLoading();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      stopLoading();
    };

    return (
      <div className="space-y-6 w-96">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Optimal UX Pattern</h3>
          <p className="text-sm text-gray-600">
            Delay + minDuration for best user experience
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={simulateQuickLoad}
            disabled={loading}
            className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 text-sm"
          >
            100ms
          </button>
          <button
            onClick={simulateMediumLoad}
            disabled={loading}
            className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50 text-sm"
          >
            500ms
          </button>
          <button
            onClick={simulateSlowLoad}
            disabled={loading}
            className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 text-sm"
          >
            2s
          </button>
        </div>

        <div className="h-16 flex items-center justify-center">
          <SpinnerCircle visible={isVisible} size="lg" />
        </div>

        <div className="text-xs text-gray-500 space-y-1 bg-gray-50 p-3 rounded">
          <p className="font-semibold">How it works:</p>
          <p>• 100ms: No loader shown (faster than 200ms delay)</p>
          <p>• 500ms: Loader shown for 600ms (minDuration enforced)</p>
          <p>• 2s: Loader shown for full 2s (exceeds minDuration)</p>
        </div>
      </div>
    );
  },
};

// Real-world example: Data fetching with skeleton
export const RealWorldExample: StoryObj = {
  render: () => {
    const { loading, startLoading, stopLoading, isVisible } = useLoader({
      delay: 200,
      minDuration: 600,
    });

    const fetchData = async () => {
      startLoading();
      await new Promise((resolve) => setTimeout(resolve, 1500));
      stopLoading();
    };

    return (
      <div className="space-y-6 w-96">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Real-World Example</h3>
          <p className="text-sm text-gray-600">
            Data fetching with skeleton loading state
          </p>
        </div>

        <button
          onClick={fetchData}
          disabled={loading}
          className="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50"
        >
          Fetch User Data
        </button>

        <div className="border rounded-lg p-4">
          {isVisible ? (
            <SkeletonCard hasAvatar lines={3} />
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full" />
                <div>
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-sm text-gray-500">Product Designer</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Building beautiful user experiences with React and TypeScript.
                Passionate about design systems and accessibility.
              </p>
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Uses delay to avoid showing skeleton for quick loads</p>
          <p>• minDuration prevents skeleton from flashing briefly</p>
        </div>
      </div>
    );
  },
};
