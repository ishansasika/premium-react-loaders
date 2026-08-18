import type { Meta, StoryObj } from '@storybook/react';
import { GradientDots } from '../../src/components/gradient';

const meta: Meta<typeof GradientDots> = {
  title: 'Components/Gradient/GradientDots',
  component: GradientDots,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    dotCount: { control: { type: 'range', min: 2, max: 8, step: 1 }, description: 'Number of dots' },
    dotSize: { control: { type: 'range', min: 4, max: 24, step: 1 }, description: 'Dot diameter in px' },
    color: { control: 'color', description: 'Gradient start color' },
    secondaryColor: { control: 'color', description: 'Gradient end color' },
    speed: { control: 'select', options: ['slow', 'normal', 'fast'], description: 'Bounce speed' },
  },
};

export default meta;
type Story = StoryObj<typeof GradientDots>;

export const Default: Story = { args: {} };

export const FiveDots: Story = {
  args: { dotCount: 5, dotSize: 14, color: '#f59e0b', secondaryColor: '#ef4444' },
};

export const Reverse: Story = {
  args: { color: '#10b981', secondaryColor: '#3b82f6', reverse: true },
};
