import type { Meta, StoryObj } from '@storybook/react';
import { BouncingBalls } from '../../src/components/bounce';

const meta: Meta<typeof BouncingBalls> = {
  title: 'Components/Bounce/BouncingBalls',
  component: BouncingBalls,
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
      description: 'Secondary color for alternating balls',
    },
    ballCount: {
      control: { type: 'number', min: 1, max: 6 },
      description: 'Number of balls',
    },
    ballSize: {
      control: 'number',
      description: 'Size of each ball',
    },
    gap: {
      control: 'number',
      description: 'Gap between balls',
    },
    bounceHeight: {
      control: { type: 'number', min: 0.5, max: 3, step: 0.1 },
      description: 'Bounce height multiplier',
    },
    shadow: {
      control: 'boolean',
      description: 'Enable shadow effect',
    },
    squash: {
      control: 'boolean',
      description: 'Enable squash and stretch',
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Animation speed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BouncingBalls>;

export const Default: Story = {
  args: {},
};

export const FourBalls: Story = {
  args: {
    ballCount: 4,
  },
};

export const NoShadow: Story = {
  args: {
    shadow: false,
  },
};

export const NoSquash: Story = {
  args: {
    squash: false,
  },
};

export const TwoColor: Story = {
  args: {
    color: '#3b82f6',
    secondaryColor: '#f59e0b',
    ballCount: 4,
  },
};

export const HighBounce: Story = {
  args: {
    bounceHeight: 2.5,
  },
};

export const LargeBalls: Story = {
  args: {
    ballSize: 20,
    gap: 14,
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-col gap-8 items-center">
      <BouncingBalls color="#3b82f6" />
      <BouncingBalls color="#8b5cf6" shadow={false} />
      <BouncingBalls color="#ec4899" squash={false} ballCount={4} />
    </div>
  ),
};
