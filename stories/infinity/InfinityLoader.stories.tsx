import type { Meta, StoryObj } from '@storybook/react';
import { InfinityLoader } from '../../src/components/infinity';

const meta: Meta<typeof InfinityLoader> = {
  title: 'Components/Infinity/InfinityLoader',
  component: InfinityLoader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the loader',
    },
    color: {
      control: 'color',
      description: 'Primary color',
    },
    secondaryColor: {
      control: 'color',
      description: 'Secondary color for gradient',
    },
    thickness: {
      control: 'number',
      description: 'Stroke thickness',
    },
    gradient: {
      control: 'boolean',
      description: 'Enable gradient coloring',
    },
    showDot: {
      control: 'boolean',
      description: 'Show traveling dot',
    },
    dotSize: {
      control: 'number',
      description: 'Size of the dot',
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Animation speed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InfinityLoader>;

export const Default: Story = {
  args: {
    size: 'md',
  },
};

export const WithDot: Story = {
  args: {
    size: 'lg',
    showDot: true,
  },
};

export const Gradient: Story = {
  args: {
    size: 'lg',
    gradient: true,
    color: '#3b82f6',
    secondaryColor: '#ec4899',
  },
};

export const Thick: Story = {
  args: {
    size: 'lg',
    thickness: 5,
  },
};

export const GradientWithDot: Story = {
  args: {
    size: 'xl',
    gradient: true,
    showDot: true,
    color: '#8b5cf6',
    secondaryColor: '#f59e0b',
    dotSize: 8,
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-8">
      <InfinityLoader size="sm" color="#3b82f6" />
      <InfinityLoader size="md" color="#8b5cf6" showDot />
      <InfinityLoader size="lg" color="#ec4899" gradient secondaryColor="#f59e0b" />
    </div>
  ),
};
