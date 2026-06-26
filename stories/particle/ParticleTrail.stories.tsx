import type { Meta, StoryObj } from '@storybook/react';
import { ParticleTrail } from '../../src/components/particle';

const meta: Meta<typeof ParticleTrail> = {
  title: 'Components/Particle/ParticleTrail',
  component: ParticleTrail,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'number', min: 40, max: 200 }, description: 'Orbit diameter in px' },
    count: { control: { type: 'number', min: 3, max: 10 }, description: 'Trailing particles' },
    color: { control: 'color', description: 'Particle color' },
    speed: { control: 'select', options: ['slow', 'normal', 'fast'], description: 'Animation speed' },
  },
};

export default meta;
type Story = StoryObj<typeof ParticleTrail>;

export const Default: Story = { args: {} };

export const Dense: Story = {
  args: { count: 10, size: 80, color: '#8b5cf6' },
};

export const Fast: Story = {
  args: { speed: 'fast', color: '#ec4899', count: 8 },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-12 items-center">
      <ParticleTrail color="#3b82f6" count={4} size={50} />
      <ParticleTrail color="#8b5cf6" count={7} size={70} speed="slow" />
      <ParticleTrail color="#ec4899" count={10} size={90} />
    </div>
  ),
};
