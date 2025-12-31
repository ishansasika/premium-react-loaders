import type { Meta, StoryObj } from '@storybook/react';
import { ProgressSteps } from '../../src/components/progress/ProgressSteps';

const meta = {
  title: 'Progress/ProgressSteps',
  component: ProgressSteps,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    steps: {
      control: { type: 'range', min: 2, max: 10, step: 1 },
      description: 'Total number of steps',
      defaultValue: 4,
    },
    currentStep: {
      control: { type: 'range', min: 0, max: 9, step: 1 },
      description: 'Current active step (0-indexed)',
      defaultValue: 1,
    },
    showNumbers: {
      control: 'boolean',
      description: 'Show step numbers',
      defaultValue: true,
    },
    orientation: {
      control: { type: 'select', options: ['horizontal', 'vertical'] },
      description: 'Layout orientation',
      defaultValue: 'horizontal',
    },
    connector: {
      control: { type: 'select', options: ['line', 'none'] },
      description: 'Connector style',
      defaultValue: 'line',
    },
    color: {
      control: 'color',
      description: 'Primary color',
      defaultValue: '#3b82f6',
    },
    completedColor: {
      control: 'color',
      description: 'Color for completed steps',
    },
    activeColor: {
      control: 'color',
      description: 'Color for active step',
    },
    inactiveColor: {
      control: 'color',
      description: 'Color for inactive steps',
      defaultValue: '#e0e0e0',
    },
    visible: {
      control: 'boolean',
      description: 'Visibility',
      defaultValue: true,
    },
  },
} satisfies Meta<typeof ProgressSteps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    steps: 4,
    currentStep: 1,
  },
};

export const WithLabels: Story = {
  args: {
    steps: 5,
    currentStep: 2,
    labels: ['Personal Info', 'Address', 'Payment', 'Review', 'Confirm'],
  },
};

export const VerticalOrientation: Story = {
  args: {
    steps: 4,
    currentStep: 1,
    orientation: 'vertical',
    labels: ['Start', 'Processing', 'Review', 'Complete'],
  },
};

export const ManySteps: Story = {
  args: {
    steps: 7,
    currentStep: 3,
  },
};

export const WithoutConnectors: Story = {
  args: {
    steps: 4,
    currentStep: 2,
    connector: 'none',
  },
};

export const CustomColors: Story = {
  args: {
    steps: 5,
    currentStep: 2,
    completedColor: '#10b981',
    activeColor: '#3b82f6',
    inactiveColor: '#d1d5db',
  },
};

export const AllStepsCompleted: Story = {
  args: {
    steps: 4,
    currentStep: 3,
    labels: ['Info', 'Review', 'Payment', 'Done'],
  },
};

export const FirstStep: Story = {
  args: {
    steps: 5,
    currentStep: 0,
    labels: ['Start', 'Process', 'Review', 'Confirm', 'Complete'],
  },
};

export const WithoutNumbers: Story = {
  args: {
    steps: 4,
    currentStep: 1,
    showNumbers: false,
    labels: ['Personal', 'Address', 'Payment', 'Review'],
  },
};

export const VerticalWithoutConnector: Story = {
  args: {
    steps: 4,
    currentStep: 2,
    orientation: 'vertical',
    connector: 'none',
    labels: ['Upload', 'Process', 'Review', 'Complete'],
  },
};
