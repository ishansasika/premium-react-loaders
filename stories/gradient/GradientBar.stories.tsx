import type { Meta, StoryObj } from '@storybook/react';
import { GradientBar } from '../../src/components/gradient';

const meta: Meta<typeof GradientBar> = {
  title: 'Components/Gradient/GradientBar',
  component: GradientBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress 0–100 (indeterminate if omitted)',
    },
    height: {
      control: { type: 'number', min: 4, max: 24 },
      description: 'Bar height in px',
    },
    color: {
      control: 'color',
      description: 'Gradient start color',
    },
    secondaryColor: {
      control: 'color',
      description: 'Gradient end color',
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Animation speed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof GradientBar>;

export const Default: Story = {
  args: {},
};

export const HalfProgress: Story = {
  args: {
    value: 50,
    width: 300,
  },
};

export const TallBar: Story = {
  args: {
    height: 16,
    value: 65,
    width: 300,
  },
};

export const PinkPurple: Story = {
  args: {
    color: '#ec4899',
    secondaryColor: '#8b5cf6',
    value: 75,
    width: 300,
  },
};

export const WithOnComplete: Story = {
  args: {
    value: 100,
    width: 300,
    onComplete: () => console.log('GradientBar complete!'),
  },
};

export const Indeterminate: Story = {
  args: {
    width: 300,
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-col gap-4" style={{ width: 320 }}>
      <GradientBar value={30} />
      <GradientBar value={60} color="#8b5cf6" secondaryColor="#ec4899" height={12} />
      <GradientBar value={90} color="#10b981" secondaryColor="#3b82f6" />
      <GradientBar />
    </div>
  ),
};
