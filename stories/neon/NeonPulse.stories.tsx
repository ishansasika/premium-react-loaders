import type { Meta, StoryObj } from '@storybook/react';
import { NeonPulse } from '../../src/components/neon';

const meta: Meta<typeof NeonPulse> = {
  title: 'Components/Neon/NeonPulse',
  component: NeonPulse,
  parameters: { layout: 'centered', backgrounds: { default: 'dark' } },
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'number', min: 40, max: 200 }, description: 'Ring diameter in px' },
    color: { control: 'color', description: 'Neon glow color' },
    glowIntensity: { control: 'select', options: ['low', 'medium', 'high'], description: 'Glow spread' },
    speed: { control: 'select', options: ['slow', 'normal', 'fast'], description: 'Animation speed' },
  },
};

export default meta;
type Story = StoryObj<typeof NeonPulse>;

export const Default: Story = { args: {} };

export const HighGlow: Story = {
  args: { glowIntensity: 'high', color: '#22d3ee', size: 80 },
};

export const Purple: Story = {
  args: { color: '#a855f7', glowIntensity: 'high', size: 60 },
};

export const Multiple: Story = {
  render: () => (
    <div style={{ background: '#0f0f0f', padding: 32, borderRadius: 12 }} className="flex gap-12 items-center">
      <NeonPulse color="#3b82f6" glowIntensity="low" />
      <NeonPulse color="#22d3ee" glowIntensity="medium" size={80} />
      <NeonPulse color="#a855f7" glowIntensity="high" size={100} />
    </div>
  ),
};
