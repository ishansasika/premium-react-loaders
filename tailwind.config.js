/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './stories/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'skeleton-shimmer': 'skeleton-shimmer 1.5s infinite',
        'spinner-rotate': 'spinner-rotate 1s linear infinite',
        'spinner-rotate-fast': 'spinner-rotate 0.6s linear infinite',
        'spinner-rotate-slow': 'spinner-rotate 1.5s linear infinite',
        'pulse-scale': 'pulse-scale 1.5s ease-in-out infinite',
        'pulse-bounce': 'pulse-bounce 1.4s ease-in-out infinite',
        'progress-indeterminate': 'progress-indeterminate 1.5s ease-in-out infinite',
      },
      keyframes: {
        'skeleton-shimmer': {
          '100%': { transform: 'translateX(100%)' },
        },
        'spinner-rotate': {
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-scale': {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '50%': {
            transform: 'scale(0.5)',
            opacity: '0.5',
          },
        },
        'pulse-bounce': {
          '0%, 80%, 100%': {
            transform: 'scale(0)',
            opacity: '0.5',
          },
          '40%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        'progress-indeterminate': {
          '0%': {
            left: '-40%',
            right: '100%',
          },
          '60%': {
            left: '100%',
            right: '-90%',
          },
          '100%': {
            left: '100%',
            right: '-90%',
          },
        },
      },
      colors: {
        'loader': {
          primary: '#3b82f6',
          secondary: '#8b5cf6',
          skeleton: '#e0e0e0',
          'skeleton-highlight': '#f5f5f5',
        },
      },
    },
  },
  plugins: [],
};
