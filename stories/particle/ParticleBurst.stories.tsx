import type { Meta, StoryObj } from '@storybook/react';
import { ParticleBurst } from '../../src/components/particle';

const meta: Meta<typeof ParticleBurst> = {
  title: 'Components/Particle/ParticleBurst',
  component: ParticleBurst,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number', min: 40, max: 160 },
      description: 'Burst radius in px',
    },
    count: {
      control: { type: 'number', min: 4, max: 20 },
      description: 'Number of particles',
    },
    color: {
      control: 'color',
      description: 'Particle color',
    },
    particleSize: {
      control: { type: 'number', min: 2, max: 16 },
      description: 'Dot diameter in px',
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Animation speed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ParticleBurst>;

export const Default: Story = {
  args: {},
};

export const ManyParticles: Story = {
  args: {
    count: 16,
    size: 80,
  },
};

export const LargeParticles: Story = {
  args: {
    particleSize: 10,
    count: 8,
    size: 80,
  },
};

export const CustomColor: Story = {
  args: {
    color: '#8b5cf6',
    count: 10,
  },
};

export const FastBurst: Story = {
  args: {
    speed: 'fast',
    count: 12,
    color: '#ec4899',
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-12 items-center">
      <ParticleBurst color="#3b82f6" count={6} size={60} />
      <ParticleBurst color="#8b5cf6" count={10} size={80} speed="slow" />
      <ParticleBurst color="#ec4899" count={14} size={100} particleSize={8} />
    </div>
  ),
};
