import type { Meta, StoryObj } from '@storybook/react';
import { BarChartSkeleton } from '../../src/components/chart';

const meta: Meta<typeof BarChartSkeleton> = {
  title: 'Components/Chart/BarChartSkeleton',
  component: BarChartSkeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    bars: { control: { type: 'range', min: 3, max: 12, step: 1 }, description: 'Number of bars' },
    height: { control: { type: 'range', min: 60, max: 240, step: 10 }, description: 'Chart height in px' },
    gap: { control: { type: 'range', min: 0, max: 24, step: 2 }, description: 'Gap between bars' },
    showAxis: { control: 'boolean', description: 'Show baseline axis' },
    animate: { control: 'boolean', description: 'Enable shimmer animation' },
  },
};

export default meta;
type Story = StoryObj<typeof BarChartSkeleton>;

export const Default: Story = { args: { bars: 6 }, render: (args) => <div style={{ width: 280 }}><BarChartSkeleton {...args} /></div> };

export const FewBars: Story = {
  args: { bars: 4, height: 100 },
  render: (args) => <div style={{ width: 220 }}><BarChartSkeleton {...args} /></div>,
};

export const NoAxis: Story = {
  args: { bars: 8, showAxis: false },
  render: (args) => <div style={{ width: 320 }}><BarChartSkeleton {...args} /></div>,
};
