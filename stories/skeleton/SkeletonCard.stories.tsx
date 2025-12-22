import type { Meta, StoryObj } from '@storybook/react';
import { SkeletonCard } from '../../src/components/skeleton';

const meta: Meta<typeof SkeletonCard> = {
  title: 'Components/Skeleton/SkeletonCard',
  component: SkeletonCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    hasAvatar: {
      control: 'boolean',
      description: 'Show avatar',
    },
    titleWidth: {
      control: 'text',
      description: 'Width of the title skeleton',
    },
    lines: {
      control: 'number',
      description: 'Number of description lines',
    },
    avatarSize: {
      control: 'number',
      description: 'Size of the avatar',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonCard>;

export const Default: Story = {
  args: {},
};

export const WithAvatar: Story = {
  args: {
    hasAvatar: true,
    lines: 3,
  },
};

export const WithoutAvatar: Story = {
  args: {
    hasAvatar: false,
    titleWidth: '80%',
    lines: 2,
  },
};

export const LargeAvatar: Story = {
  args: {
    hasAvatar: true,
    avatarSize: 64,
    lines: 3,
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  ),
};
