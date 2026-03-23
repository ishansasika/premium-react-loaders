import type { Meta, StoryObj } from '@storybook/react';
import { LiquidFill } from '../../src/components/morph';

const meta: Meta<typeof LiquidFill> = {
  title: 'Components/Morph/LiquidFill',
  component: LiquidFill,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Fill percentage 0–100 (indeterminate if omitted)',
    },
    size: {
      control: { type: 'number', min: 40, max: 200 },
      description: 'Diameter in px',
    },
    color: {
      control: 'color',
      description: 'Liquid color',
    },
    waveAmplitude: {
      control: { type: 'number', min: 0, max: 16 },
      description: 'Wave height in px',
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Animation speed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LiquidFill>;

export const Default: Story = {
  args: {},
};

export const HalfFull: Story = {
  args: {
    value: 50,
  },
};

export const AlmostFull: Story = {
  args: {
    value: 80,
    color: '#10b981',
  },
};

export const LargeWave: Story = {
  args: {
    value: 40,
    waveAmplitude: 12,
  },
};

export const WithOnComplete: Story = {
  args: {
    value: 100,
    onComplete: () => console.log('LiquidFill complete!'),
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-8 items-end">
      <LiquidFill value={25} color="#3b82f6" size={80} />
      <LiquidFill value={60} color="#8b5cf6" size={80} />
      <LiquidFill value={90} color="#10b981" size={80} />
    </div>
  ),
};
