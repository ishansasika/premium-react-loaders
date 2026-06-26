import type { Meta, StoryObj } from '@storybook/react';
import { InfoIndicator } from '../../src/components/status';

const meta: Meta<typeof InfoIndicator> = {
  title: 'Components/Status/InfoIndicator',
  component: InfoIndicator,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'number', min: 24, max: 120 }, description: 'Icon size in px' },
    color: { control: 'color', description: 'Icon color' },
    animate: { control: 'boolean', description: 'Run draw-in animation' },
    pulse: { control: 'boolean', description: 'Ongoing pulse glow' },
    duration: { control: { type: 'number', min: 200, max: 1500 }, description: 'Animation duration in ms' },
  },
};

export default meta;
type Story = StoryObj<typeof InfoIndicator>;

export const Default: Story = { args: {} };

export const WithPulse: Story = {
  args: { pulse: true },
};

export const Large: Story = {
  args: { size: 80, color: '#0ea5e9' },
};
