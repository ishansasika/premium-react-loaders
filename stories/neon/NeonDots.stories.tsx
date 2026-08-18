import type { Meta, StoryObj } from '@storybook/react';
import { NeonDots } from '../../src/components/neon';

const meta: Meta<typeof NeonDots> = {
  title: 'Components/Neon/NeonDots',
  component: NeonDots,
  parameters: { layout: 'centered', backgrounds: { default: 'dark' } },
  tags: ['autodocs'],
  argTypes: {
    dotCount: { control: { type: 'range', min: 2, max: 8, step: 1 }, description: 'Number of dots' },
    dotSize: { control: { type: 'range', min: 4, max: 24, step: 1 }, description: 'Dot diameter in px' },
    color: { control: 'color', description: 'Neon glow color' },
    speed: { control: 'select', options: ['slow', 'normal', 'fast'], description: 'Bounce speed' },
  },
};

export default meta;
type Story = StoryObj<typeof NeonDots>;

export const Default: Story = { args: { color: '#22d3ee' } };

export const FourDots: Story = { args: { dotCount: 4, dotSize: 14, color: '#a855f7' } };

export const Multiple: Story = {
  render: () => (
    <div style={{ background: '#0f0f0f', padding: 32, borderRadius: 12 }} className="flex gap-12 items-center">
      <NeonDots color="#3b82f6" />
      <NeonDots color="#22d3ee" dotSize={14} />
      <NeonDots color="#a855f7" dotCount={4} />
    </div>
  ),
};
