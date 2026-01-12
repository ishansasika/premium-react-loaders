import type { Meta, StoryObj } from '@storybook/react';
import { SuccessCheckmark } from '../../src/components/status';

const meta: Meta<typeof SuccessCheckmark> = {
  title: 'Components/Status/SuccessCheckmark',
  component: SuccessCheckmark,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'number',
      description: 'Size of the checkmark',
    },
    color: {
      control: 'color',
      description: 'Color of the checkmark',
    },
    strokeWidth: {
      control: 'number',
      description: 'Stroke width of the checkmark',
    },
    duration: {
      control: 'number',
      description: 'Animation duration in milliseconds',
    },
    showCircle: {
      control: 'boolean',
      description: 'Show circle background',
    },
    fillCircle: {
      control: 'boolean',
      description: 'Fill the circle background',
    },
    circleColor: {
      control: 'color',
      description: 'Circle background color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SuccessCheckmark>;

export const Default: Story = {
  args: {},
};

export const WithCircle: Story = {
  args: {
    showCircle: true,
    size: 64,
  },
};

export const WithFilledCircle: Story = {
  args: {
    showCircle: true,
    fillCircle: true,
    size: 64,
  },
};

export const Small: Story = {
  args: {
    size: 32,
    showCircle: true,
  },
};

export const Large: Story = {
  args: {
    size: 96,
    showCircle: true,
  },
};

export const CustomColor: Story = {
  args: {
    color: '#22c55e',
    circleColor: '#22c55e',
    showCircle: true,
    size: 64,
  },
};

export const FastAnimation: Story = {
  args: {
    duration: 300,
    showCircle: true,
    size: 64,
  },
};

export const SlowAnimation: Story = {
  args: {
    duration: 1000,
    showCircle: true,
    size: 64,
  },
};

export const ThickStroke: Story = {
  args: {
    strokeWidth: 5,
    showCircle: true,
    size: 64,
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-8">
      <SuccessCheckmark size={48} color="#10b981" showCircle />
      <SuccessCheckmark size={48} color="#22c55e" showCircle fillCircle />
      <SuccessCheckmark size={48} color="#16a34a" showCircle circleColor="#dcfce7" />
    </div>
  ),
};

export const FormSuccess: Story = {
  render: () => (
    <div
      style={{
        padding: '24px',
        backgroundColor: '#f0fdf4',
        border: '1px solid #86efac',
        borderRadius: '8px',
        textAlign: 'center',
      }}
    >
      <SuccessCheckmark size={64} color="#10b981" showCircle />
      <h3 style={{ marginTop: '16px', color: '#166534', fontSize: '18px', fontWeight: '600' }}>
        Success!
      </h3>
      <p style={{ marginTop: '8px', color: '#15803d', fontSize: '14px' }}>
        Your form has been submitted successfully.
      </p>
    </div>
  ),
};
