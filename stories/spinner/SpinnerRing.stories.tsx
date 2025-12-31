import type { Meta, StoryObj } from '@storybook/react';
import { SpinnerRing } from '../../src/components/spinner';

const meta: Meta<typeof SpinnerRing> = {
  title: 'Components/Spinner/SpinnerRing',
  component: SpinnerRing,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'number',
      description: 'Size of the spinner',
    },
    color: {
      control: 'color',
      description: 'Color of the spinner',
    },
    secondaryColor: {
      control: 'color',
      description: 'Background ring color',
    },
    thickness: {
      control: 'number',
      description: 'Thickness of the spinner',
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Animation speed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SpinnerRing>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: 24,
  },
};

export const Large: Story = {
  args: {
    size: 60,
  },
};

export const CustomColor: Story = {
  args: {
    color: '#8b5cf6',
    size: 40,
  },
};

export const CustomSecondaryColor: Story = {
  args: {
    color: '#3b82f6',
    secondaryColor: '#e0e0e0',
    size: 40,
  },
};

export const Thick: Story = {
  args: {
    thickness: 6,
    size: 48,
  },
};

export const Fast: Story = {
  args: {
    speed: 'fast',
    size: 40,
  },
};

export const Slow: Story = {
  args: {
    speed: 'slow',
    size: 40,
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-4">
      <SpinnerRing size={24} color="#3b82f6" />
      <SpinnerRing size={32} color="#8b5cf6" />
      <SpinnerRing size={40} color="#ec4899" />
      <SpinnerRing size={48} color="#f59e0b" />
    </div>
  ),
};
