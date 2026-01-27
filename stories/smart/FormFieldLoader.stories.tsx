import type { Meta, StoryObj } from '@storybook/react';
import { FormFieldLoader } from '../../src/components/smart';

const meta: Meta<typeof FormFieldLoader> = {
  title: 'Components/Smart/FormFieldLoader',
  component: FormFieldLoader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    fieldType: {
      control: 'select',
      options: ['text', 'select', 'checkbox', 'radio', 'textarea', 'file'],
      description: 'Field type',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show label skeleton',
    },
    showValidation: {
      control: 'boolean',
      description: 'Show validation message',
    },
    showRequired: {
      control: 'boolean',
      description: 'Show required indicator',
    },
    showHelperText: {
      control: 'boolean',
      description: 'Show helper text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormFieldLoader>;

export const Default: Story = {
  args: {},
};

export const TextInput: Story = {
  args: {
    fieldType: 'text',
    showLabel: true,
    showRequired: true,
  },
};

export const SelectInput: Story = {
  args: {
    fieldType: 'select',
    showLabel: true,
  },
};

export const TextareaInput: Story = {
  args: {
    fieldType: 'textarea',
    showLabel: true,
    fieldHeight: 120,
  },
};

export const CheckboxInput: Story = {
  args: {
    fieldType: 'checkbox',
  },
};

export const RadioInput: Story = {
  args: {
    fieldType: 'radio',
  },
};

export const FileInput: Story = {
  args: {
    fieldType: 'file',
    showLabel: true,
  },
};

export const WithValidation: Story = {
  args: {
    fieldType: 'text',
    showLabel: true,
    showValidation: true,
    showRequired: true,
  },
};

export const WithHelperText: Story = {
  args: {
    fieldType: 'text',
    showLabel: true,
    showHelperText: true,
  },
};

export const CompleteForm: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <FormFieldLoader fieldType="text" showLabel showRequired />
      <FormFieldLoader fieldType="text" showLabel showHelperText />
      <FormFieldLoader fieldType="select" showLabel />
      <FormFieldLoader fieldType="textarea" showLabel fieldHeight={100} />
      <FormFieldLoader fieldType="checkbox" />
      <FormFieldLoader fieldType="file" showLabel />
    </div>
  ),
};
