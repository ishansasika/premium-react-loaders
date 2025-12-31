import type { Meta, StoryObj } from '@storybook/react';
import { SpinnerWave } from '../../src/components/spinner/SpinnerWave';

const meta = {
  title: 'Spinner/SpinnerWave',
  component: SpinnerWave,
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
      description: 'Color of the ripples',
      defaultValue: '#3b82f6',
    },
    ripples: {
      control: { type: 'range', min: 1, max: 5, step: 1 },
      description: 'Number of expanding ripples',
      defaultValue: 3,
    },
    maxScale: {
      control: { type: 'range', min: 1.5, max: 3, step: 0.1 },
      description: 'Maximum scale before fade',
      defaultValue: 2,
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
} satisfies Meta<typeof SpinnerWave>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SingleRipple: Story = {
  args: {
    ripples: 1,
  },
};

export const ManyRipples: Story = {
  args: {
    ripples: 5,
  },
};

export const LargeSize: Story = {
  args: {
    size: 80,
  },
};

export const CustomColor: Story = {
  args: {
    color: '#8b5cf6',
    size: 60,
  },
};

export const FastSpeed: Story = {
  args: {
    speed: 'fast',
    size: 50,
  },
};

export const SlowSpeed: Story = {
  args: {
    speed: 'slow',
    size: 50,
  },
};

export const LargeScale: Story = {
  args: {
    maxScale: 2.5,
    ripples: 3,
    size: 60,
  },
};

export const SmallScale: Story = {
  args: {
    maxScale: 1.5,
    ripples: 4,
    size: 60,
  },
};
