import type { Meta, StoryObj } from '@storybook/react';
import { SpinnerPulse } from '../../src/components/spinner/SpinnerPulse';

const meta = {
  title: 'Spinner/SpinnerPulse',
  component: SpinnerPulse,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'range', min: 20, max: 100, step: 10 },
      description: 'Size of the spinner',
      defaultValue: 40,
    },
    color: {
      control: 'color',
      description: 'Color of the pulse',
      defaultValue: '#3b82f6',
    },
    pulses: {
      control: { type: 'range', min: 1, max: 3, step: 1 },
      description: 'Number of pulse circles',
      defaultValue: 2,
    },
    maxScale: {
      control: { type: 'range', min: 1.2, max: 2.5, step: 0.1 },
      description: 'Maximum scale at expansion',
      defaultValue: 1.8,
    },
    speed: {
      control: { type: 'select', options: ['slow', 'normal', 'fast'] },
      description: 'Animation speed',
      defaultValue: 'normal',
    },
    visible: {
      control: 'boolean',
      description: 'Visibility',
      defaultValue: true,
    },
  },
} satisfies Meta<typeof SpinnerPulse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SinglePulse: Story = {
  args: {
    pulses: 1,
  },
};

export const TriplePulse: Story = {
  args: {
    pulses: 3,
  },
};

export const LargeWithSlowSpeed: Story = {
  args: {
    size: 80,
    speed: 'slow',
  },
};

export const CustomColor: Story = {
  args: {
    color: '#ec4899',
    size: 60,
  },
};

export const FastSpeed: Story = {
  args: {
    speed: 'fast',
    size: 50,
  },
};

export const LargeScale: Story = {
  args: {
    maxScale: 2.2,
    pulses: 2,
    size: 60,
  },
};

export const SmallScale: Story = {
  args: {
    maxScale: 1.4,
    pulses: 3,
    size: 60,
  },
};
