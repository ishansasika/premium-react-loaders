import type { Meta, StoryObj } from '@storybook/react';
import { PerspectiveRing } from '../../src/components/3d';

const meta: Meta<typeof PerspectiveRing> = {
  title: 'Components/3D/PerspectiveRing',
  component: PerspectiveRing,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tilt: {
      control: { type: 'range', min: 0, max: 90, step: 5 },
      description: 'Ring tilt angle (0-90 degrees)',
    },
    thickness: {
      control: 'number',
      description: 'Ring thickness',
    },
    showShadow: {
      control: 'boolean',
      description: 'Show shadow underneath',
    },
    shadowBlur: {
      control: 'number',
      description: 'Shadow blur amount',
    },
    segments: {
      control: { type: 'range', min: 4, max: 24, step: 1 },
      description: 'Number of segments',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PerspectiveRing>;

export const Default: Story = {
  args: {},
};

export const NoTilt: Story = {
  args: {
    tilt: 0,
    size: 100,
  },
};

export const MediumTilt: Story = {
  args: {
    tilt: 45,
    size: 100,
  },
};

export const HighTilt: Story = {
  args: {
    tilt: 75,
    size: 100,
  },
};

export const WithShadow: Story = {
  args: {
    tilt: 60,
    showShadow: true,
    shadowBlur: 15,
    size: 100,
  },
};

export const ThickRing: Story = {
  args: {
    thickness: 8,
    tilt: 50,
    size: 100,
  },
};

export const ManySegments: Story = {
  args: {
    segments: 16,
    tilt: 55,
    size: 100,
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-8">
      <PerspectiveRing size={80} tilt={30} color="#3b82f6" />
      <PerspectiveRing size={80} tilt={60} color="#8b5cf6" showShadow />
      <PerspectiveRing size={80} tilt={75} thickness={6} color="#ec4899" />
    </div>
  ),
};
