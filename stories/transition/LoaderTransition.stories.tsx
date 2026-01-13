import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LoaderTransition } from '../../src/components/transition';
import { Skeleton, SpinnerCircle, ProgressBar } from '../../src/components';

const meta: Meta<typeof LoaderTransition> = {
  title: 'Components/Transition/LoaderTransition',
  component: LoaderTransition,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    transitionType: {
      control: 'select',
      options: ['fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'scale', 'none'],
      description: 'Type of transition animation',
    },
    duration: {
      control: 'number',
      description: 'Duration of transition in milliseconds',
    },
    timing: {
      control: 'select',
      options: ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear', 'spring'],
      description: 'Timing function for the transition',
    },
    keepMounted: {
      control: 'boolean',
      description: 'Keep loading content mounted',
    },
    exitDelay: {
      control: 'number',
      description: 'Delay before starting transition out',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoaderTransition>;

const InteractiveWrapper = ({ children }: { children: (loading: boolean, toggle: () => void) => React.ReactNode }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col gap-4 items-center">
      <button
        onClick={() => setLoading(!loading)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Stop Loading' : 'Start Loading'}
      </button>
      {children(loading, () => setLoading(!loading))}
    </div>
  );
};

export const FadeTransition: Story = {
  render: () => (
    <InteractiveWrapper>
      {(loading) => (
        <LoaderTransition
          loading={loading}
          loadingContent={<Skeleton width={300} height={100} />}
          transitionType="fade"
          duration={300}
        >
          <div style={{ width: 300, height: 100, backgroundColor: '#e0e0e0', borderRadius: '8px', padding: '20px' }}>
            <h3 style={{ margin: 0, marginBottom: '8px' }}>Content Loaded!</h3>
            <p style={{ margin: 0 }}>This is the actual content that appears after loading.</p>
          </div>
        </LoaderTransition>
      )}
    </InteractiveWrapper>
  ),
};

export const SlideUp: Story = {
  render: () => (
    <InteractiveWrapper>
      {(loading) => (
        <LoaderTransition
          loading={loading}
          loadingContent={<SpinnerCircle size={48} />}
          transitionType="slide-up"
          duration={400}
          timing="ease-out"
        >
          <div style={{ width: 300, padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
            <h3>Loaded Content</h3>
            <p>Slides up smoothly from below</p>
          </div>
        </LoaderTransition>
      )}
    </InteractiveWrapper>
  ),
};

export const SlideDown: Story = {
  render: () => (
    <InteractiveWrapper>
      {(loading) => (
        <LoaderTransition
          loading={loading}
          loadingContent={<ProgressBar indeterminate />}
          transitionType="slide-down"
          duration={400}
        >
          <div style={{ width: 300, padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
            <h3>Data Loaded</h3>
            <p>Slides down from above</p>
          </div>
        </LoaderTransition>
      )}
    </InteractiveWrapper>
  ),
};

export const ScaleTransition: Story = {
  render: () => (
    <InteractiveWrapper>
      {(loading) => (
        <LoaderTransition
          loading={loading}
          loadingContent={<SpinnerCircle size={56} />}
          transitionType="scale"
          duration={350}
          timing="spring"
        >
          <div style={{ width: 300, padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
            <h3>Success!</h3>
            <p>Scales in with spring animation</p>
          </div>
        </LoaderTransition>
      )}
    </InteractiveWrapper>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <InteractiveWrapper>
      {(loading) => (
        <LoaderTransition
          loading={loading}
          loadingContent={<Skeleton width={300} height={100} />}
          transitionType="fade"
          duration={300}
          delay={500}
        >
          <div style={{ width: 300, height: 100, backgroundColor: '#e0e0e0', borderRadius: '8px', padding: '20px' }}>
            <h3 style={{ margin: 0 }}>With 500ms Delay</h3>
            <p style={{ margin: 0, fontSize: '14px' }}>Skeleton only appears if loading takes more than 500ms</p>
          </div>
        </LoaderTransition>
      )}
    </InteractiveWrapper>
  ),
};

export const WithMinDuration: Story = {
  render: () => (
    <InteractiveWrapper>
      {(loading) => (
        <LoaderTransition
          loading={loading}
          loadingContent={<SpinnerCircle size={48} />}
          transitionType="fade"
          duration={300}
          minDuration={1000}
        >
          <div style={{ width: 300, padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
            <h3>Minimum Duration</h3>
            <p>Loader shows for at least 1 second</p>
          </div>
        </LoaderTransition>
      )}
    </InteractiveWrapper>
  ),
};

export const MultipleTransitions: Story = {
  render: () => (
    <InteractiveWrapper>
      {(loading) => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          <LoaderTransition
            loading={loading}
            loadingContent={<Skeleton width={200} height={80} />}
            transitionType="fade"
            duration={300}
          >
            <div style={{ width: 200, height: 80, backgroundColor: '#dbeafe', borderRadius: '8px', padding: '16px' }}>
              <strong>Fade</strong>
            </div>
          </LoaderTransition>

          <LoaderTransition
            loading={loading}
            loadingContent={<SpinnerCircle size={40} />}
            transitionType="slide-up"
            duration={400}
          >
            <div style={{ width: 200, height: 80, backgroundColor: '#fce7f3', borderRadius: '8px', padding: '16px' }}>
              <strong>Slide Up</strong>
            </div>
          </LoaderTransition>

          <LoaderTransition
            loading={loading}
            loadingContent={<ProgressBar indeterminate />}
            transitionType="scale"
            duration={350}
          >
            <div style={{ width: 200, height: 80, backgroundColor: '#dcfce7', borderRadius: '8px', padding: '16px' }}>
              <strong>Scale</strong>
            </div>
          </LoaderTransition>

          <LoaderTransition
            loading={loading}
            loadingContent={<SpinnerCircle size={40} color="#8b5cf6" />}
            transitionType="slide-left"
            duration={400}
          >
            <div style={{ width: 200, height: 80, backgroundColor: '#fef3c7', borderRadius: '8px', padding: '16px' }}>
              <strong>Slide Left</strong>
            </div>
          </LoaderTransition>
        </div>
      )}
    </InteractiveWrapper>
  ),
};
