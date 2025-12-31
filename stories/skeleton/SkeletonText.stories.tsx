import type { Meta, StoryObj } from '@storybook/react';
import { SkeletonText } from '../../src/components/skeleton';

const meta: Meta<typeof SkeletonText> = {
  title: 'Components/Skeleton/SkeletonText',
  component: SkeletonText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    lines: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of text lines',
    },
    width: {
      control: 'text',
      description: 'Width of each line',
    },
    height: {
      control: 'text',
      description: 'Height of each line',
    },
    gap: {
      control: 'text',
      description: 'Gap between lines',
    },
    lastLineWidth: {
      control: 'text',
      description: 'Width of the last line (defaults to 80%)',
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
type Story = StoryObj<typeof SkeletonText>;

export const Default: Story = {
  args: {
    lines: 3,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ManyLines: Story = {
  args: {
    lines: 5,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const CustomLastLineWidth: Story = {
  args: {
    lines: 4,
    lastLineWidth: '60%',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const CustomGap: Story = {
  args: {
    lines: 3,
    gap: '1rem',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const NoAnimation: Story = {
  args: {
    lines: 3,
    animate: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const CustomColors: Story = {
  args: {
    lines: 3,
    baseColor: '#dbeafe',
    highlightColor: '#f0f9ff',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};
