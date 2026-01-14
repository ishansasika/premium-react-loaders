# Premium React Loaders

A comprehensive collection of **29 premium, production-ready loading components** for React applications. Built with TypeScript and custom CSS for maximum flexibility and zero configuration.

[![npm version](https://img.shields.io/npm/v/premium-react-loaders.svg)](https://www.npmjs.com/package/premium-react-loaders)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Demo

🚀 **[Interactive Demo](https://premium-react-loaders.ishansasika.dev/)** - Playground with live controls and component customization

📚 **[Storybook Documentation](https://docs.premium-react-loaders.ishansasika.dev/)** - Detailed component documentation and examples

See all 29 components in action with interactive examples and customization options.

## Features

- **29 Premium Components** across 8 categories (Skeleton, Spinner, Progress, Pulse, Overlay, Button, Status, Transition)
- **Global Theming** - ThemeProvider for app-wide customization ✨ *New in v2.1.0*
- **Smart Loading UX** - useLoader hook with delay, minDuration, and autoHide ✨ *New in v2.1.0*
- **Enhanced CSS Variables** - Comprehensive theming with dark mode support ✨ *New in v2.1.0*
- **Zero Configuration** - No Tailwind or build setup required ✨ *New in v2.0.0*
- **Tiny Bundle Size** - 70% smaller CSS (6.27 KB → 1.64 KB gzipped) ✨ *New in v2.0.0*
- **Zero Runtime Dependencies** - No external dependencies needed ✨ *New in v2.0.0*
- **Size Presets** - Easy sizing with `xs`, `sm`, `md`, `lg`, `xl` presets
- **Reduced Motion Support** - Respects `prefers-reduced-motion` for accessibility
- **Animation Direction Control** - Reverse animations with `reverse` prop
- **Full TypeScript Support** with exported type definitions
- **Tree-shakeable** - only bundle what you use
- **Accessible** - built with ARIA labels and best practices
- **Performant** - hardware-accelerated CSS animations (60fps)
- **Customizable** - multiple ways to style components

## Installation

```bash
npm install premium-react-loaders
```

### Peer Dependencies

This library only requires React:

```bash
npm install react react-dom
```

> **Note:** v2.0.0+ no longer requires Tailwind CSS! See [Migration Guide](#migrating-from-v1x-to-v20) below.

## Setup

Import the styles in your main entry file (e.g., `main.tsx` or `App.tsx`):

```typescript
import 'premium-react-loaders/styles';
```

That's it! No Tailwind configuration or additional setup needed.

### Optional: Global Theming (v2.1.0+)

Wrap your app with `ThemeProvider` to customize all loaders globally:

```tsx
import { ThemeProvider } from 'premium-react-loaders';

function App() {
  return (
    <ThemeProvider
      theme={{
        primaryColor: '#8b5cf6',
        secondaryColor: '#ec4899',
        defaultSize: 'lg',
        defaultSpeed: 'fast',
      }}
    >
      <YourApp />
    </ThemeProvider>
  );
}
```

## Quick Start

```tsx
import {
  Skeleton,
  SkeletonCard,
  SpinnerCircle,
  ProgressBar,
  PulseDots,
} from 'premium-react-loaders';

function App() {
  return (
    <div>
      {/* Skeleton Loaders */}
      <Skeleton width={200} height={20} />
      <SkeletonCard hasAvatar lines={3} />

      {/* Spinners with Size Presets (v1.2.0+) */}
      <SpinnerCircle size="lg" color="#3b82f6" />
      <SpinnerCircle size="md" reverse /> {/* Reverse animation */}

      {/* Progress Bars */}
      <ProgressBar value={75} showValue />
      <ProgressBar indeterminate reverse /> {/* Reverse sweep */}

      {/* Pulse Loaders */}
      <PulseDots size="sm" dotCount={3} />
    </div>
  );
}
```

## Component Categories

### Skeleton Loaders (9 components)

Placeholder components that mimic content layout while loading:

- **Skeleton** - Base skeleton component with variants
- **SkeletonText** - Multi-line text placeholder
- **SkeletonAvatar** - Avatar placeholder (circle/square)
- **SkeletonImage** - Image placeholder with aspect ratio
- **SkeletonCard** - Card layout with avatar + text
- **SkeletonForm** - Form skeleton with inputs and labels
- **SkeletonList** - List of skeleton items
- **SkeletonTable** - Table skeleton with rows/columns
- **SkeletonPage** - Pre-built full page layouts (default, dashboard, article, profile)

### Spinner Loaders (7 components)

Rotating and animated spinners:

- **SpinnerCircle** - Basic rotating circle spinner
- **SpinnerRing** - Border-only ring spinner
- **SpinnerDots** - Multiple dots rotating around center
- **SpinnerBars** - Vertical bars with wave animation
- **SpinnerGrid** - Grid of fading squares
- **SpinnerPulse** - Pulsing circle spinner
- **SpinnerWave** - Wave pattern spinner

### Progress Loaders (4 components)

Progress indicators (determinate/indeterminate):

- **ProgressBar** - Linear horizontal progress bar
- **ProgressCircle** - Circular progress indicator
- **ProgressRing** - Ring progress with gradient option
- **ProgressSteps** - Multi-step progress indicator

### Pulse Loaders (4 components)

Bouncing, pulsing, wave animations:

- **PulseDots** - Bouncing dots in sequence
- **PulseWave** - Wave pattern bars
- **PulseBars** - Equalizer-style pulsing bars
- **TypingIndicator** - Typing animation indicator

### Overlay Components (1 component)

Wrapper component for displaying loaders over content:

- **LoaderOverlay** - Displays any loader over content with backdrop (full-screen or container-relative)

### Button Components (1 component) ✨ *New in v2.2.0*

Specialized loaders for button loading states:

- **ButtonSpinner** - Compact spinner optimized for buttons with multiple variants (circle, dots, bars) and positioning options

### Status Components (2 components) ✨ *New in v2.2.0*

Animated indicators for success and error states:

- **SuccessCheckmark** - Animated checkmark with optional circle background
- **ErrorIndicator** - Animated X mark with optional shake effect and circle background

## Usage Examples

### Skeleton Components

```tsx
import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
} from 'premium-react-loaders';

// Basic skeleton
<Skeleton width={200} height={20} />

// Multi-line text
<SkeletonText lines={3} width="100%" />

// Avatar
<SkeletonAvatar size={48} shape="circle" />

// Card with avatar and text
<SkeletonCard hasAvatar lines={3} />

// Custom colors
<Skeleton
  width={200}
  height={20}
  baseColor="#e0e0e0"
  highlightColor="#f5f5f5"
/>
```

### Spinner Components

```tsx
import {
  SpinnerCircle,
  SpinnerRing,
  SpinnerDots,
} from 'premium-react-loaders';

// Basic spinner
<SpinnerCircle size={40} color="#3b82f6" />

// Ring spinner
<SpinnerRing size={32} thickness={4} />

// Dots spinner
<SpinnerDots size={40} dotCount={8} />

// Speed control
<SpinnerCircle size={40} speed="fast" />
```

### Progress Components

```tsx
import {
  ProgressBar,
  ProgressCircle,
  ProgressRing,
} from 'premium-react-loaders';

// Determinate progress
<ProgressBar value={75} showValue />

// Indeterminate progress
<ProgressBar indeterminate />

// Circular progress
<ProgressCircle value={60} showValue size={80} />

// Ring with gradient
<ProgressRing
  value={80}
  gradient
  color="#3b82f6"
  secondaryColor="#8b5cf6"
/>
```

### Pulse Components

```tsx
import { PulseDots, PulseWave, PulseBars } from 'premium-react-loaders';

// Bouncing dots
<PulseDots dotCount={3} color="#3b82f6" />

// Wave pattern
<PulseWave barCount={5} />

// Equalizer bars
<PulseBars barCount={4} speed="fast" />
```

### New in v1.0.1

```tsx
import { LoaderOverlay, SkeletonPage, SpinnerCircle } from 'premium-react-loaders';

// Page skeleton for full page loading
<SkeletonPage variant="dashboard" />
<SkeletonPage variant="article" />
<SkeletonPage variant="profile" />

// Loader overlay over content
<LoaderOverlay
  loading={isLoading}
  loader={<SpinnerCircle size={50} />}
  blur
>
  <YourContent />
</LoaderOverlay>

// Full-screen overlay with custom backdrop
<LoaderOverlay
  loading={isLoading}
  loader={<SpinnerCircle />}
  position="fixed"
  backdropOpacity={0.8}
  backdropColor="#000000"
>
  <YourApp />
</LoaderOverlay>
```

### New in v1.2.0

**Size Presets** - Use semantic size names instead of pixel values:

```tsx
import { SpinnerCircle, ProgressBar, PulseDots } from 'premium-react-loaders';

// Size presets: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
<SpinnerCircle size="xs" />  {/* 16px */}
<SpinnerCircle size="sm" />  {/* 24px */}
<SpinnerCircle size="md" />  {/* 40px - default */}
<SpinnerCircle size="lg" />  {/* 56px */}
<SpinnerCircle size="xl" />  {/* 72px */}

// Still works with numbers and CSS strings
<SpinnerCircle size={50} />
<SpinnerCircle size="3rem" />
```

**Reduced Motion Support** - Automatically respects user accessibility preferences:

```tsx
// Respects prefers-reduced-motion by default
<SpinnerCircle size="md" />

// Disable reduced motion support if needed
<SpinnerCircle size="md" respectMotionPreference={false} />
```

**Animation Direction Control** - Reverse animations for creative effects:

```tsx
import { SpinnerCircle, ProgressBar, PulseDots } from 'premium-react-loaders';

// Reverse spinner rotation (counter-clockwise)
<SpinnerCircle size="lg" reverse />

// Reverse progress sweep direction
<ProgressBar indeterminate reverse />

// Reverse pulse/dot animation sequence
<PulseDots size="md" reverse />
```

### New in v2.3.0

**LoaderTransition** - Smooth transitions between loading and loaded states:

```tsx
import { LoaderTransition, Skeleton } from 'premium-react-loaders';

// Eliminate jarring content switches
<LoaderTransition
  loading={isLoading}
  loadingContent={<Skeleton width={300} height={100} />}
  transitionType="fade"
  duration={300}
  delay={200}
  minDuration={600}
>
  <YourActualContent />
</LoaderTransition>

// Different transition types
<LoaderTransition loading={isLoading} loadingContent={<Spinner />} transitionType="slide-up">
  <Content />
</LoaderTransition>

<LoaderTransition loading={isLoading} loadingContent={<Skeleton />} transitionType="scale" timing="spring">
  <Content />
</LoaderTransition>
```

**useEnhancedLoader** - Supercharged loading state management:

```tsx
import { useEnhancedLoader } from 'premium-react-loaders';

function MyComponent() {
  const {
    status,              // 'idle' | 'loading' | 'success' | 'error'
    error,               // Error object if failed
    retryAttempt,        // Current retry attempt number
    history,             // Loading history with timestamps
    startLoading,
    stopLoading,
    setError,
    retry,
    reset,
  } = useEnhancedLoader({
    delay: 200,
    minDuration: 600,
    retry: {
      maxRetries: 3,
      initialDelay: 1000,
      backoffMultiplier: 2,
    },
    debounce: 300,       // Debounce loading starts
    onSuccess: () => console.log('Success!'),
    onError: (err) => console.error(err),
  });

  const fetchData = async () => {
    startLoading();
    try {
      const data = await api.fetch();
      stopLoading();
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div>
      {status === 'loading' && <SpinnerCircle visible={isVisible} />}
      {status === 'success' && <SuccessCheckmark visible />}
      {status === 'error' && (
        <>
          <ErrorIndicator visible />
          <button onClick={retry}>Retry ({retryAttempt}/3)</button>
        </>
      )}
    </div>
  );
}
```

### New in v2.2.0

**Button Loaders** - Specialized spinners for button states:

```tsx
import { ButtonSpinner } from 'premium-react-loaders';

// Inside a button
<button style={{ padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white' }}>
  <ButtonSpinner variant="circle" size={16} color="white">
    Submit Form
  </ButtonSpinner>
</button>

// Different variants
<ButtonSpinner variant="dots" position="right">Next</ButtonSpinner>
<ButtonSpinner variant="bars" showContent={false}>Loading</ButtonSpinner>
```

**Status Indicators** - Show success and error states with smooth animations:

```tsx
import { SuccessCheckmark, ErrorIndicator } from 'premium-react-loaders';

// Success state
<SuccessCheckmark
  visible={isSuccess}
  showCircle
  fillCircle
  size={64}
  color="#10b981"
/>

// Error state with shake
<ErrorIndicator
  visible={hasError}
  showCircle
  shake
  size={64}
  color="#ef4444"
/>
```

### New in v2.1.0

**Global Theming** - Customize all loaders from one place:

```tsx
import { ThemeProvider } from 'premium-react-loaders';

function App() {
  return (
    <ThemeProvider
      theme={{
        primaryColor: '#8b5cf6',
        secondaryColor: '#ec4899',
        skeletonBase: '#e2e8f0',
        skeletonHighlight: '#f1f5f9',
        defaultSize: 'lg',
        defaultSpeed: 'fast',
        defaultDelay: 200,
        defaultMinDuration: 600,
        respectMotionPreference: true,
      }}
    >
      {/* All loaders inherit these settings */}
      <SpinnerCircle /> {/* Uses theme colors and size */}
      <Skeleton /> {/* Uses theme skeleton colors */}
    </ThemeProvider>
  );
}
```

**Smart Loading State Management** - Better UX with the `useLoader` hook:

```tsx
import { useLoader } from 'premium-react-loaders';
import { SpinnerCircle } from 'premium-react-loaders';

function MyComponent() {
  const { loading, startLoading, stopLoading, isVisible } = useLoader({
    delay: 200,        // Don't show loader for quick operations (<200ms)
    minDuration: 600,  // Show loader for at least 600ms to avoid flashing
    autoHide: 5000,    // Auto-hide after 5 seconds (optional)
  });

  const fetchData = async () => {
    startLoading();
    try {
      await api.fetchData();
    } finally {
      stopLoading();
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Load Data</button>
      <SpinnerCircle visible={isVisible} />
    </div>
  );
}
```

**Enhanced CSS Variables** - More control with comprehensive theming:

```css
:root {
  /* Colors */
  --loader-primary: #3b82f6;
  --loader-secondary: #8b5cf6;
  --skeleton-base: #e5e7eb;
  --skeleton-highlight: #f5f5f5;

  /* Sizes */
  --loader-size-xs: 16px;
  --loader-size-sm: 24px;
  --loader-size-md: 40px;
  --loader-size-lg: 56px;
  --loader-size-xl: 72px;

  /* Animation */
  --loader-transition-fast: 150ms;
  --loader-transition-normal: 300ms;
  --loader-transition-slow: 500ms;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --skeleton-base: #2d3748;
    --skeleton-highlight: #4a5568;
  }
}
```

**Improved TypingIndicator** - Smoother animations with dynamic timing that scales with speed settings.

## Customization

All components support multiple customization methods:

### 1. className Prop

Pass custom CSS classes:

```tsx
<SpinnerCircle size={40} className="my-spinner" />
```

### 2. style Prop

Use inline CSS styles:

```tsx
<ProgressBar value={75} style={{ opacity: 0.8, margin: '20px 0' }} />
```

### 3. Color Props

Direct color control:

```tsx
<SpinnerCircle color="#8b5cf6" secondaryColor="#e0e0e0" />
```

### 4. CSS Variables (Enhanced in v2.1.0)

Override theme variables globally for comprehensive customization:

```css
:root {
  /* Primary colors */
  --loader-primary: #3b82f6;
  --loader-secondary: #8b5cf6;

  /* Skeleton colors */
  --skeleton-base: #e5e7eb;
  --skeleton-highlight: #f5f5f5;

  /* Size presets */
  --loader-size-xs: 16px;
  --loader-size-sm: 24px;
  --loader-size-md: 40px;
  --loader-size-lg: 56px;
  --loader-size-xl: 72px;

  /* Spacing and layout */
  --loader-gap: 0.5rem;
  --loader-radius-sm: 0.25rem;
  --loader-radius-md: 0.5rem;
  --loader-radius-lg: 1rem;
  --loader-radius-full: 9999px;

  /* Animation speeds */
  --loader-transition-fast: 150ms;
  --loader-transition-normal: 300ms;
  --loader-transition-slow: 500ms;

  /* Overlay */
  --loader-overlay-backdrop: rgba(0, 0, 0, 0.5);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --skeleton-base: #2d3748;
    --skeleton-highlight: #4a5568;
  }
}
```

### 5. ThemeProvider (v2.1.0+)

Use the `ThemeProvider` component for runtime theming:

```tsx
import { ThemeProvider, useTheme } from 'premium-react-loaders';

function App() {
  return (
    <ThemeProvider
      theme={{
        primaryColor: '#8b5cf6',
        secondaryColor: '#ec4899',
        defaultSize: 'lg',
      }}
    >
      <YourComponents />
    </ThemeProvider>
  );
}

// Access theme in child components
function ChildComponent() {
  const { theme } = useTheme();
  return <SpinnerCircle />; // Automatically uses theme settings
}
```

## TypeScript

Full TypeScript support with exported types:

```typescript
import type {
  SkeletonProps,
  SpinnerCircleProps,
  ProgressBarProps,
  PulseDotsProps,
  LoaderTheme,
  UseLoaderOptions,
  UseLoaderReturn,
} from 'premium-react-loaders';

const MyComponent: React.FC = () => {
  const skeletonProps: SkeletonProps = {
    width: 200,
    height: 20,
    animate: true,
  };

  return <Skeleton {...skeletonProps} />;
};

// Theme typing (v2.1.0+)
const customTheme: LoaderTheme = {
  primaryColor: '#8b5cf6',
  secondaryColor: '#ec4899',
  defaultSize: 'lg',
  defaultSpeed: 'fast',
};

// useLoader hook typing (v2.1.0+)
const loaderOptions: UseLoaderOptions = {
  delay: 200,
  minDuration: 600,
  autoHide: 5000,
};
```

## Common Props

All loader components share these common props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number \| string` | varies | Size of the loader |
| `color` | `string` | `#3b82f6` | Primary color |
| `className` | `string` | - | Custom CSS class |
| `style` | `CSSProperties` | - | Inline styles |
| `visible` | `boolean` | `true` | Show/hide loader |
| `speed` | `'slow' \| 'normal' \| 'fast' \| number` | `'normal'` | Animation speed |
| `testId` | `string` | - | Test ID for testing |
| `ariaLabel` | `string` | - | Accessibility label |

## Component-Specific Props

### Skeleton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number \| string` | `100%` | Width of skeleton |
| `height` | `number \| string` | `1rem` | Height of skeleton |
| `variant` | `'text' \| 'circular' \| 'rectangular' \| 'rounded'` | `'text'` | Shape variant |
| `animate` | `boolean` | `true` | Enable shimmer animation |
| `baseColor` | `string` | `#e0e0e0` | Background color |
| `highlightColor` | `string` | `#f5f5f5` | Shimmer color |

### Progress Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Progress value (0-100) |
| `indeterminate` | `boolean` | `false` | Indeterminate mode |
| `showValue` | `boolean` | `false` | Show percentage text |
| `thickness` | `number \| string` | varies | Thickness of indicator |

## Performance

All components are optimized for performance:

- **CSS Animations** - No JavaScript animations, pure CSS
- **Hardware Acceleration** - Uses `transform` and `opacity` for 60fps
- **Tree-shakeable** - Only bundle components you import
- **Minimal Bundle Size** - Lightweight with no dependencies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Storybook

Explore all components interactively in Storybook:

```bash
npm run storybook
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT © Ishan Karunaratne

## Migrating from v1.x to v2.0

v2.0.0 removes the Tailwind CSS dependency for a simpler, lighter library. Here's what changed:

### Breaking Changes

1. **No Tailwind Required** - The library now uses custom CSS instead of Tailwind
2. **No Tailwind Configuration Needed** - Remove the library path from your `tailwind.config.js`
3. **Slightly Different Styling** - Components use the same class names but with custom CSS utilities

### Migration Steps

1. **Update the package:**
   ```bash
   npm install premium-react-loaders@latest
   ```

2. **Remove Tailwind configuration** (if you're not using Tailwind for other parts of your app):
   ```javascript
   // Remove this from tailwind.config.js
   './node_modules/premium-react-loaders/dist/**/*.{js,ts,jsx,tsx}'
   ```

3. **That's it!** Your components will continue to work with the same API. The styling is now self-contained.

### What Stayed the Same

- ✅ All component APIs are identical
- ✅ All props work exactly the same
- ✅ TypeScript types unchanged
- ✅ Same import paths
- ✅ Same customization options (className, style, color props)

### Benefits of v2.0

- 🎉 **70% smaller CSS bundle** (21KB → 6.27KB, 1.64KB gzipped)
- 🎉 **36% smaller total package** (1.0MB → 640KB)
- 🎉 **Zero configuration** - no Tailwind setup required
- 🎉 **Works in any React project** - not just Tailwind projects
- 🎉 **Faster installation** - fewer dependencies to download

## Acknowledgments

Built with:
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Storybook](https://storybook.js.org/)

---

**Made with ❤️ by Ishan Karunaratne**
