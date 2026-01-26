import type { Meta, StoryObj } from '@storybook/react';
import { SmartSkeleton } from '../../src/components/skeleton';

const meta: Meta<typeof SmartSkeleton> = {
  title: 'Components/Skeleton/SmartSkeleton',
  component: SmartSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    contentType: {
      control: 'select',
      options: ['auto', 'text', 'image', 'card', 'list', 'table', 'form'],
      description: 'Content type to mimic',
    },
    itemCount: {
      control: 'number',
      description: 'Number of items (for lists/tables)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SmartSkeleton>;

export const Default: Story = {
  args: {},
};

export const TextContent: Story = {
  args: {
    contentType: 'text',
    itemCount: 4,
  },
};

export const ImageContent: Story = {
  args: {
    contentType: 'image',
    width: 300,
    height: 200,
  },
};

export const CardContent: Story = {
  args: {
    contentType: 'card',
    width: 300,
  },
};

export const ListContent: Story = {
  args: {
    contentType: 'list',
    itemCount: 5,
  },
};

export const TableContent: Story = {
  args: {
    contentType: 'table',
    itemCount: 6,
  },
};

export const FormContent: Story = {
  args: {
    contentType: 'form',
    itemCount: 5,
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Text</h3>
        <SmartSkeleton contentType="text" itemCount={3} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Card</h3>
        <SmartSkeleton contentType="card" width={250} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">List</h3>
        <SmartSkeleton contentType="list" itemCount={3} />
      </div>
    </div>
  ),
};
