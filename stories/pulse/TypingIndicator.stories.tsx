import type { Meta, StoryObj } from '@storybook/react';
import { TypingIndicator } from '../../src/components/pulse/TypingIndicator';

const meta = {
  title: 'Pulse/TypingIndicator',
  component: TypingIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    dotCount: {
      control: { type: 'range', min: 2, max: 6, step: 1 },
      description: 'Number of dots',
      defaultValue: 3,
    },
    dotSize: {
      control: { type: 'range', min: 4, max: 16, step: 2 },
      description: 'Size of each dot',
      defaultValue: 8,
    },
    gap: {
      control: { type: 'range', min: 2, max: 12, step: 2 },
      description: 'Space between dots',
      defaultValue: 4,
    },
    color: {
      control: 'color',
      description: 'Color of the dots',
      defaultValue: '#3b82f6',
    },
    variant: {
      control: { type: 'select', options: ['bounce', 'fade'] },
      description: 'Animation style',
      defaultValue: 'bounce',
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
} satisfies Meta<typeof TypingIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const FadeVariant: Story = {
  args: {
    variant: 'fade',
  },
};

export const CustomDotCount: Story = {
  args: {
    dotCount: 5,
  },
};

export const LargeDots: Story = {
  args: {
    dotSize: 12,
    gap: 6,
  },
};

export const SmallDots: Story = {
  args: {
    dotSize: 6,
    gap: 3,
  },
};

export const CustomGap: Story = {
  args: {
    gap: 8,
    dotSize: 10,
  },
};

export const CustomColor: Story = {
  args: {
    color: '#10b981',
    dotSize: 10,
  },
};

export const FastSpeed: Story = {
  args: {
    speed: 'fast',
  },
};

export const SlowSpeed: Story = {
  args: {
    speed: 'slow',
  },
};

export const FadeWithManyDots: Story = {
  args: {
    variant: 'fade',
    dotCount: 5,
    dotSize: 10,
  },
};

export const BounceWithCustomColor: Story = {
  args: {
    variant: 'bounce',
    color: '#8b5cf6',
    dotSize: 12,
    gap: 8,
  },
};
