import type { Meta, StoryObj } from '@storybook/react';
import { GradientText } from '../../src/components/gradient';

const meta: Meta<typeof GradientText> = {
  title: 'Components/Gradient/GradientText',
  component: GradientText,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text', description: 'Display text' },
    color: { control: 'color', description: 'Gradient start color' },
    secondaryColor: { control: 'color', description: 'Gradient end color' },
    fontSize: { control: { type: 'number', min: 10, max: 48 }, description: 'Font size in px' },
    speed: { control: 'select', options: ['slow', 'normal', 'fast'], description: 'Flow speed' },
  },
};

export default meta;
type Story = StoryObj<typeof GradientText>;

export const Default: Story = { args: {} };

export const CustomText: Story = {
  args: { text: 'PROCESSING', color: '#f59e0b', secondaryColor: '#ef4444' },
};

export const Large: Story = {
  args: { text: 'WAIT', color: '#10b981', secondaryColor: '#3b82f6', fontSize: 36 },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-center">
      <GradientText text="LOADING" color="#3b82f6" secondaryColor="#ec4899" />
      <GradientText text="PROCESSING" color="#f59e0b" secondaryColor="#ef4444" fontSize={22} />
      <GradientText text="PLEASE WAIT" color="#10b981" secondaryColor="#3b82f6" fontSize={14} speed="slow" />
    </div>
  ),
};
