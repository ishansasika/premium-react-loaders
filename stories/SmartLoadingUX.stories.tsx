import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { SpinnerCircle, ProgressBar, SkeletonCard } from '../src/components';

const meta = {
  title: 'Features/Smart Loading UX',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

// Example component demonstrating delay prop
export const DelayedAppearance: StoryObj = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);

    const simulateQuickLoad = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 100); // Completes in 100ms
    };

    const simulateSlowLoad = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 1000); // Takes 1 second
    };

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Delayed Appearance</h3>
          <p className="text-sm text-gray-600">
            Loader only appears if loading takes longer than delay threshold
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={simulateQuickLoad}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Quick Load (100ms)
          </button>
          <button
            onClick={simulateSlowLoad}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Slow Load (1s)
          </button>
        </div>

        <div className="h-12 flex items-center justify-center">
          <SpinnerCircle
            visible={isLoading}
            delay={200}
            size="lg"
          />
        </div>

        <div className="text-sm text-gray-500 text-center">
          With delay={200}ms: Quick loads won't show loader, slow loads will
        </div>
      </div>
    );
  },
};

// Example component demonstrating minDuration prop
export const MinimumDuration: StoryObj = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);

    const simulateLoad = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 500);
    };

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Minimum Display Duration</h3>
          <p className="text-sm text-gray-600">
            Loader stays visible for minimum time once shown
          </p>
        </div>

        <button
          onClick={simulateLoad}
          className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Trigger Load (500ms)
        </button>

        <div className="h-12 flex items-center justify-center">
          <SpinnerCircle
            visible={isLoading}
            minDuration={1500}
            size="lg"
          />
        </div>

        <div className="text-sm text-gray-500 text-center">
          With minDuration={1500}ms: Loader stays for at least 1.5s even though load completes in 500ms
        </div>
      </div>
    );
  },
};

// Example component demonstrating transition prop
export const FadeTransition: StoryObj = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);

    const toggleLoading = () => setIsLoading(!isLoading);

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Fade Transitions</h3>
          <p className="text-sm text-gray-600">
            Smooth fade-in/fade-out animations
          </p>
        </div>

        <button
          onClick={toggleLoading}
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Toggle Loading
        </button>

        <div className="h-12 flex items-center justify-center">
          <SpinnerCircle
            visible={isLoading}
            transition={300}
            size="lg"
          />
        </div>

        <div className="text-sm text-gray-500 text-center">
          With transition={300}ms: Smooth 300ms fade in/out
        </div>
      </div>
    );
  },
};

// Combined example
export const CombinedPattern: StoryObj = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const simulateAPICall = () => {
      setIsLoading(true);
      setProgress(0);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsLoading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    };

    return (
      <div className="space-y-6 w-96">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Complete Pattern</h3>
          <p className="text-sm text-gray-600">
            Delay + minDuration + transition for optimal UX
          </p>
        </div>

        <button
          onClick={simulateAPICall}
          className="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Simulate API Call'}
        </button>

        <div className="space-y-2">
          <ProgressBar
            visible={isLoading}
            value={progress}
            delay={200}
            minDuration={800}
            transition={150}
            showValue
          />
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <p>• delay={200}ms: Don't show unless takes &gt;200ms</p>
          <p>• minDuration={800}ms: Stay visible for at least 800ms</p>
          <p>• transition={150}ms: Smooth 150ms fade</p>
        </div>
      </div>
    );
  },
};

// Skeleton with transitions
export const SkeletonTransitions: StoryObj = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 3000);
      return () => clearTimeout(timer);
    }, []);

    const reload = () => setIsLoading(true);

    return (
      <div className="space-y-6 w-96">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Skeleton Screen Transition</h3>
          <p className="text-sm text-gray-600">
            Smooth transition from skeleton to content
          </p>
        </div>

        <button
          onClick={reload}
          className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reload
        </button>

        {isLoading ? (
          <SkeletonCard
            visible={true}
            transition={250}
          />
        ) : (
          <div
            className="border rounded-lg p-4 space-y-2"
            style={{
              animation: 'fade-in 250ms ease-in',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full" />
              <div>
                <h4 className="font-semibold">John Doe</h4>
                <p className="text-sm text-gray-500">Software Engineer</p>
              </div>
            </div>
            <p className="text-sm text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        )}

        <div className="text-sm text-gray-500 text-center">
          With transition={250}ms: Content fades in smoothly after skeleton disappears
        </div>
      </div>
    );
  },
};
