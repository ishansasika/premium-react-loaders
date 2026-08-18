# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Premium React Loaders is a TypeScript library providing 70+ production-ready loading components for React, organized into 21 categories. It has **zero runtime dependencies** and does **not require Tailwind CSS** (Tailwind was removed in v2.0.0 — the library ships its own custom CSS). The library is published to npm and uses Vite for building, with Storybook for documentation and a separate demo app, both hosted on Firebase.

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
The demo app is a separate npm project (its own `package.json`, own devDependencies including Tailwind CSS and clsx for the demo UI itself — this does **not** apply to the library, which is Tailwind-free).

### Publishing
```bash
npm run prepublishOnly     # Runs automatically before npm publish (builds library)
```

## Git Conventions

### Commit Format
```
feat: Add <ComponentName> component
feat: Add <description>
fix: Fix <description>
docs: Update <description>
```

- One component per commit where possible
- Use lowercase after the prefix
- Keep messages concise and descriptive

### Branch Naming
```
release/v{version}-{short-description}
```
Example: `release/v4.1.0-neon-status-particle`

### Important Rules
- **Never add `Co-Authored-By: Claude` lines** to any commit messages or PR descriptions
- **Never include AI attribution** in commits, PRs, or any git history

## Architecture

### Library Structure

The library is organized into 21 component categories, each in its own directory under `src/components/`:

1. **Skeleton** (`src/components/skeleton/`) - 11 components for placeholder content
   - `Skeleton`, `SkeletonText`, `SkeletonAvatar`, `SkeletonImage`, `SkeletonCard`, `SkeletonForm`, `SkeletonList`, `SkeletonTable`, `SkeletonPage`, `SmartSkeleton`, `DataTableSkeleton`
   - `SkeletonPage` provides pre-built full page layouts (default, dashboard, article, profile)

2. **Spinner** (`src/components/spinner/`) - 7 rotating/animated spinners
   - `SpinnerCircle`, `SpinnerRing`, `SpinnerDots`, `SpinnerBars`, `SpinnerGrid`, `SpinnerWave`, `SpinnerPulse`

3. **Progress** (`src/components/progress/`) - 4 progress indicators
   - `ProgressBar`, `ProgressCircle`, `ProgressRing`, `ProgressSteps`
   - Support both determinate (value-based) and indeterminate modes, plus an `onComplete` callback fired at 100%

4. **Pulse** (`src/components/pulse/`) - 4 pulsing/bouncing loaders
   - `PulseDots`, `PulseWave`, `PulseBars`, `TypingIndicator`

5. **Overlay** (`src/components/overlay/`) - 1 wrapper component
   - `LoaderOverlay` - Displays loaders over content with backdrop (full-screen or container-relative)

6. **Button** (`src/components/button/`) - 1 button loading component
   - `ButtonSpinner` - Compact spinner for button loading states with multiple variants (circle, dots, bars) and positioning options

7. **Status** (`src/components/status/`) - 4 status indicator components
   - `SuccessCheckmark`, `ErrorIndicator`, `WarningIndicator`, `InfoIndicator`

8. **Transition** (`src/components/transition/`) - 1 transition component
   - `LoaderTransition` - Smooth transitions between loading and loaded states (fade, slide-up, slide-down, slide-left, slide-right, scale)

9. **Shimmer** (`src/components/shimmer/`) - 3 shimmer components
   - `ShimmerBox`, `ShimmerText`, `ShimmerButton`

10. **Orbit** (`src/components/orbit/`) - 3 orbital animations
    - `OrbitDots`, `OrbitRings`, `AtomLoader`

11. **Bounce** (`src/components/bounce/`) - 2 bouncing loaders
    - `BouncingDots`, `BouncingBalls`

12. **Infinity** (`src/components/infinity/`) - 2 infinity loaders
    - `InfinityLoader`, `MobiusLoader`

13. **Text** (`src/components/text/`) - 1 text loader
    - `LoadingText` - Animated loading text with multiple animation styles

14. **3D** (`src/components/3d/`) - 5 immersive 3D loaders
    - `CubeSpinner`, `FlipCard`, `PlaneRotate`, `Helix`, `PerspectiveRing`

