import type { Meta, StoryObj } from '@storybook/react';
import { ProgressRing } from '../../src/components/progress';

const meta: Meta<typeof ProgressRing> = {
  title: 'Components/Progress/ProgressRing',
  component: ProgressRing,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100)',
    },
    buffer: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Buffer value for YouTube-style loading (0-100)',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate mode',
    },
    showValue: {
      control: 'boolean',
      description: 'Show percentage text',
    },
    gradient: {
      control: 'boolean',
      description: 'Enable gradient effect',
    },
    speed: {
      control: { type: 'select', options: ['slow', 'normal', 'fast'] },
      description: 'Animation speed',
    },
    size: {
      control: 'number',
      description: 'Size of the ring',
    },
    thickness: {
      control: 'number',
      description: 'Thickness of the ring',
    },
    color: {
      control: 'color',
      description: 'Progress color',
    },
    secondaryColor: {
      control: 'color',
      description: 'Background/gradient end color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressRing>;

export const Default: Story = {
  args: {
    value: 75,
  },
};

export const WithValue: Story = {
  args: {
    value: 65,
    showValue: true,
  },
};

export const WithGradient: Story = {
  args: {
    value: 60,
    gradient: true,
    showValue: true,
    color: '#3b82f6',
    secondaryColor: '#8b5cf6',
  },
};

export const WithBuffer: Story = {
  args: {
    value: 50,
    buffer: 75,
    showValue: true,
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

export const IndeterminateWithSpeed: Story = {
  args: {
    indeterminate: true,
    speed: 'fast',
  },
};

export const Large: Story = {
  args: {
    value: 60,
    size: 100,
    showValue: true,
  },
};

export const Thick: Story = {
  args: {
    value: 70,
    thickness: 8,
    showValue: true,
    size: 80,
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-6">
      <ProgressRing value={25} showValue />
      <ProgressRing value={50} showValue />
      <ProgressRing value={75} showValue />
      <ProgressRing value={100} showValue />
    </div>
  ),
};
