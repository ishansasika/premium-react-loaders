import type { Meta, StoryObj } from '@storybook/react';
import { ErrorIndicator } from '../../src/components/status';

const meta: Meta<typeof ErrorIndicator> = {
  title: 'Components/Status/ErrorIndicator',
  component: ErrorIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'number',
      description: 'Size of the error indicator',
    },
    color: {
      control: 'color',
      description: 'Color of the X mark',
    },
    strokeWidth: {
      control: 'number',
      description: 'Stroke width of the X mark',
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
    shake: {
      control: 'boolean',
      description: 'Add shake animation',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorIndicator>;

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

export const WithShake: Story = {
  args: {
    shake: true,
    showCircle: true,
    size: 64,
  },
};

export const WithoutShake: Story = {
  args: {
    shake: false,
    showCircle: true,
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
    color: '#dc2626',
    circleColor: '#dc2626',
    showCircle: true,
    size: 64,
  },
};

export const FastAnimation: Story = {
  args: {
    duration: 300,
    showCircle: true,
    shake: true,
    size: 64,
  },
};

export const SlowAnimation: Story = {
  args: {
    duration: 1000,
    showCircle: true,
    shake: true,
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
      <ErrorIndicator size={48} color="#ef4444" showCircle shake />
      <ErrorIndicator size={48} color="#dc2626" showCircle fillCircle shake />
      <ErrorIndicator size={48} color="#b91c1c" showCircle circleColor="#fee2e2" shake={false} />
    </div>
  ),
};

export const FormError: Story = {
  render: () => (
    <div
      style={{
        padding: '24px',
        backgroundColor: '#fef2f2',
        border: '1px solid #fca5a5',
        borderRadius: '8px',
        textAlign: 'center',
      }}
    >
      <ErrorIndicator size={64} color="#ef4444" showCircle shake />
      <h3 style={{ marginTop: '16px', color: '#991b1b', fontSize: '18px', fontWeight: '600' }}>
        Error!
      </h3>
      <p style={{ marginTop: '8px', color: '#b91c1c', fontSize: '14px' }}>
        Something went wrong. Please try again.
      </p>
    </div>
  ),
};
