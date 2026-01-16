import type { Meta, StoryObj } from '@storybook/react';
import { AtomLoader } from '../../src/components/orbit';

const meta: Meta<typeof AtomLoader> = {
  title: 'Components/Orbit/AtomLoader',
  component: AtomLoader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the loader',
    },
    color: {
      control: 'color',
      description: 'Primary color',
    },
    secondaryColor: {
      control: 'color',
      description: 'Secondary color for nucleus',
    },
    orbits: {
      control: { type: 'number', min: 1, max: 6 },
      description: 'Number of orbital paths',
    },
    nucleusSize: {
      control: 'number',
      description: 'Size of the nucleus',
    },
    electronSize: {
      control: 'number',
      description: 'Size of electrons',
    },
    showNucleus: {
      control: 'boolean',
      description: 'Show the nucleus',
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Animation speed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AtomLoader>;

export const Default: Story = {
  args: {
    size: 'md',
  },
};

export const FourOrbits: Story = {
  args: {
    size: 'lg',
    orbits: 4,
  },
};

export const NoNucleus: Story = {
  args: {
    size: 'md',
    showNucleus: false,
  },
};

export const TwoColor: Story = {
  args: {
    size: 'lg',
    color: '#3b82f6',
    secondaryColor: '#f59e0b',
  },
};

export const LargeParticles: Story = {
  args: {
    size: 'xl',
    nucleusSize: 14,
    electronSize: 8,
    orbits: 4,
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-8">
      <AtomLoader size="sm" color="#3b82f6" />
      <AtomLoader size="md" color="#8b5cf6" orbits={4} />
      <AtomLoader size="lg" color="#ec4899" showNucleus={false} />
    </div>
  ),
};
