import type { Meta, StoryObj } from '@storybook/react';
import { Helix } from '../../src/components/3d';

const meta: Meta<typeof Helix> = {
  title: 'Components/3D/Helix',
  component: Helix,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    particleCount: {
      control: { type: 'range', min: 6, max: 24, step: 1 },
      description: 'Number of particles',
    },
    radius: {
      control: 'number',
      description: 'Helix radius',
    },
    height: {
      control: 'number',
      description: 'Helix height',
    },
    turns: {
      control: { type: 'range', min: 0.5, max: 3, step: 0.5 },
      description: 'Number of complete rotations',
    },
    direction: {
      control: 'select',
      options: ['up', 'down'],
      description: 'Rotation direction',
    },
    showLines: {
      control: 'boolean',
      description: 'Show connecting lines',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Helix>;

export const Default: Story = {
  args: {},
};

export const WithLines: Story = {
  args: {
    showLines: true,
    particleCount: 16,
    size: 100,
  },
};

export const UpwardRotation: Story = {
  args: {
    direction: 'up',
    particleCount: 12,
    size: 100,
  },
};

export const DownwardRotation: Story = {
  args: {
    direction: 'down',
    particleCount: 12,
    size: 100,
  },
};

export const DNAStyle: Story = {
  args: {
    particleCount: 20,
    radius: 25,
    height: 150,
    turns: 2,
    showLines: true,
    color: '#3b82f6',
    secondaryColor: '#ec4899',
  },
};

export const Compact: Story = {
  args: {
    particleCount: 10,
    radius: 15,
    height: 80,
    turns: 1.5,
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-12">
      <Helix size={80} particleCount={12} color="#3b82f6" direction="up" />
      <Helix size={80} particleCount={14} showLines color="#8b5cf6" />
      <Helix size={80} particleCount={16} color="#ec4899" direction="down" />
    </div>
  ),
};
