import type { Meta } from '@storybook/react';
import { useEnhancedLoader } from '../../src/hooks';
import { SpinnerCircle, SuccessCheckmark, ErrorIndicator } from '../../src/components';

const meta: Meta = {
  title: 'Hooks/useEnhancedLoader',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const BasicUsage = () => {
  const { status, startLoading, stopLoading, setError, isVisible } = useEnhancedLoader({
    delay: 200,
    minDuration: 600,
  });

  const handleLoad = () => {
    startLoading();
    setTimeout(() => {
      stopLoading();
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      <button
        onClick={handleLoad}
        style={{
          padding: '10px 20px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Start Loading
      </button>
      <div style={{ minHeight: 60, display: 'flex', alignItems: 'center' }}>
        {status === 'loading' && <SpinnerCircle visible={isVisible} size={48} />}
        {status === 'success' && <SuccessCheckmark visible={true} showCircle size={48} />}
      </div>
      <div>Status: <strong>{status}</strong></div>
    </div>
  );
};

export const WithRetry = () => {
  const {
    status,
    error,
    retryAttempt,
    startLoading,
    stopLoading,
    setError: setErrorState,
    retry,
    isVisible,
  } = useEnhancedLoader({
    delay: 200,
    minDuration: 600,
    retry: {
      maxRetries: 3,
      initialDelay: 1000,
      backoffMultiplier: 2,
    },
    onSuccess: () => console.log('Success!'),
    onError: (err) => console.error('Error:', err),
  });

  const handleLoadSuccess = () => {
    startLoading();
    setTimeout(() => {
      stopLoading();
    }, 2000);
  };

  const handleLoadError = () => {
    startLoading();
    setTimeout(() => {
      setErrorState(new Error('Failed to load data'));
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={handleLoadSuccess}
          style={{
            padding: '10px 20px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Load Success
        </button>
        <button
          onClick={handleLoadError}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Load Error
        </button>
        {error && (
          <button
            onClick={retry}
            style={{
              padding: '10px 20px',
              backgroundColor: '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Retry
          </button>
        )}
      </div>

      <div style={{ minHeight: 60, display: 'flex', alignItems: 'center' }}>
        {status === 'loading' && <SpinnerCircle visible={isVisible} size={48} />}
        {status === 'success' && <SuccessCheckmark visible={true} showCircle size={48} />}
        {status === 'error' && <ErrorIndicator visible={true} showCircle shake size={48} />}
      </div>

      <div style={{ textAlign: 'center' }}>
        <div>Status: <strong>{status}</strong></div>
        {retryAttempt > 0 && <div>Retry Attempt: <strong>{retryAttempt}</strong></div>}
        {error && <div style={{ color: '#ef4444', marginTop: '8px' }}>{error.message}</div>}
      </div>
    </div>
  );
};

export const WithHistory = () => {
  const {
    status,
    history,
    startLoading,
    stopLoading,
    setError: setErrorState,
    clearHistory,
    isVisible,
  } = useEnhancedLoader({
    delay: 100,
    minDuration: 500,
  });

  const handleLoadSuccess = () => {
    startLoading();
    setTimeout(() => {
      stopLoading();
    }, Math.random() * 2000 + 500);
  };

  const handleLoadError = () => {
    startLoading();
    setTimeout(() => {
      setErrorState(new Error('Random error occurred'));
    }, Math.random() * 2000 + 500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', minWidth: 400 }}>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={handleLoadSuccess}
          style={{
            padding: '8px 16px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Load Success
        </button>
        <button
          onClick={handleLoadError}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Load Error
        </button>
        <button
          onClick={clearHistory}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Clear History
        </button>
      </div>

      <div style={{ minHeight: 50, display: 'flex', alignItems: 'center' }}>
        {status === 'loading' && <SpinnerCircle visible={isVisible} size={40} />}
        {status === 'success' && <SuccessCheckmark visible={true} showCircle size={40} />}
        {status === 'error' && <ErrorIndicator visible={true} showCircle size={40} />}
      </div>

      <div style={{ width: '100%', marginTop: '16px' }}>
        <h4 style={{ margin: '0 0 12px 0' }}>Loading History ({history.length})</h4>
        <div style={{ maxHeight: 200, overflowY: 'auto', backgroundColor: '#f3f4f6', borderRadius: '6px', padding: '12px' }}>
          {history.length === 0 ? (
            <div style={{ color: '#6b7280', textAlign: 'center' }}>No history yet</div>
          ) : (
            history.map((entry, index) => (
              <div
                key={index}
                style={{
                  padding: '8px',
                  marginBottom: '8px',
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  borderLeft: `4px solid ${
                    entry.status === 'success' ? '#10b981' : entry.status === 'error' ? '#ef4444' : '#6b7280'
                  }`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <strong>{entry.status.toUpperCase()}</strong>
                  <span>{entry.duration}ms</span>
                </div>
                {entry.error && (
                  <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>
                    {entry.error.message}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export const WithDebounce = () => {
  const { status, startLoading, stopLoading, isVisible } = useEnhancedLoader({
    debounce: 500,
    minDuration: 600,
  });

  const handleSearch = () => {
    startLoading();
    setTimeout(() => {
      stopLoading();
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
          Click rapidly - loading only starts after 500ms pause
        </p>
      </div>
      <button
        onClick={handleSearch}
        style={{
          padding: '10px 20px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Search (Debounced)
      </button>
      <div style={{ minHeight: 60, display: 'flex', alignItems: 'center' }}>
        {status === 'loading' && <SpinnerCircle visible={isVisible} size={48} />}
        {status === 'success' && <SuccessCheckmark visible={true} showCircle size={48} />}
      </div>
      <div>Status: <strong>{status}</strong></div>
    </div>
  );
};
