import type { Meta, StoryObj } from '@storybook/react';
import { ShimmerButton } from '../../src/components/shimmer';

const meta: Meta<typeof ShimmerButton> = {
  title: 'Components/Shimmer/ShimmerButton',
  component: ShimmerButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'number',
      description: 'Width of the button',
    },
    height: {
      control: 'number',
      description: 'Height of the button',
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline'],
      description: 'Button variant',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show icon placeholder',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Icon position',
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Animation speed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ShimmerButton>;

export const Default: Story = {
  args: {
    width: 120,
    height: 40,
  },
};

export const WithIcon: Story = {
  args: {
    width: 140,
    height: 40,
    showIcon: true,
    iconPosition: 'left',
  },
};

export const IconRight: Story = {
  args: {
    width: 140,
    height: 40,
    showIcon: true,
    iconPosition: 'right',
  },
};

export const Outline: Story = {
  args: {
    width: 120,
    height: 40,
    variant: 'outline',
  },
};

export const Large: Story = {
  args: {
    width: 180,
    height: 52,
    showIcon: true,
  },
};

export const ButtonGroup: Story = {
  render: () => (
    <div className="flex gap-3">
      <ShimmerButton width={100} height={36} />
      <ShimmerButton width={100} height={36} variant="outline" />
      <ShimmerButton width={120} height={36} showIcon />
    </div>
  ),
};
