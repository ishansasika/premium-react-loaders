import type { Meta, StoryObj } from '@storybook/react';
import { LoadingText } from '../../src/components/text';

const meta: Meta<typeof LoadingText> = {
  title: 'Components/Text/LoadingText',
  component: LoadingText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'The text to display',
    },
    animation: {
      control: 'select',
      options: ['dots', 'fade', 'bounce', 'wave'],
      description: 'Animation style',
    },
    fontSize: {
      control: 'number',
      description: 'Font size',
    },
    fontWeight: {
      control: 'select',
      options: [400, 500, 600, 700],
      description: 'Font weight',
    },
    color: {
      control: 'color',
      description: 'Text color',
    },
    dotCount: {
      control: { type: 'number', min: 1, max: 5 },
      description: 'Number of dots',
    },
    showEllipsis: {
      control: 'boolean',
      description: 'Show ellipsis after text',
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Animation speed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingText>;

export const Default: Story = {
  args: {},
};

export const CustomText: Story = {
  args: {
    text: 'Please wait',
  },
};

export const FadeAnimation: Story = {
  args: {
    animation: 'fade',
  },
};

export const BounceAnimation: Story = {
  args: {
    animation: 'bounce',
  },
};

export const WaveAnimation: Story = {
  args: {
    animation: 'wave',
  },
};

export const LargeText: Story = {
  args: {
    fontSize: 24,
    fontWeight: 600,
  },
};

export const CustomColor: Story = {
  args: {
    color: '#3b82f6',
    fontSize: 18,
  },
};

export const MoreDots: Story = {
  args: {
    dotCount: 5,
  },
};

export const NoEllipsis: Story = {
  args: {
    text: 'Processing',
    showEllipsis: false,
    animation: 'fade',
  },
};

export const AllAnimations: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <LoadingText text="Dots" animation="dots" />
      <LoadingText text="Fade" animation="fade" />
      <LoadingText text="Bounce" animation="bounce" />
      <LoadingText text="Wave" animation="wave" />
    </div>
  ),
};
