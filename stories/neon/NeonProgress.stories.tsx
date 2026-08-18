import type { Meta, StoryObj } from '@storybook/react';
import { NeonProgress } from '../../src/components/neon';

const meta: Meta<typeof NeonProgress> = {
  title: 'Components/Neon/NeonProgress',
  component: NeonProgress,
  parameters: { layout: 'centered', backgrounds: { default: 'dark' } },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 }, description: 'Progress 0–100 (indeterminate if omitted)' },
    height: { control: { type: 'number', min: 4, max: 24 }, description: 'Bar height in px' },
    color: { control: 'color', description: 'Neon glow color' },
    speed: { control: 'select', options: ['slow', 'normal', 'fast'], description: 'Animation speed' },
  },
};

export default meta;
type Story = StoryObj<typeof NeonProgress>;

export const Default: Story = { args: { value: 65, width: 300 } };

export const Indeterminate: Story = { args: { width: 300 } };

export const WithOnComplete: Story = {
  args: { value: 100, width: 300, onComplete: () => console.log('NeonProgress complete!') },
};

export const Multiple: Story = {
  render: () => (
    <div style={{ background: '#0f0f0f', padding: 32, borderRadius: 12, width: 320 }} className="flex flex-col gap-4">
      <NeonProgress value={30} color="#3b82f6" />
      <NeonProgress value={60} color="#a855f7" height={12} />
      <NeonProgress value={90} color="#22d3ee" />
      <NeonProgress color="#ec4899" />
    </div>
  ),
};
