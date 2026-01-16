import type { Meta, StoryObj } from '@storybook/react';
import { ShimmerBox } from '../../src/components/shimmer';

const meta: Meta<typeof ShimmerBox> = {
  title: 'Components/Shimmer/ShimmerBox',
  component: ShimmerBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'number',
      description: 'Width of the shimmer box',
    },
    height: {
      control: 'number',
      description: 'Height of the shimmer box',
    },
    borderRadius: {
      control: 'number',
      description: 'Border radius',
    },
    baseColor: {
      control: 'color',
      description: 'Base background color',
    },
    highlightColor: {
      control: 'color',
      description: 'Shimmer highlight color',
    },
    direction: {
      control: 'select',
      options: ['left-to-right', 'right-to-left', 'top-to-bottom', 'bottom-to-top'],
      description: 'Direction of shimmer animation',
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Animation speed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ShimmerBox>;

export const Default: Story = {
  args: {
    width: 200,
    height: 150,
  },
};

export const Square: Story = {
  args: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
};

export const Circle: Story = {
  args: {
    width: 80,
    height: 80,
    borderRadius: '50%',
  },
};

export const AspectRatio: Story = {
  args: {
    width: 300,
    aspectRatio: '16/9',
  },
};

export const VerticalShimmer: Story = {
  args: {
    width: 150,
    height: 200,
    direction: 'top-to-bottom',
  },
};

export const CustomColors: Story = {
  args: {
    width: 200,
    height: 100,
    baseColor: '#dbeafe',
    highlightColor: '#eff6ff',
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-4">
      <ShimmerBox width={60} height={60} borderRadius="50%" />
      <div className="flex flex-col gap-2">
        <ShimmerBox width={150} height={16} />
        <ShimmerBox width={100} height={16} />
      </div>
    </div>
  ),
};
