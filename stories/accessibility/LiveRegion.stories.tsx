import type { Meta, StoryObj } from '@storybook/react';
import { LiveRegion } from '../../src/components/accessibility';
import { useState } from 'react';

const meta: Meta<typeof LiveRegion> = {
  title: 'Components/Accessibility/LiveRegion',
  component: LiveRegion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'Message to announce',
    },
    politeness: {
      control: 'select',
      options: ['polite', 'assertive', 'off'],
      description: 'ARIA live politeness level',
    },
    clearAfter: {
      control: 'number',
      description: 'Auto-clear after (ms)',
    },
    atomic: {
      control: 'boolean',
      description: 'Announce entire region',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LiveRegion>;

export const Default: Story = {
  args: {
    message: 'Loading data...',
  },
};

export const Polite: Story = {
  args: {
    message: 'Loading complete',
    politeness: 'polite',
  },
};

export const Assertive: Story = {
  args: {
    message: 'Error: Failed to load data',
    politeness: 'assertive',
  },
};

export const WithAutoClear: Story = {
  args: {
    message: 'Loading 50% complete',
    clearAfter: 3000,
  },
};

export const Interactive: Story = {
  render: () => {
    const [message, setMessage] = useState('');
    const [progress, setProgress] = useState(0);

    const startLoading = () => {
      setProgress(0);
      setMessage('Loading started');

      const interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + 25;
          if (next <= 100) {
            setMessage(`Loading ${next}% complete`);
            return next;
          }
          clearInterval(interval);
          setMessage('Loading complete!');
          return 100;
        });
      }, 1000);
    };

    return (
      <div className="p-8">
        <LiveRegion message={message} politeness="polite" clearAfter={2000} />
        <div className="text-center">
          <button
            onClick={startLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start Loading
          </button>
          <div className="mt-4 text-sm text-gray-600">
            Current message: "{message}"
          </div>
          <div className="mt-2 text-sm text-gray-500">
            (This message is also announced to screen readers)
          </div>
        </div>
      </div>
    );
  },
};
