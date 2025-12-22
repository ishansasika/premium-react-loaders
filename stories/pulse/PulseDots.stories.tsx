import type { Meta, StoryObj } from '@storybook/react';
import { PulseDots } from '../../src/components/pulse';

const meta: Meta<typeof PulseDots> = {
  title: 'Components/Pulse/PulseDots',
  component: PulseDots,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'number',
      description: 'Height of the loader',
    },
    color: {
      control: 'color',
      description: 'Color of the dots',
    },
    dotCount: {
      control: 'number',
      description: 'Number of dots',
    },
    dotSize: {
      control: 'number',
      description: 'Size of each dot',
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Animation speed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PulseDots>;

export const Default: Story = {
  args: {},
};

export const FiveDots: Story = {
  args: {
    dotCount: 5,
  },
};

export const Large: Story = {
  args: {
    size: 60,
    dotSize: 14,
  },
};

export const Small: Story = {
  args: {
    size: 30,
    dotSize: 6,
  },
};

export const CustomColor: Story = {
  args: {
    color: '#8b5cf6',
  },
};

export const Fast: Story = {
  args: {
    speed: 'fast',
  },
};

export const Slow: Story = {
  args: {
    speed: 'slow',
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <PulseDots dotCount={3} color="#3b82f6" />
      <PulseDots dotCount={4} color="#8b5cf6" />
      <PulseDots dotCount={5} color="#ec4899" />
    </div>
  ),
};