15. **Smart** (`src/components/smart/`) - 1 intelligent component
    - `FormFieldLoader` - Loading states for form inputs (text, select, checkbox, radio, textarea, file)

16. **Accessibility** (`src/components/accessibility/`) - 1 accessibility component
    - `LiveRegion` - ARIA live region for screen reader announcements

17. **Gradient** (`src/components/gradient/`) - 5 gradient loaders (v4.0.0+/v4.2.0+)
    - `GradientSpinner` - Animated conic gradient spinner
    - `GradientBar` - Flowing gradient progress bar
    - `GradientRing` - Rotating gradient ring
    - `GradientText` - Gradient-filled loading text via `background-clip: text` (v4.2.0)
    - `GradientDots` - Bouncing dots sharing an animated gradient fill (v4.2.0)

18. **Morph** (`src/components/morph/`) - 3 fluid/organic loaders (v4.0.0+)
    - `MorphBlob` - Organic blob shape morphing
    - `LiquidFill` - Liquid fill animation
    - `WaveCircle` - Wave-distorted circle

19. **Particle** (`src/components/particle/`) - 4 particle-based loaders (v4.0.0+/v4.1.0+)
    - `ParticleBurst`, `ParticleOrbit` (v4.0.0), `ParticleTrail`, `ParticleField` (v4.1.0 ambient effects)

20. **Neon** (`src/components/neon/`) - 5 glowing neon-style loaders (v4.1.0+/v4.2.0+)
    - `NeonSpinner`, `NeonPulse`, `NeonText` - designed for dark UIs
    - `NeonProgress` - Neon-glow progress bar, determinate/indeterminate with `onComplete` (v4.2.0)
    - `NeonDots` - Bouncing dots with a glowing neon box-shadow (v4.2.0)

21. **Chart** (`src/components/chart/`) - 3 chart skeleton loaders (v4.2.0+)
    - `BarChartSkeleton`, `LineChartSkeleton`, `DonutChartSkeleton` - dashboard chart placeholders

### Theme Context

`src/context/ThemeContext.tsx` provides `ThemeProvider` and `useTheme` (exported at the root as `ThemeProvider`/`useTheme`, not from `src/hooks/`). Wrapping the app in `ThemeProvider` with a `LoaderTheme` config (primary/secondary color, default size/speed/delay/minDuration/transition, motion preference) supplies defaults that individual components fall back to unless overridden by props.

### Hooks

The library provides 5 hooks for loading state management in `src/hooks/`:

1. **useLoader** - Basic loading state with delay, minDuration, and autoHide
2. **useEnhancedLoader** - Advanced loading with retry logic, success/error states, and history
3. **useLoadingOrchestrator** - Manage multiple loading tasks with dependencies
4. **useLoadingAnalytics** - Track loading performance metrics
5. **useSmartLoader** - Intelligent loader with connection detection and progress estimation

(`useTheme` is a related but separate export — see Theme Context above.)

### Export Pattern

All components follow a hierarchical export pattern:
- Category index files (`src/components/[category]/index.ts`) export all components in that category
- Main component index (`src/components/index.ts`) re-exports all category exports
- Root index (`src/index.ts`) re-exports components, types, the theme context, hooks, and the `cn`/`getAnimationDuration`/`normalizeSize` utilities, and imports global CSS

### Type System

TypeScript types are centralized in `src/types/`, with one file per component category (e.g. `spinner.ts`, `gradient.ts`, `neon.ts`) plus:
- `common.ts` - Base interfaces (`BaseLoaderProps`, `SizePreset`/`SIZE_PRESET_MAP`, etc.)
- `hooks.ts` - Shared hook option/return types
- All types are re-exported through `src/types/index.ts`

All loader components extend `BaseLoaderProps` which includes common props:
- `size` (preset, number, or CSS string), `color`, `secondaryColor`
- `className`, `style` for customization
- `ariaLabel` for accessibility, plus standard `data-testid`-style test targeting via a `testId` prop on individual components
- `visible`, `speed`, `reverse` for behavior control
- `respectMotionPreference`, `delay`, `minDuration`, `transition` for loading UX

### Build Configuration

The library uses **Vite in library mode** with specific optimizations:

