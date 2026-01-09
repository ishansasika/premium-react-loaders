import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '../../src/context';
import {
  SpinnerCircle,
  SpinnerRing,
  ProgressBar,
  ProgressCircle,
  Skeleton,
  SkeletonCard,
  PulseDots,
} from '../../src/components';

const meta = {
  title: 'Theming/ThemeProvider',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

// Default theme
export const DefaultTheme: StoryObj = {
  render: () => {
    return (
      <div className="space-y-8 w-full max-w-2xl p-8">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Default Theme</h3>
          <p className="text-sm text-gray-600">
            Components using default colors and settings
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col items-center gap-3">
            <SpinnerCircle size="lg" />
            <span className="text-sm text-gray-600">Spinner</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <ProgressCircle value={65} size={60} showValue />
            <span className="text-sm text-gray-600">Progress</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <PulseDots size="md" />
            <span className="text-sm text-gray-600">Pulse</span>
          </div>
          <div className="flex flex-col items-center gap-3 w-full">
            <Skeleton width="100%" height={40} />
            <span className="text-sm text-gray-600">Skeleton</span>
          </div>
        </div>
      </div>
    );
  },
};

// Custom color theme
export const CustomColors: StoryObj = {
  render: () => {
    return (
      <ThemeProvider
        theme={{
          primaryColor: '#8b5cf6',
          secondaryColor: '#ec4899',
        }}
      >
        <div className="space-y-8 w-full max-w-2xl p-8">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">Custom Color Theme</h3>
            <p className="text-sm text-gray-600">
              Purple (#8b5cf6) and Pink (#ec4899)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center gap-3">
              <SpinnerCircle size="lg" />
              <span className="text-sm text-gray-600">Spinner</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <SpinnerRing size={60} thickness={6} />
              <span className="text-sm text-gray-600">Ring</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <ProgressCircle value={75} size={60} showValue />
              <span className="text-sm text-gray-600">Progress</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <PulseDots size="md" />
              <span className="text-sm text-gray-600">Pulse</span>
            </div>
          </div>

          <div className="text-xs text-gray-500 bg-purple-50 p-3 rounded">
            All components automatically use the theme colors without prop overrides
          </div>
        </div>
      </ThemeProvider>
    );
  },
};

// Skeleton theme
export const SkeletonTheme: StoryObj = {
  render: () => {
    return (
      <ThemeProvider
        theme={{
          skeletonBase: '#e2e8f0',
          skeletonHighlight: '#f1f5f9',
        }}
      >
        <div className="space-y-8 w-full max-w-md p-8">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">Custom Skeleton Theme</h3>
            <p className="text-sm text-gray-600">
              Lighter skeleton colors for modern look
            </p>
          </div>

          <div className="space-y-4">
            <Skeleton width="100%" height={20} />
            <Skeleton width="80%" height={20} />
            <Skeleton width="60%" height={20} />
            <div className="pt-4">
              <SkeletonCard hasAvatar lines={3} />
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  },
};

// Dark theme
export const DarkTheme: StoryObj = {
  render: () => {
    return (
      <ThemeProvider
        theme={{
          primaryColor: '#60a5fa',
          secondaryColor: '#a78bfa',
          skeletonBase: '#374151',
          skeletonHighlight: '#4b5563',
        }}
      >
        <div className="space-y-8 w-full max-w-2xl p-8 bg-gray-900 rounded-lg">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-white">Dark Theme</h3>
            <p className="text-sm text-gray-400">
              Optimized colors for dark backgrounds
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center gap-3">
              <SpinnerCircle size="lg" />
              <span className="text-sm text-gray-400">Spinner</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <ProgressBar value={65} width="100%" showValue />
              <span className="text-sm text-gray-400">Progress</span>
            </div>
          </div>

          <div className="space-y-3">
            <Skeleton width="100%" height={20} />
            <Skeleton width="85%" height={20} />
            <Skeleton width="70%" height={20} />
          </div>
        </div>
      </ThemeProvider>
    );
  },
};

// Size defaults
export const SizeDefaults: StoryObj = {
  render: () => {
    return (
      <ThemeProvider
        theme={{
          defaultSize: 'xl',
        }}
      >
        <div className="space-y-8 w-full max-w-2xl p-8">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">Default Size: XL</h3>
            <p className="text-sm text-gray-600">
              All components use XL size by default
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col items-center gap-3">
              <SpinnerCircle />
              <span className="text-sm text-gray-600">Spinner</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <SpinnerRing />
              <span className="text-sm text-gray-600">Ring</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <PulseDots />
              <span className="text-sm text-gray-600">Pulse</span>
            </div>
          </div>

          <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded">
            Components without explicit size prop inherit defaultSize from theme
          </div>
        </div>
      </ThemeProvider>
    );
  },
};

// Speed defaults
export const SpeedDefaults: StoryObj = {
  render: () => {
    return (
      <ThemeProvider
        theme={{
          defaultSpeed: 'fast',
        }}
      >
        <div className="space-y-8 w-full max-w-2xl p-8">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">Default Speed: Fast</h3>
            <p className="text-sm text-gray-600">
              All animations run at fast speed
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col items-center gap-3">
              <SpinnerCircle size="lg" />
              <span className="text-sm text-gray-600">Fast spinner</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <ProgressBar indeterminate width={120} />
              <span className="text-sm text-gray-600">Fast progress</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <PulseDots size="md" />
              <span className="text-sm text-gray-600">Fast pulse</span>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  },
};

// Complete brand theme
export const BrandTheme: StoryObj = {
  render: () => {
    return (
      <ThemeProvider
        theme={{
          primaryColor: '#f97316',
          secondaryColor: '#fb923c',
          skeletonBase: '#fed7aa',
          skeletonHighlight: '#ffedd5',
          defaultSize: 'lg',
          defaultSpeed: 'normal',
        }}
      >
        <div className="space-y-8 w-full max-w-2xl p-8 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-orange-900">
              Complete Brand Theme
            </h3>
            <p className="text-sm text-orange-700">
              Orange brand colors with matching skeleton theme
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center gap-3">
              <SpinnerCircle />
              <span className="text-sm text-orange-700">Spinner</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <ProgressCircle value={80} showValue />
              <span className="text-sm text-orange-700">Progress</span>
            </div>
          </div>

          <div className="space-y-3 bg-white p-4 rounded">
            <Skeleton width="100%" height={20} />
            <Skeleton width="75%" height={20} />
            <Skeleton width="50%" height={20} />
          </div>

          <div className="text-xs text-orange-800 bg-orange-100 p-3 rounded space-y-1">
            <p className="font-semibold">Theme Configuration:</p>
            <p>• Primary: #f97316 (Orange 500)</p>
            <p>• Secondary: #fb923c (Orange 400)</p>
            <p>• Default size: lg</p>
            <p>• Default speed: normal</p>
          </div>
        </div>
      </ThemeProvider>
    );
  },
};

// Multiple themes side by side
export const MultipleThemes: StoryObj = {
  render: () => {
    return (
      <div className="grid grid-cols-2 gap-6 p-8">
        {/* Blue Theme */}
        <ThemeProvider
          theme={{
            primaryColor: '#3b82f6',
            secondaryColor: '#60a5fa',
          }}
        >
          <div className="space-y-4 p-6 border rounded-lg bg-blue-50">
            <h4 className="font-semibold text-blue-900 text-center">
              Blue Theme
            </h4>
            <div className="flex justify-center">
              <SpinnerCircle size="lg" />
            </div>
            <div className="flex justify-center">
              <PulseDots size="md" />
            </div>
            <ProgressBar value={60} showValue />
          </div>
        </ThemeProvider>

        {/* Green Theme */}
        <ThemeProvider
          theme={{
            primaryColor: '#10b981',
            secondaryColor: '#34d399',
          }}
        >
          <div className="space-y-4 p-6 border rounded-lg bg-green-50">
            <h4 className="font-semibold text-green-900 text-center">
              Green Theme
            </h4>
            <div className="flex justify-center">
              <SpinnerCircle size="lg" />
            </div>
            <div className="flex justify-center">
              <PulseDots size="md" />
            </div>
            <ProgressBar value={60} showValue />
          </div>
        </ThemeProvider>

        {/* Purple Theme */}
        <ThemeProvider
          theme={{
            primaryColor: '#8b5cf6',
            secondaryColor: '#a78bfa',
          }}
        >
          <div className="space-y-4 p-6 border rounded-lg bg-purple-50">
            <h4 className="font-semibold text-purple-900 text-center">
              Purple Theme
            </h4>
            <div className="flex justify-center">
              <SpinnerCircle size="lg" />
            </div>
            <div className="flex justify-center">
              <PulseDots size="md" />
            </div>
            <ProgressBar value={60} showValue />
          </div>
        </ThemeProvider>

        {/* Red Theme */}
        <ThemeProvider
          theme={{
            primaryColor: '#ef4444',
            secondaryColor: '#f87171',
          }}
        >
          <div className="space-y-4 p-6 border rounded-lg bg-red-50">
            <h4 className="font-semibold text-red-900 text-center">
              Red Theme
            </h4>
            <div className="flex justify-center">
              <SpinnerCircle size="lg" />
            </div>
            <div className="flex justify-center">
              <PulseDots size="md" />
            </div>
            <ProgressBar value={60} showValue />
          </div>
        </ThemeProvider>
      </div>
    );
  },
};
