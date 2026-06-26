import type { Meta, StoryObj } from '@storybook/react';
import { NeonSpinner } from '../../src/components/neon';

const meta: Meta<typeof NeonSpinner> = {
  title: 'Components/Neon/NeonSpinner',
  component: NeonSpinner,
  parameters: { layout: 'centered', backgrounds: { default: 'dark' } },
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'number', min: 40, max: 200 }, description: 'Spinner diameter in px' },
    color: { control: 'color', description: 'Neon arc color' },
    thickness: { control: { type: 'number', min: 2, max: 12 }, description: 'Arc stroke width in px' },
    speed: { control: 'select', options: ['slow', 'normal', 'fast'], description: 'Spin speed' },
  },
};

export default meta;
type Story = StoryObj<typeof NeonSpinner>;

export const Default: Story = { args: {} };

export const Cyan: Story = {
  args: { color: '#22d3ee', size: 80, thickness: 6 },
};

export const Pink: Story = {
  args: { color: '#ec4899', size: 60, thickness: 3, speed: 'fast' },
};

export const Multiple: Story = {
  render: () => (
    <div style={{ background: '#0f0f0f', padding: 32, borderRadius: 12 }} className="flex gap-12 items-center">
      <NeonSpinner color="#3b82f6" size={48} />
      <NeonSpinner color="#a855f7" size={64} thickness={6} speed="slow" />
      <NeonSpinner color="#22d3ee" size={80} thickness={3} />
    </div>
  ),
};
