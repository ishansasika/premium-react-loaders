import type { Meta, StoryObj } from '@storybook/react';
import { GradientSpinner } from '../../src/components/gradient';

const meta: Meta<typeof GradientSpinner> = {
  title: 'Components/Gradient/GradientSpinner',
  component: GradientSpinner,
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
      control: { type: 'number', min: 2, max: 16 },
      description: 'Ring stroke width in px',
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
type Story = StoryObj<typeof GradientSpinner>;

export const Default: Story = {
  args: {},
};

export const Large: Story = {
  args: {
    size: 80,
    thickness: 6,
  },
};

export const PinkPurple: Story = {
  args: {
    color: '#ec4899',
    secondaryColor: '#8b5cf6',
    size: 60,
  },
};

export const Thick: Story = {
  args: {
    thickness: 8,
    size: 64,
  },
};

export const Fast: Story = {
  args: {
    speed: 'fast',
    color: '#10b981',
    secondaryColor: '#3b82f6',
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <GradientSpinner size={32} />
      <GradientSpinner size={48} color="#ec4899" secondaryColor="#8b5cf6" />
      <GradientSpinner size={64} color="#10b981" secondaryColor="#3b82f6" thickness={6} />
    </div>
  ),
};
