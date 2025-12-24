import type { Meta, StoryObj } from '@storybook/react';
import { LoaderOverlay } from '../../src/components/overlay';
import { SpinnerCircle, SpinnerRing, PulseDots } from '../../src/components';

const meta: Meta<typeof LoaderOverlay> = {
  title: 'Components/Overlay/LoaderOverlay',
  component: LoaderOverlay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Whether the overlay is active/loading',
    },
    position: {
      control: 'select',
      options: ['fixed', 'absolute'],
      description: 'Position style of the overlay',
    },
    backdropOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Backdrop opacity (0-1)',
    },
    backdropColor: {
      control: 'color',
      description: 'Backdrop color',
    },
    blur: {
      control: 'boolean',
      description: 'Apply blur effect to backdrop',
    },
    zIndex: {
      control: 'number',
      description: 'Z-index of the overlay',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoaderOverlay>;

const SampleContent = () => (
  <div className="bg-white p-8 rounded-lg shadow-lg w-96">
    <h2 className="text-2xl font-bold mb-4">Sample Content</h2>
    <p className="text-gray-600 mb-4">
      This is sample content that will be overlaid when loading is true.
    </p>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);

export const Default: Story = {
  args: {
    loading: true,
    loader: <SpinnerCircle />,
  },
  render: (args) => (
    <LoaderOverlay {...args}>
      <SampleContent />
    </LoaderOverlay>
  ),
};

export const WithRingSpinner: Story = {
  args: {
    loading: true,
    loader: <SpinnerRing size={60} />,
  },
  render: (args) => (
    <LoaderOverlay {...args}>
      <SampleContent />
    </LoaderOverlay>
  ),
};

export const WithPulseDots: Story = {
  args: {
    loading: true,
    loader: <PulseDots />,
  },
  render: (args) => (
    <LoaderOverlay {...args}>
      <SampleContent />
    </LoaderOverlay>
  ),
};

export const WithBlur: Story = {
  args: {
    loading: true,
    loader: <SpinnerCircle size={50} color="#8b5cf6" />,
    blur: true,
  },
  render: (args) => (
    <LoaderOverlay {...args}>
      <SampleContent />
    </LoaderOverlay>
  ),
};

export const LightBackdrop: Story = {
  args: {
    loading: true,
    loader: <SpinnerCircle size={50} color="#3b82f6" />,
    backdropColor: '#ffffff',
    backdropOpacity: 0.8,
  },
  render: (args) => (
    <LoaderOverlay {...args}>
      <SampleContent />
    </LoaderOverlay>
  ),
};

export const HeavyOpacity: Story = {
  args: {
    loading: true,
    loader: <SpinnerCircle size={50} />,
    backdropOpacity: 0.9,
  },
  render: (args) => (
    <LoaderOverlay {...args}>
      <SampleContent />
    </LoaderOverlay>
  ),
};

export const AbsolutePosition: Story = {
  args: {
    loading: true,
    loader: <SpinnerCircle />,
    position: 'absolute',
  },
  render: (args) => (
    <div className="relative h-96 w-96 bg-gray-100 rounded-lg">
      <LoaderOverlay {...args}>
        <SampleContent />
      </LoaderOverlay>
    </div>
  ),
};

export const NotLoading: Story = {
  args: {
    loading: false,
    loader: <SpinnerCircle />,
  },
  render: (args) => (
    <LoaderOverlay {...args}>
      <SampleContent />
    </LoaderOverlay>
  ),
};