- **Dual format output**: ESM (`index.js`) and CJS (`index.cjs`)
- **Tree-shaking enabled**: `preserveModules: true` in Rollup options maintains the source structure
- **Type generation**: `vite-plugin-dts` generates `.d.ts` files
- **Path alias**: `@/*` maps to `src/*` (configured in both `vite.config.ts` and `tsconfig.json`)
- **External dependencies**: React, React-DOM are marked external (peer dependencies)
- **No minification**: Consumers handle minification to preserve debugging

### Styling System

- **No Tailwind CSS** - since v2.0.0 the library ships plain, hand-authored CSS; consumers need no Tailwind setup or content-path configuration
- CSS lives in `src/styles/`: `animations.css` (hardware-accelerated keyframe animations), `components.css`, `utilities.css`, and `index.css` (aggregator, auto-imported by root `src/index.ts`)
- Consumers must import `'premium-react-loaders/styles'` once in their app entry
- Components use the local `cn()` utility (`src/utils/classNames.ts`) to merge class names — a small dependency-free reimplementation, not `clsx`
- CSS variables drive theming (e.g. `--loader-primary`, `--skeleton-base`), and `prefers-reduced-motion` is respected via `useReducedMotion`/`respectMotionPreference`

### Storybook Configuration

Stories are in the `stories/` directory (separate from `src/`), organized by component category. Storybook uses the same Vite configuration through `@storybook/react-vite` adapter.

## Key Implementation Details

### Component Patterns

1. **All components are functional components** using TypeScript, most wrapped in `forwardRef`
2. **Props destructuring** with default values where appropriate
3. **Conditional rendering** based on `visible` prop
4. **CSS-only animations** - no JavaScript animation loops for performance
5. **Accessibility**: ARIA labels and semantic HTML

### Utilities (`src/utils/`)

- `classNames.ts` - `cn()`, a dependency-free class name merger
- `colors.ts` - `getAnimationDuration()` (converts `speed` prop to ms) and `normalizeSize()` (converts `size` prop to CSS values), plus `getEffectiveDuration`
- `hooks.ts` - shared internal hooks like `useReducedMotion` and `useLoaderVisibility` (delay/minDuration handling)
- `accessibility.ts` - accessibility helpers

### Testing IDs

Components support a `testId` prop for test targeting. When provided, it's applied as `data-testid`.

## Important Constraints

1. **Peer dependencies**: only React 18+/19+ (`react`, `react-dom`) are required — no Tailwind CSS
2. **Zero runtime dependencies**: the library bundles no third-party runtime code
3. **Tree-shakeable**: Users can import individual components without bundling unused code
4. **TypeScript strict mode**: All code must pass strict type checking
5. **CSS must be imported**: Users must import `'premium-react-loaders/styles'` in their app

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

The `demo/` directory contains a standalone React + Vite application (its own npm project, its own dependencies) that showcases all library components. Unlike the library itself, **the demo app does use Tailwind CSS and clsx** for its own UI — this is isolated to `demo/` and does not affect the library's Tailwind-free status.

**Key Features**:
- Interactive playground with live prop controls (similar to Storybook)
- Component gallery with all components
- Documentation pages
- Code generation with copy-to-clipboard
- Background theme switcher (light/dark/gray)

**Technology Stack**:
- React 19 + TypeScript
- Vite for build tooling
- React Router for navigation
- Tailwind CSS for the demo's own styling
- prism-react-renderer for syntax highlighting

**Structure**:
- `src/components/` - UI components (layout, playground, controls, common)
- `src/pages/` - Route pages (Home, Playground, Gallery, Documentation)
- `src/data/` - Component metadata and examples
- `src/hooks/` - React hooks (useTheme, useClipboard, useLocalStorage)
- `src/utils/` - Utility functions (code generation, formatters)
- `src/contexts/` - Demo-local React context
- `scripts/generate-sitemap.ts` / `scripts/generate-assets.js` - run as part of `demo`'s build (`prebuild`) and asset generation

**Component Metadata**: Components are defined in `demo/src/data/components.ts` with:
- Default props
- Prop definitions with control types (range, color, select, boolean, text)
- Usage examples
- Import paths

**Library Import**: The demo app imports components directly from `../src` via Vite alias `@lib` for development mode.
