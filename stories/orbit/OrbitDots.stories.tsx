import type { Meta, StoryObj } from '@storybook/react';
import { OrbitDots } from '../../src/components/orbit';

const meta: Meta<typeof OrbitDots> = {
  title: 'Components/Orbit/OrbitDots',
  component: OrbitDots,
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
      description: 'Secondary color for alternating dots',
    },
    dotCount: {
      control: { type: 'number', min: 2, max: 12 },
      description: 'Number of orbiting dots',
    },
    dotSize: {
      control: 'number',
      description: 'Size of each dot',
    },
    stagger: {
      control: 'boolean',
      description: 'Stagger animation between dots',
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Animation speed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof OrbitDots>;

export const Default: Story = {
  args: {
    size: 'md',
  },
};

export const ManyDots: Story = {
  args: {
    size: 'lg',
    dotCount: 8,
    dotSize: 6,
  },
};

export const TwoColor: Story = {
  args: {
    size: 'md',
    color: '#3b82f6',
    secondaryColor: '#ec4899',
    dotCount: 6,
  },
};

export const NoStagger: Story = {
  args: {
    size: 'md',
    stagger: false,
  },
};

export const Large: Story = {
  args: {
    size: 'xl',
    dotCount: 6,
    dotSize: 10,
  },
};

export const FastSpin: Story = {
  args: {
    size: 'md',
    speed: 'fast',
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-8">
      <OrbitDots size="sm" color="#3b82f6" />
      <OrbitDots size="md" color="#8b5cf6" dotCount={6} />
      <OrbitDots size="lg" color="#ec4899" dotCount={8} />
    </div>
  ),
};
