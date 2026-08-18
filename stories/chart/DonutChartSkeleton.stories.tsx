import type { Meta, StoryObj } from '@storybook/react';
import { DonutChartSkeleton } from '../../src/components/chart';

const meta: Meta<typeof DonutChartSkeleton> = {
  title: 'Components/Chart/DonutChartSkeleton',
  component: DonutChartSkeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'range', min: 60, max: 240, step: 8 }, description: 'Diameter in px' },
    thickness: { control: { type: 'range', min: 8, max: 40, step: 2 }, description: 'Ring thickness in px' },
    segments: { control: { type: 'range', min: 2, max: 6, step: 1 }, description: 'Number of pie slices' },
    showLabel: { control: 'boolean', description: 'Show placeholder label in the hole' },
    animate: { control: 'boolean', description: 'Enable shimmer animation' },
  },
};

export default meta;
type Story = StoryObj<typeof DonutChartSkeleton>;

export const Default: Story = { args: { segments: 4 } };

export const ThreeSlices: Story = { args: { segments: 3, size: 100 } };

export const NoLabel: Story = { args: { segments: 5, showLabel: false } };
