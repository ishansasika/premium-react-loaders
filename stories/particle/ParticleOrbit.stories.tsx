import type { Meta, StoryObj } from '@storybook/react';
import { ParticleOrbit } from '../../src/components/particle';

const meta: Meta<typeof ParticleOrbit> = {
  title: 'Components/Particle/ParticleOrbit',
  component: ParticleOrbit,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number', min: 40, max: 160 },
      description: 'Orbital diameter in px',
    },
    count: {
      control: { type: 'number', min: 3, max: 8 },
      description: 'Number of orbiting particles',
    },
    color: {
      control: 'color',
      description: 'Particle color',
    },
    centerColor: {
      control: 'color',
      description: 'Central dot color',
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Animation speed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ParticleOrbit>;

export const Default: Story = {
  args: {},
};

export const ManyParticles: Story = {
  args: {
    count: 8,
    size: 100,
  },
};

export const TwoColor: Story = {
  args: {
    color: '#3b82f6',
    centerColor: '#ec4899',
    size: 80,
  },
};

export const Large: Story = {
  args: {
    size: 120,
    count: 6,
    color: '#8b5cf6',
    centerColor: '#8b5cf6',
  },
};

export const Slow: Story = {
  args: {
    speed: 'slow',
    count: 4,
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-12 items-center">
      <ParticleOrbit color="#3b82f6" count={3} size={60} />
      <ParticleOrbit color="#8b5cf6" count={5} size={80} centerColor="#ec4899" />
      <ParticleOrbit color="#10b981" count={7} size={100} speed="slow" />
    </div>
  ),
};
