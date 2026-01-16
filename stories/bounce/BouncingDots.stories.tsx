import type { Meta, StoryObj } from '@storybook/react';
import { BouncingDots } from '../../src/components/bounce';

const meta: Meta<typeof BouncingDots> = {
  title: 'Components/Bounce/BouncingDots',
  component: BouncingDots,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'color',
      description: 'Primary color',
    },
    secondaryColor: {
      control: 'color',
      description: 'Secondary color for alternating dots',
    },
    dotCount: {
      control: { type: 'number', min: 2, max: 8 },
      description: 'Number of dots',
    },
    dotSize: {
      control: 'number',
      description: 'Size of each dot',
    },
    gap: {
      control: 'number',
      description: 'Gap between dots',
    },
    bounceHeight: {
      control: { type: 'number', min: 0.5, max: 3, step: 0.1 },
      description: 'Bounce height multiplier',
    },
    staggerDelay: {
      control: 'number',
      description: 'Stagger delay between dots (ms)',
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Animation speed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BouncingDots>;

export const Default: Story = {
  args: {},
};

export const FiveDots: Story = {
  args: {
    dotCount: 5,
  },
};

export const TwoColor: Story = {
  args: {
    color: '#3b82f6',
    secondaryColor: '#ec4899',
    dotCount: 4,
  },
};

export const HighBounce: Story = {
  args: {
    bounceHeight: 2,
  },
};

export const LargeDots: Story = {
  args: {
    dotSize: 16,
    gap: 12,
  },
};

export const FastStagger: Story = {
  args: {
    staggerDelay: 80,
    speed: 'fast',
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-col gap-8 items-center">
      <BouncingDots color="#3b82f6" dotCount={3} />
      <BouncingDots color="#8b5cf6" dotCount={5} dotSize={8} />
      <BouncingDots color="#ec4899" dotCount={4} bounceHeight={1.5} />
    </div>
  ),
};
