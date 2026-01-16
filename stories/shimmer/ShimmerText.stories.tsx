import type { Meta, StoryObj } from '@storybook/react';
import { ShimmerText } from '../../src/components/shimmer';

const meta: Meta<typeof ShimmerText> = {
  title: 'Components/Shimmer/ShimmerText',
  component: ShimmerText,
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
      description: 'Width of text lines',
    },
    height: {
      control: 'number',
      description: 'Height of each line',
    },
    lineGap: {
      control: 'number',
      description: 'Gap between lines',
    },
    lastLineWidth: {
      control: 'text',
      description: 'Width of the last line',
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Animation speed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ShimmerText>;

export const Default: Story = {
  args: {
    lines: 3,
    width: 300,
  },
};

export const SingleLine: Story = {
  args: {
    lines: 1,
    width: 200,
  },
};

export const Paragraph: Story = {
  args: {
    lines: 5,
    width: 400,
    lastLineWidth: '60%',
  },
};

export const ThinLines: Story = {
  args: {
    lines: 4,
    width: 300,
    height: 12,
    lineGap: 8,
  },
};

export const ThickLines: Story = {
  args: {
    lines: 3,
    width: 300,
    height: 24,
    lineGap: 16,
  },
};

export const ArticlePreview: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <ShimmerText lines={1} width="70%" height={24} />
      <ShimmerText lines={4} width="100%" height={14} lastLineWidth="80%" />
    </div>
  ),
};
