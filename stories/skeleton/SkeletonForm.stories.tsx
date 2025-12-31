import type { Meta, StoryObj } from '@storybook/react';
import { SkeletonForm } from '../../src/components/skeleton/SkeletonForm';

const meta = {
  title: 'Skeleton/SkeletonForm',
  component: SkeletonForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fields: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
      description: 'Number of form fields',
      defaultValue: 3,
    },
    showLabels: {
      control: 'boolean',
      description: 'Show field labels',
      defaultValue: true,
    },
    showButton: {
      control: 'boolean',
      description: 'Show submit button',
      defaultValue: true,
    },
    gap: {
      control: { type: 'range', min: 8, max: 32, step: 4 },
      description: 'Spacing between fields',
      defaultValue: 16,
    },
    buttonWidth: {
      control: 'text',
      description: 'Button width',
      defaultValue: '120px',
    },
    buttonPosition: {
      control: { type: 'select', options: ['left', 'right', 'center'] },
      description: 'Button alignment',
      defaultValue: 'left',
    },
    animate: {
      control: 'boolean',
      description: 'Enable animation',
      defaultValue: true,
    },
    baseColor: {
      control: 'color',
      description: 'Base skeleton color',
    },
    highlightColor: {
      control: 'color',
      description: 'Highlight shimmer color',
    },
    visible: {
      control: 'boolean',
      description: 'Visibility',
      defaultValue: true,
    },
  },
} satisfies Meta<typeof SkeletonForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const ManyFields: Story = {
  args: {
    fields: 5,
  },
};

export const WithoutLabels: Story = {
  args: {
    showLabels: false,
    fields: 4,
  },
};

export const WithoutButton: Story = {
  args: {
    showButton: false,
    fields: 3,
  },
};

export const CustomButtonWidth: Story = {
  args: {
    buttonWidth: '200px',
    fields: 3,
  },
};

export const RightAlignedButton: Story = {
  args: {
    buttonPosition: 'right',
    fields: 3,
  },
};

export const CenteredButton: Story = {
  args: {
    buttonPosition: 'center',
    fields: 3,
  },
};

export const LargeGap: Story = {
  args: {
    gap: 24,
    fields: 3,
  },
};

export const CustomColors: Story = {
  args: {
    baseColor: '#e5e7eb',
    highlightColor: '#f3f4f6',
    fields: 3,
  },
};
