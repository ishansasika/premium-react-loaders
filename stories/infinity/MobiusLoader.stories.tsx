import type { Meta, StoryObj } from '@storybook/react';
import { MobiusLoader } from '../../src/components/infinity';

const meta: Meta<typeof MobiusLoader> = {
  title: 'Components/Infinity/MobiusLoader',
  component: MobiusLoader,
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
      description: 'Secondary color for alternating segments',
    },
    segments: {
      control: { type: 'number', min: 4, max: 12 },
      description: 'Number of segments',
    },
    thickness: {
      control: 'number',
      description: 'Segment thickness',
    },
    ribbonWidth: {
      control: 'number',
      description: 'Width of each ribbon segment',
    },
    twist: {
      control: 'boolean',
      description: 'Enable twist effect',
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Animation speed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MobiusLoader>;

export const Default: Story = {
  args: {
    size: 'md',
  },
};

export const ManySegments: Story = {
  args: {
    size: 'lg',
    segments: 10,
  },
};

export const NoTwist: Story = {
  args: {
    size: 'md',
    twist: false,
  },
};

export const TwoColor: Story = {
  args: {
    size: 'lg',
    color: '#3b82f6',
    secondaryColor: '#ec4899',
    segments: 8,
  },
};

export const ThickRibbon: Story = {
  args: {
    size: 'lg',
    thickness: 4,
    ribbonWidth: 12,
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-8">
      <MobiusLoader size="sm" color="#3b82f6" />
      <MobiusLoader size="md" color="#8b5cf6" segments={8} />
      <MobiusLoader size="lg" color="#ec4899" twist={false} />
    </div>
  ),
};
