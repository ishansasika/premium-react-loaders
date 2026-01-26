import type { Meta, StoryObj } from '@storybook/react';
import { PlaneRotate } from '../../src/components/3d';

const meta: Meta<typeof PlaneRotate> = {
  title: 'Components/3D/PlaneRotate',
  component: PlaneRotate,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    planeCount: {
      control: { type: 'range', min: 2, max: 6, step: 1 },
      description: 'Number of planes',
    },
    rotationType: {
      control: 'select',
      options: ['synchronized', 'staggered', 'opposite'],
      description: 'Rotation type',
    },
    spacing: {
      control: 'number',
      description: 'Plane spacing in pixels',
    },
    opacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Plane opacity',
    },
    showAxis: {
      control: 'boolean',
      description: 'Show center axis',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PlaneRotate>;

export const Default: Story = {
  args: {},
};

export const Synchronized: Story = {
  args: {
    planeCount: 4,
    rotationType: 'synchronized',
    size: 80,
  },
};

export const Staggered: Story = {
  args: {
    planeCount: 4,
    rotationType: 'staggered',
    size: 80,
  },
};

export const Opposite: Story = {
  args: {
    planeCount: 4,
    rotationType: 'opposite',
    size: 80,
  },
};

export const WithAxis: Story = {
  args: {
    planeCount: 5,
    showAxis: true,
    size: 80,
  },
};

export const ManyPlanes: Story = {
  args: {
    planeCount: 6,
    rotationType: 'staggered',
    spacing: 8,
    opacity: 0.7,
    size: 80,
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-8">
      <PlaneRotate size={70} planeCount={3} rotationType="synchronized" color="#3b82f6" />
      <PlaneRotate size={70} planeCount={4} rotationType="staggered" color="#8b5cf6" />
      <PlaneRotate size={70} planeCount={5} rotationType="opposite" color="#ec4899" />
    </div>
  ),
};
