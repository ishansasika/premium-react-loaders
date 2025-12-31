import type { Meta, StoryObj } from '@storybook/react';
import { ProgressCircle } from '../../src/components/progress';

const meta: Meta<typeof ProgressCircle> = {
  title: 'Components/Progress/ProgressCircle',
  component: ProgressCircle,
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
    speed: {
      control: { type: 'select', options: ['slow', 'normal', 'fast'] },
      description: 'Animation speed',
    },
    size: {
      control: 'number',
      description: 'Size of the circle',
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
      description: 'Background color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressCircle>;

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

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

export const Small: Story = {
  args: {
    value: 80,
    size: 40,
    showValue: true,
  },
};

export const Large: Story = {
  args: {
    value: 60,
    size: 100,
    showValue: true,
  },
};

export const CustomColor: Story = {
  args: {
    value: 90,
    color: '#ec4899',
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

export const WithBuffer: Story = {
  args: {
    value: 50,
    buffer: 75,
    showValue: true,
  },
};

export const IndeterminateWithSpeed: Story = {
  args: {
    indeterminate: true,
    speed: 'fast',
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-6">
      <ProgressCircle value={25} showValue />
      <ProgressCircle value={50} showValue />
      <ProgressCircle value={75} showValue />
      <ProgressCircle value={100} showValue />
    </div>
  ),
};
