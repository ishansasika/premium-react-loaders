import type { Meta, StoryObj } from '@storybook/react';
import { DataTableSkeleton } from '../../src/components/skeleton';

const meta: Meta<typeof DataTableSkeleton> = {
  title: 'Components/Skeleton/DataTableSkeleton',
  component: DataTableSkeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    rows: {
      control: 'number',
      description: 'Number of rows',
    },
    columns: {
      control: 'number',
      description: 'Number of columns',
    },
    showHeader: {
      control: 'boolean',
      description: 'Show header row',
    },
    showSortIndicators: {
      control: 'boolean',
      description: 'Show sorting indicators',
    },
    showFilters: {
      control: 'boolean',
      description: 'Show filter row',
    },
    showPagination: {
      control: 'boolean',
      description: 'Show pagination controls',
    },
    showSelection: {
      control: 'boolean',
      description: 'Show selection checkboxes',
    },
    showActions: {
      control: 'boolean',
      description: 'Show action column',
    },
    striped: {
      control: 'boolean',
      description: 'Striped rows',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTableSkeleton>;

export const Default: Story = {
  args: {},
};

export const WithHeader: Story = {
  args: {
    rows: 8,
    columns: 5,
    showHeader: true,
  },
};

export const WithSorting: Story = {
  args: {
    rows: 6,
    columns: 4,
    showHeader: true,
    showSortIndicators: true,
  },
};

export const WithFilters: Story = {
  args: {
    rows: 5,
    columns: 4,
    showHeader: true,
    showFilters: true,
  },
};

export const WithPagination: Story = {
  args: {
    rows: 10,
    columns: 5,
    showHeader: true,
    showPagination: true,
  },
};

export const WithSelection: Story = {
  args: {
    rows: 7,
    columns: 4,
    showHeader: true,
    showSelection: true,
  },
};

export const WithActions: Story = {
  args: {
    rows: 6,
    columns: 4,
    showHeader: true,
    showActions: true,
  },
};

export const FullFeatured: Story = {
  args: {
    rows: 10,
    columns: 6,
    showHeader: true,
    showSortIndicators: true,
    showFilters: true,
    showPagination: true,
    showSelection: true,
    showActions: true,
    striped: true,
  },
};

export const Striped: Story = {
  args: {
    rows: 8,
    columns: 5,
    showHeader: true,
    striped: true,
  },
};
