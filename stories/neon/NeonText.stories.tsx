import type { Meta, StoryObj } from '@storybook/react';
import { NeonText } from '../../src/components/neon';

const meta: Meta<typeof NeonText> = {
  title: 'Components/Neon/NeonText',
  component: NeonText,
  parameters: { layout: 'centered', backgrounds: { default: 'dark' } },
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text', description: 'Display text' },
    color: { control: 'color', description: 'Neon glow color' },
    fontSize: { control: { type: 'number', min: 10, max: 48 }, description: 'Font size in px' },
    speed: { control: 'select', options: ['slow', 'normal', 'fast'], description: 'Glow pulse speed' },
  },
};

export default meta;
type Story = StoryObj<typeof NeonText>;

export const Default: Story = { args: {} };

export const CustomText: Story = {
  args: { text: 'PROCESSING', color: '#a855f7', fontSize: 22 },
};

export const Large: Story = {
  args: { text: 'WAIT', color: '#22d3ee', fontSize: 36 },
};

export const Multiple: Story = {
  render: () => (
    <div style={{ background: '#0f0f0f', padding: 32, borderRadius: 12 }} className="flex flex-col gap-6 items-center">
      <NeonText text="LOADING" color="#3b82f6" />
      <NeonText text="PROCESSING" color="#a855f7" fontSize={22} />
      <NeonText text="PLEASE WAIT" color="#22d3ee" fontSize={14} speed="slow" />
    </div>
  ),
};
