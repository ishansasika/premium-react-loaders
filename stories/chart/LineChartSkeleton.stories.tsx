import type { Meta, StoryObj } from '@storybook/react';
import { LineChartSkeleton } from '../../src/components/chart';

const meta: Meta<typeof LineChartSkeleton> = {
  title: 'Components/Chart/LineChartSkeleton',
  component: LineChartSkeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    width: { control: { type: 'range', min: 120, max: 400, step: 20 }, description: 'Chart width in px' },
    height: { control: { type: 'range', min: 60, max: 240, step: 10 }, description: 'Chart height in px' },
    points: { control: { type: 'range', min: 3, max: 10, step: 1 }, description: 'Number of data points' },
    showGrid: { control: 'boolean', description: 'Show background grid lines' },
    strokeWidth: { control: { type: 'range', min: 1, max: 6, step: 1 }, description: 'Line stroke width' },
    animate: { control: 'boolean', description: 'Enable flowing dash animation' },
  },
};

export default meta;
type Story = StoryObj<typeof LineChartSkeleton>;

export const Default: Story = { args: {} };

export const NoGrid: Story = { args: { showGrid: false } };

export const Dense: Story = { args: { points: 9, width: 320 } };
