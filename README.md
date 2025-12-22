# Premium React Loaders

A comprehensive collection of **18 premium, production-ready loading components** for React applications. Built with TypeScript and Tailwind CSS for maximum flexibility and customization.

[![npm version](https://img.shields.io/npm/v/premium-react-loaders.svg)](https://www.npmjs.com/package/premium-react-loaders)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Demo

🚀 **[View Live Demo](https://premium-react-loaders.web.app/)**

See all 18 components in action with interactive examples and customization options.

## Features

- **18 Premium Components** across 4 categories (Skeleton, Spinner, Progress, Pulse)
- **Full TypeScript Support** with exported type definitions
- **Tailwind CSS Integration** for easy customization
- **Tree-shakeable** - only bundle what you use
- **Accessible** - built with ARIA labels and best practices
- **Performant** - hardware-accelerated CSS animations (60fps)
- **Customizable** - multiple ways to style components
- **Zero Dependencies** (except peer dependencies)

## Installation

```bash
npm install premium-react-loaders
```

### Peer Dependencies

This library requires React and Tailwind CSS:

```bash
npm install react react-dom tailwindcss
```

## Setup

### 1. Import Styles

Import the styles in your main entry file (e.g., `main.tsx` or `App.tsx`):

```typescript
import 'premium-react-loaders/styles';
```

### 2. Configure Tailwind

Add the library to your `tailwind.config.js` content array:

```javascript
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/premium-react-loaders/dist/**/*.{js,ts,jsx,tsx}',
  ],
  // ... rest of your config
};
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

      {/* Spinners */}
      <SpinnerCircle size={40} color="#3b82f6" />

      {/* Progress Bars */}
      <ProgressBar value={75} showValue />

      {/* Pulse Loaders */}
      <PulseDots dotCount={3} />
    </div>
  );
}
```

## Component Categories

### Skeleton Loaders (7 components)

Placeholder components that mimic content layout while loading:

- **Skeleton** - Base skeleton component with variants
- **SkeletonText** - Multi-line text placeholder
- **SkeletonAvatar** - Avatar placeholder (circle/square)
- **SkeletonImage** - Image placeholder with aspect ratio
- **SkeletonCard** - Card layout with avatar + text
- **SkeletonList** - List of skeleton items
- **SkeletonTable** - Table skeleton with rows/columns

### Spinner Loaders (5 components)

Rotating and animated spinners:

- **SpinnerCircle** - Basic rotating circle spinner
- **SpinnerRing** - Border-only ring spinner
- **SpinnerDots** - Multiple dots rotating around center
- **SpinnerBars** - Vertical bars with wave animation
- **SpinnerGrid** - Grid of fading squares

### Progress Loaders (3 components)

Progress indicators (determinate/indeterminate):

- **ProgressBar** - Linear horizontal progress bar
- **ProgressCircle** - Circular progress indicator
- **ProgressRing** - Ring progress with gradient option

### Pulse Loaders (3 components)

Bouncing, pulsing, wave animations:

- **PulseDots** - Bouncing dots in sequence
- **PulseWave** - Wave pattern bars
- **PulseBars** - Equalizer-style pulsing bars

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

## Customization

All components support multiple customization methods:

### 1. className Prop

Pass Tailwind utility classes:

```tsx
<SpinnerCircle size={40} className="my-4 mx-auto" />
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

### 4. CSS Variables

Override theme variables globally:

```css
:root {
  --loader-primary: #3b82f6;
  --loader-secondary: #8b5cf6;
  --skeleton-base: #e0e0e0;
  --skeleton-highlight: #f5f5f5;
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
} from 'premium-react-loaders';

const MyComponent: React.FC = () => {
  const skeletonProps: SkeletonProps = {
    width: 200,
    height: 20,
    animate: true,
  };

  return <Skeleton {...skeletonProps} />;
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

## Acknowledgments

Built with:
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vite.dev/)
- [Storybook](https://storybook.js.org/)

---

**Made with ❤️ by Ishan Karunaratne**
