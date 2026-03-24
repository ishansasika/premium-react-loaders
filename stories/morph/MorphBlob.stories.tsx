import type { Meta, StoryObj } from '@storybook/react';
import { MorphBlob } from '../../src/components/morph';

const meta: Meta<typeof MorphBlob> = {
  title: 'Components/Morph/MorphBlob',
  component: MorphBlob,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number', min: 40, max: 200 },
      description: 'Diameter in px',
    },
    color: {
      control: 'color',
      description: 'Fill color',
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Morphing speed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MorphBlob>;

export const Default: Story = {
  args: {},
};

export const Large: Story = {
  args: {
    size: 120,
  },
};

export const CustomColor: Story = {
  args: {
    color: '#8b5cf6',
    size: 100,
  },
};

export const Slow: Story = {
  args: {
    speed: 'slow',
    size: 80,
  },
};

export const Fast: Story = {
  args: {
    speed: 'fast',
    color: '#ec4899',
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <MorphBlob color="#3b82f6" size={60} />
      <MorphBlob color="#8b5cf6" size={80} speed="slow" />
      <MorphBlob color="#ec4899" size={100} speed="fast" />
    </div>
  ),
};
