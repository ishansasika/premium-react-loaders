import type { Meta, StoryObj } from '@storybook/react';
import { ButtonSpinner } from '../../src/components/button';

const meta: Meta<typeof ButtonSpinner> = {
  title: 'Components/Button/ButtonSpinner',
  component: ButtonSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'number',
      description: 'Size of the spinner',
    },
    color: {
      control: 'color',
      description: 'Color of the spinner',
    },
    variant: {
      control: 'select',
      options: ['circle', 'dots', 'bars'],
      description: 'Visual variant of the spinner',
    },
    position: {
      control: 'select',
      options: ['left', 'right', 'center'],
      description: 'Position relative to content',
    },
    showContent: {
      control: 'boolean',
      description: 'Whether to show content when loading',
    },
    gap: {
      control: 'number',
      description: 'Gap between spinner and content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonSpinner>;

export const Default: Story = {
  args: {
    children: 'Loading...',
  },
};

export const CircleVariant: Story = {
  args: {
    variant: 'circle',
    children: 'Submit',
    size: 16,
  },
};

export const DotsVariant: Story = {
  args: {
    variant: 'dots',
    children: 'Processing',
    size: 16,
  },
};

export const BarsVariant: Story = {
  args: {
    variant: 'bars',
    children: 'Loading',
    size: 16,
  },
};

export const SpinnerRight: Story = {
  args: {
    position: 'right',
    children: 'Next',
    size: 16,
  },
};

export const SpinnerCenter: Story = {
  args: {
    position: 'center',
    children: 'Loading...',
    size: 20,
  },
};

export const HideContent: Story = {
  args: {
    showContent: false,
    children: 'Click Me',
    size: 20,
  },
};

export const InsideButton: Story = {
  render: () => (
    <button
      style={{
        padding: '10px 20px',
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
      }}
    >
      <ButtonSpinner variant="circle" size={16} color="white">
        Submit Form
      </ButtonSpinner>
    </button>
  ),
};

export const MultipleStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '500',
        }}
      >
        <ButtonSpinner variant="circle" size={16} color="white">
          Circle Spinner
        </ButtonSpinner>
      </button>
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#8b5cf6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '500',
        }}
      >
        <ButtonSpinner variant="dots" size={16} color="white" dotCount={3}>
          Dots Spinner
        </ButtonSpinner>
      </button>
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#ec4899',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '500',
        }}
      >
        <ButtonSpinner variant="bars" size={16} color="white" barCount={3}>
          Bars Spinner
        </ButtonSpinner>
      </button>
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <button
        style={{
          padding: '6px 12px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '500',
        }}
      >
        <ButtonSpinner size={12} color="white">Small</ButtonSpinner>
      </button>
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '500',
        }}
      >
        <ButtonSpinner size={16} color="white">Medium</ButtonSpinner>
      </button>
      <button
        style={{
          padding: '14px 28px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '500',
        }}
      >
        <ButtonSpinner size={20} color="white">Large</ButtonSpinner>
      </button>
    </div>
  ),
};
