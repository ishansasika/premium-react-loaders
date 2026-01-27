import type { Meta, StoryObj } from '@storybook/react';
import { CubeSpinner } from '../../src/components/3d';

const meta: Meta<typeof CubeSpinner> = {
  title: 'Components/3D/CubeSpinner',
  component: CubeSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'number',
      description: 'Size of the cube',
    },
    rotationAxis: {
      control: 'select',
      options: ['x', 'y', 'z', 'diagonal'],
      description: 'Rotation axis',
    },
    perspective: {
      control: 'number',
      description: 'Perspective distance in pixels',
    },
    showEdges: {
      control: 'boolean',
      description: 'Show cube edges/wireframe',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CubeSpinner>;

export const Default: Story = {
  args: {},
};

export const RotateX: Story = {
  args: {
    rotationAxis: 'x',
    size: 80,
  },
};

export const RotateY: Story = {
  args: {
    rotationAxis: 'y',
    size: 80,
  },
};

export const RotateDiagonal: Story = {
  args: {
    rotationAxis: 'diagonal',
    size: 80,
  },
};

export const WithEdges: Story = {
  args: {
    size: 80,
    showEdges: true,
    edgeColor: '#000000',
  },
};

export const CustomColors: Story = {
  args: {
    size: 80,
    faceColors: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'],
    showEdges: true,
  },
};

export const FastRotation: Story = {
  args: {
    size: 80,
    speed: 'fast',
    rotationAxis: 'diagonal',
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-8">
      <CubeSpinner size={60} rotationAxis="x" color="#3b82f6" />
      <CubeSpinner size={60} rotationAxis="y" color="#8b5cf6" />
      <CubeSpinner size={60} rotationAxis="diagonal" color="#ec4899" />
    </div>
  ),
};
