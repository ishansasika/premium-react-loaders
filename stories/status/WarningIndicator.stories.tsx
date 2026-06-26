import type { Meta, StoryObj } from '@storybook/react';
import { WarningIndicator } from '../../src/components/status';
import { SuccessCheckmark } from '../../src/components/status';
import { ErrorIndicator } from '../../src/components/status';
import { InfoIndicator } from '../../src/components/status';

const meta: Meta<typeof WarningIndicator> = {
  title: 'Components/Status/WarningIndicator',
  component: WarningIndicator,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'number', min: 24, max: 120 }, description: 'Icon size in px' },
    color: { control: 'color', description: 'Triangle color' },
    animate: { control: 'boolean', description: 'Run draw-in animation' },
    shake: { control: 'boolean', description: 'Shake on appearance' },
    duration: { control: { type: 'number', min: 200, max: 1500 }, description: 'Animation duration in ms' },
  },
};

export default meta;
type Story = StoryObj<typeof WarningIndicator>;

export const Default: Story = { args: {} };

export const WithShake: Story = {
  args: { shake: true },
};

export const Large: Story = {
  args: { size: 80, color: '#ef4444' },
};

export const AllStatus: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <SuccessCheckmark size={48} showCircle />
      <WarningIndicator size={48} />
      <ErrorIndicator size={48} showCircle />
      <InfoIndicator size={48} />
    </div>
  ),
};
