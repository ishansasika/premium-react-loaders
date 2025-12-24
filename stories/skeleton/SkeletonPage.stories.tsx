import type { Meta, StoryObj } from '@storybook/react';
import { SkeletonPage } from '../../src/components/skeleton';

const meta: Meta<typeof SkeletonPage> = {
  title: 'Components/Skeleton/SkeletonPage',
  component: SkeletonPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dashboard', 'article', 'profile'],
      description: 'Page layout variant',
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
type Story = StoryObj<typeof SkeletonPage>;

export const Default: Story = {
  args: {},
};

export const Dashboard: Story = {
  args: {
    variant: 'dashboard',
  },
};

export const Article: Story = {
  args: {
    variant: 'article',
  },
};

export const Profile: Story = {
  args: {
    variant: 'profile',
  },
};

export const NoAnimation: Story = {
  args: {
    animate: false,
  },
};

export const CustomColors: Story = {
  args: {
    baseColor: '#1f2937',
    highlightColor: '#374151',
  },
};
