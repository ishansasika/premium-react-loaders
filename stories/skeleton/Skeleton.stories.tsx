import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../../src/components/skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'text',
      description: 'Width of the skeleton',
    },
    height: {
      control: 'text',
      description: 'Height of the skeleton',
    },
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'rounded'],
      description: 'Shape variant of the skeleton',
    },
    animate: {
      control: 'boolean',
      description: 'Enable shimmer animation',
    },
    baseColor: {
      control: 'color',
      description: 'Base background color',
    },
    highlightColor: {
      control: 'color',
      description: 'Shimmer highlight color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    width: 200,
    height: 20,
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    width: 300,
    height: 16,
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 60,
    height: 60,
  },
};

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    width: 200,
    height: 120,
  },
};

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: 300,
    height: 200,
  },
};

export const NoAnimation: Story = {
  args: {
    width: 200,
    height: 20,
    animate: false,
  },
};

export const CustomColors: Story = {
  args: {
    width: 200,
    height: 20,
    baseColor: '#d1d5db',
    highlightColor: '#f3f4f6',
  },
};
