import type { Meta, StoryObj } from '@storybook/react';
import { WaveCircle } from '../../src/components/morph';

const meta: Meta<typeof WaveCircle> = {
  title: 'Components/Morph/WaveCircle',
  component: WaveCircle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number', min: 40, max: 200 },
      description: 'Max ring diameter in px',
    },
    color: {
      control: 'color',
      description: 'Ring color',
    },
    ringCount: {
      control: { type: 'number', min: 2, max: 5 },
      description: 'Number of concentric rings',
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Animation speed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof WaveCircle>;

export const Default: Story = {
  args: {},
};

export const FiveRings: Story = {
  args: {
    ringCount: 5,
    size: 120,
  },
};

export const TwoRings: Story = {
  args: {
    ringCount: 2,
  },
};

export const CustomColor: Story = {
  args: {
    color: '#8b5cf6',
    size: 100,
  },
};

export const Slow: Story = {
  args: {
    speed: 'slow',
    ringCount: 4,
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-12 items-center">
      <WaveCircle color="#3b82f6" ringCount={2} size={80} />
      <WaveCircle color="#8b5cf6" ringCount={3} size={100} speed="slow" />
      <WaveCircle color="#ec4899" ringCount={5} size={120} speed="fast" />
    </div>
  ),
};
