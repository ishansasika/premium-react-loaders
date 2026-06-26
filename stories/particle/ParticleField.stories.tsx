import type { Meta, StoryObj } from '@storybook/react';
import { ParticleField } from '../../src/components/particle';

const meta: Meta<typeof ParticleField> = {
  title: 'Components/Particle/ParticleField',
  component: ParticleField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    width: { control: { type: 'number', min: 60, max: 300 }, description: 'Field width in px' },
    height: { control: { type: 'number', min: 60, max: 300 }, description: 'Field height in px' },
    count: { control: { type: 'number', min: 5, max: 30 }, description: 'Number of particles' },
    color: { control: 'color', description: 'Particle color' },
    speed: { control: 'select', options: ['slow', 'normal', 'fast'], description: 'Float speed' },
  },
};

export default meta;
type Story = StoryObj<typeof ParticleField>;

export const Default: Story = { args: {} };

export const Dense: Story = {
  args: { count: 24, width: 160, height: 160, color: '#8b5cf6' },
};

export const Wide: Story = {
  args: { width: 240, height: 80, count: 20, color: '#22d3ee' },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <ParticleField color="#3b82f6" count={10} width={100} height={100} />
      <ParticleField color="#8b5cf6" count={16} width={120} height={120} speed="slow" />
      <ParticleField color="#ec4899" count={24} width={140} height={140} />
    </div>
  ),
};
