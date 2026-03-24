import type { Meta, StoryObj } from '@storybook/react';
import { GradientRing } from '../../src/components/gradient';

const meta: Meta<typeof GradientRing> = {
  title: 'Components/Gradient/GradientRing',
  component: GradientRing,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number', min: 24, max: 120 },
      description: 'Diameter in px',
    },
    color: {
      control: 'color',
      description: 'Gradient start color',
    },
    secondaryColor: {
      control: 'color',
      description: 'Gradient end color',
    },
    thickness: {
      control: { type: 'number', min: 2, max: 20 },
      description: 'Ring width in px',
    },
    backgroundColor: {
      control: 'color',
      description: 'Inner cutout background color',
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Animation speed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof GradientRing>;

export const Default: Story = {
  args: {},
};

export const WideRing: Story = {
  args: {
    thickness: 12,
    size: 80,
  },
};

export const PinkToOrange: Story = {
  args: {
    color: '#ec4899',
    secondaryColor: '#f97316',
    size: 64,
    thickness: 8,
  },
};

export const Large: Story = {
  args: {
    size: 96,
    thickness: 10,
    color: '#8b5cf6',
    secondaryColor: '#3b82f6',
  },
};

export const Slow: Story = {
  args: {
    speed: 'slow',
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <GradientRing size={48} thickness={6} />
      <GradientRing size={64} thickness={8} color="#ec4899" secondaryColor="#f97316" />
      <GradientRing size={80} thickness={10} color="#8b5cf6" secondaryColor="#3b82f6" />
    </div>
  ),
};
