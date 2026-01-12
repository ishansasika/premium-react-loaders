# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Premium React Loaders is a TypeScript library providing 28 production-ready loading components for React. The library is published to npm and uses Vite for building, with Storybook for documentation and demos hosted on Firebase.

## Development Commands

### Build & Development
```bash
npm run build              # Build library (TypeScript check + Vite build)
npm run build:watch        # Build in watch mode
npm run type-check         # Run TypeScript compiler without emitting files
npm run dev                # Start Vite dev server
```

### Storybook
```bash
npm run storybook          # Start Storybook dev server on port 6006
npm run build-storybook    # Build static Storybook for deployment
npm run preview-storybook  # Preview built Storybook locally
npm run deploy:storybook   # Build and deploy to Firebase Hosting
```

### Demo App
```bash
npm run demo               # Start demo app dev server on port 3000
npm run demo:build         # Build demo app for production
npm run demo:preview       # Preview built demo app locally
npm run demo:deploy        # Build and deploy demo app to Firebase
npm run deploy:all         # Build and deploy both Storybook and demo app
```

**Note**: The demo app is located in the `demo/` directory and can also be run directly:
```bash
cd demo
npm install                # Install demo dependencies (first time only)
npm run dev                # Start dev server
npm run build              # Build for production
```

### Publishing
```bash
npm run prepublishOnly     # Runs automatically before npm publish (builds library)
```

## Architecture

### Library Structure

The library is organized into 7 main component categories, each in its own directory under `src/components/`:

1. **Skeleton** (`src/components/skeleton/`) - 9 components for placeholder content
   - Base `Skeleton`, `SkeletonText`, `SkeletonAvatar`, `SkeletonImage`, `SkeletonCard`, `SkeletonForm`, `SkeletonList`, `SkeletonTable`, `SkeletonPage`
   - `SkeletonPage` provides pre-built full page layouts (default, dashboard, article, profile)

2. **Spinner** (`src/components/spinner/`) - 7 rotating/animated spinners
   - `SpinnerCircle`, `SpinnerRing`, `SpinnerDots`, `SpinnerBars`, `SpinnerGrid`, `SpinnerWave`, `SpinnerPulse`

3. **Progress** (`src/components/progress/`) - 4 progress indicators
   - `ProgressBar`, `ProgressCircle`, `ProgressRing`, `ProgressSteps`
   - Support both determinate (value-based) and indeterminate modes

4. **Pulse** (`src/components/pulse/`) - 4 pulsing/bouncing loaders
   - `PulseDots`, `PulseWave`, `PulseBars`, `TypingIndicator`

5. **Overlay** (`src/components/overlay/`) - 1 wrapper component
   - `LoaderOverlay` - Displays loaders over content with backdrop (full-screen or container-relative)

6. **Button** (`src/components/button/`) - 1 button loading component (v2.2.0+)
   - `ButtonSpinner` - Compact spinner for button loading states with multiple variants (circle, dots, bars) and positioning options

7. **Status** (`src/components/status/`) - 2 status indicator components (v2.2.0+)
   - `SuccessCheckmark` - Animated checkmark for successful operations with optional circle background
   - `ErrorIndicator` - Animated error indicator with X mark and optional shake effect

### Export Pattern

All components follow a hierarchical export pattern:
- Category index files (`src/components/[category]/index.ts`) export all components in that category
- Main component index (`src/components/index.ts`) re-exports all category exports
- Root index (`src/index.ts`) re-exports components and types, imports global CSS

### Type System

TypeScript types are centralized in `src/types/`:
- `common.ts` - Base interfaces (`BaseLoaderProps`, `SkeletonBaseProps`, `ProgressLoaderProps`)
- Category-specific type files extend base props with component-specific options
- All types are re-exported through `src/types/index.ts`

All loader components extend `BaseLoaderProps` which includes common props:
- `size`, `color`, `secondaryColor`
- `className`, `style` for customization
- `ariaLabel`, `testId` for accessibility/testing
- `visible`, `speed` for behavior control

### Build Configuration

The library uses **Vite in library mode** with specific optimizations:

- **Dual format output**: ESM (`index.js`) and CJS (`index.cjs`)
- **Tree-shaking enabled**: `preserveModules: true` in Rollup options maintains the source structure
- **Type generation**: `vite-plugin-dts` generates `.d.ts` files
- **Path alias**: `@/*` maps to `src/*` (configured in both `vite.config.ts` and `tsconfig.json`)
- **External dependencies**: React, React-DOM are marked external (peer dependencies)
- **No minification**: Consumers handle minification to preserve debugging

