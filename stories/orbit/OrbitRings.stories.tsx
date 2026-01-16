import type { Meta, StoryObj } from '@storybook/react';
import { OrbitRings } from '../../src/components/orbit';

const meta: Meta<typeof OrbitRings> = {
  title: 'Components/Orbit/OrbitRings',
  component: OrbitRings,
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
      description: 'Secondary color for alternating rings',
    },
    ringCount: {
      control: { type: 'number', min: 1, max: 6 },
      description: 'Number of concentric rings',
    },
    ringGap: {
      control: 'number',
      description: 'Gap between rings',
    },
    thickness: {
      control: 'number',
      description: 'Ring thickness',
    },
    alternate: {
      control: 'boolean',
      description: 'Alternate rotation direction',
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Animation speed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof OrbitRings>;

export const Default: Story = {
  args: {
    size: 'md',
  },
};

export const FourRings: Story = {
  args: {
    size: 'lg',
    ringCount: 4,
  },
};

export const TwoColor: Story = {
  args: {
    size: 'md',
    color: '#3b82f6',
    secondaryColor: '#f59e0b',
    ringCount: 4,
  },
};

export const Thick: Story = {
  args: {
    size: 'lg',
    thickness: 4,
    ringCount: 3,
  },
};

export const SameDirection: Story = {
  args: {
    size: 'md',
    alternate: false,
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-8">
      <OrbitRings size="sm" color="#3b82f6" />
      <OrbitRings size="md" color="#8b5cf6" ringCount={4} />
      <OrbitRings size="lg" color="#ec4899" thickness={3} />
    </div>
  ),
};
