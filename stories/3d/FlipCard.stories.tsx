import type { Meta, StoryObj } from '@storybook/react';
import { FlipCard } from '../../src/components/3d';

const meta: Meta<typeof FlipCard> = {
  title: 'Components/3D/FlipCard',
  component: FlipCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Flip direction',
    },
    frontColor: {
      control: 'color',
      description: 'Front face color',
    },
    backColor: {
      control: 'color',
      description: 'Back face color',
    },
    width: {
      control: 'number',
      description: 'Card width',
    },
    height: {
      control: 'number',
      description: 'Card height',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FlipCard>;

export const Default: Story = {
  args: {},
};

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    width: 120,
    height: 80,
  },
};

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    width: 120,
    height: 80,
  },
};

export const CustomColors: Story = {
  args: {
    frontColor: '#3b82f6',
    backColor: '#ec4899',
    width: 140,
    height: 90,
  },
};

export const Fast: Story = {
  args: {
    speed: 'fast',
    width: 120,
    height: 80,
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-8">
      <FlipCard width={100} height={70} frontColor="#3b82f6" backColor="#8b5cf6" direction="horizontal" />
      <FlipCard width={100} height={70} frontColor="#10b981" backColor="#f59e0b" direction="vertical" />
      <FlipCard width={100} height={70} frontColor="#ec4899" backColor="#ef4444" />
    </div>
  ),
};