### Styling System

- **Tailwind CSS** for utility classes (users must have Tailwind installed)
- **CSS animations** in `src/styles/animations.css` using hardware-accelerated transforms
- **Global styles** imported via `src/styles/index.css` (auto-imported by root index)
- Components use `cn()` utility (from `src/utils/classNames.ts`) to merge class names using `clsx`
- CSS variables for theming (e.g., `--loader-primary`, `--skeleton-base`)

### Storybook Configuration

Stories are in the `stories/` directory (separate from `src/`), organized by component category. Storybook uses the same Vite configuration through `@storybook/react-vite` adapter.

## Key Implementation Details

### Component Patterns

1. **All components are functional components** using TypeScript
2. **Props destructuring** with default values where appropriate
3. **Conditional rendering** based on `visible` prop
4. **CSS-only animations** - no JavaScript animation loops for performance
5. **Accessibility**: ARIA labels and semantic HTML

### Utilities

- `cn()` - Class name merger using `clsx` (no `tailwind-merge` to keep bundle small)
- `getAnimationDuration()` - Converts speed prop to milliseconds
- `normalizeSize()` - Converts size prop to CSS values

### Testing IDs

Components support a `testId` prop for test targeting. When provided, it's applied as `data-testid`.

## Important Constraints

1. **Peer dependencies**: React 18+/19+ and Tailwind CSS 3.4+ are required but not bundled
2. **No runtime dependencies**: Only `clsx` is used internally
3. **Tree-shakeable**: Users can import individual components without bundling unused code
4. **TypeScript strict mode**: All code must pass strict type checking
5. **CSS must be imported**: Users must import `'premium-react-loaders/styles'` in their app
6. **Tailwind content path**: Users must add library path to their Tailwind config content array

## Firebase Deployment

Both Storybook and the demo app are deployed to Firebase Hosting using two separate Firebase projects:

- **Storybook**: https://docs.premium-react-loaders.ishansasika.dev/ (component documentation)
  - Firebase project: `premium-react-loaders`
  - Configuration: Root `firebase.json` and `.firebaserc`
  - Build output: `storybook-static/`

- **Demo App**: https://premium-react-loaders.ishansasika.dev/ (interactive playground)
  - Firebase project: `premium-react-loaders-demo`
  - Configuration: `demo/firebase.json` and `demo/.firebaserc`
  - Build output: `demo/dist/`

### CI/CD with GitHub Actions

Automated deployments are configured via `.github/workflows/deploy.yml`:
- Triggers on push to `main` branch
- Builds both Storybook and demo app
- Deploys both to their respective Firebase projects

**Required Secrets**: Two GitHub repository secrets must be configured:
- `FIREBASE_SERVICE_ACCOUNT_PREMIUM_REACT_LOADERS` (for Storybook)
- `FIREBASE_SERVICE_ACCOUNT_PREMIUM_REACT_LOADERS_DEMO` (for demo app)

See `.github/workflows/README.md` for detailed setup instructions.

## Demo App Architecture

The `demo/` directory contains a standalone React + Vite application that showcases all 20 library components:

**Key Features**:
- Interactive playground with live prop controls (similar to Storybook)
- Component gallery with all 20 components
- Documentation pages
- Code generation with copy-to-clipboard
- Background theme switcher (light/dark/gray)

**Technology Stack**:
- React 19 + TypeScript
- Vite for build tooling
- React Router for navigation
- Tailwind CSS for styling
- prism-react-renderer for syntax highlighting

**Structure**:
- `src/components/` - UI components (layout, playground, controls, common)
- `src/pages/` - Route pages (Home, Playground, Gallery, Documentation)
- `src/data/` - Component metadata and examples
- `src/hooks/` - React hooks (useTheme, useClipboard, useLocalStorage)
- `src/utils/` - Utility functions (code generation, formatters)

**Component Metadata**: All 20 components are defined in `demo/src/data/components.ts` with:
- Default props
- Prop definitions with control types (range, color, select, boolean, text)
- Usage examples
- Import paths

**Library Import**: The demo app imports components directly from `../src` via Vite alias `@lib` for development mode.
