import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from '../../src/components/progress';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/Progress/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100)',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate mode',
    },
    showValue: {
      control: 'boolean',
      description: 'Show percentage text',
    },
    height: {
      control: 'text',
      description: 'Height of the progress bar',
    },
    color: {
      control: 'color',
      description: 'Progress color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    value: 75,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithValue: Story = {
  args: {
    value: 65,
    showValue: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const CustomColor: Story = {
  args: {
    value: 80,
    color: '#8b5cf6',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Thick: Story = {
  args: {
    value: 60,
    height: 12,
    showValue: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Multiple: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <ProgressBar value={25} />
      <ProgressBar value={50} />
      <ProgressBar value={75} />
      <ProgressBar value={100} />
    </div>
  ),
};
