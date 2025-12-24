# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2024-12-24

### Added

#### New Components (2)
- **LoaderOverlay** - Wrapper component for displaying loaders over content with customizable backdrop
  - Support for both full-screen (`fixed`) and container-relative (`absolute`) positioning
  - Customizable backdrop color, opacity, and blur effect
  - Accepts any loader component as a child
  - Configurable z-index for layering control
  - Loading state toggle for showing/hiding overlay
- **SkeletonPage** - Pre-built full page skeleton layouts for common page types
  - 4 layout variants: `default`, `dashboard`, `article`, `profile`
  - Default variant: Generic page with header, navigation, and content sections
  - Dashboard variant: Stats cards, chart area, and data table
  - Article variant: Hero image, author info, and content blocks
  - Profile variant: User header, sidebar, and activity feed
  - Fully customizable animation and colors

#### Features
- Added new **Overlay** component category (5 categories total: Skeleton, Spinner, Progress, Pulse, Overlay)
- Expanded Skeleton category from 7 to 8 components
- Total component count increased from 18 to 20

### Documentation
- Added live demo site at https://premium-react-loaders.ishansasika.dev/
- Added Storybook documentation at https://docs.premium-react-loaders.ishansasika.dev/
- Updated README.md with new component examples and usage guides
- Added "New in v1.0.1" section with code examples
- Created Storybook stories for LoaderOverlay and SkeletonPage
- Updated CLAUDE.md with new architecture details

### Infrastructure
- Set up GitHub Actions CI/CD for automated Firebase deployments
- Configured multi-project Firebase hosting (separate Storybook and demo sites)
- Added deployment workflow documentation in `.github/workflows/README.md`
- Integrated both new components into demo app with full prop controls and examples

## [1.0.0] - 2024-12-22

### Added

#### Skeleton Loaders (7 components)
- **Skeleton** - Base skeleton component with multiple variants (text, circular, rectangular, rounded)
- **SkeletonText** - Multi-line text placeholder with customizable line count and spacing
- **SkeletonAvatar** - Avatar placeholder supporting circle and square shapes
- **SkeletonImage** - Image placeholder with aspect ratio support
- **SkeletonCard** - Composite card layout with optional avatar and text lines
- **SkeletonList** - List skeleton with customizable item count and height
- **SkeletonTable** - Table skeleton with rows, columns, and optional header

#### Spinner Loaders (5 components)
- **SpinnerCircle** - Classic rotating circle spinner with arc
- **SpinnerRing** - Border-only ring spinner with transparent center
- **SpinnerDots** - Multiple dots rotating around a center point
- **SpinnerBars** - Vertical bars with wave animation
- **SpinnerGrid** - Grid of fading squares (3x3 or customizable)

#### Progress Loaders (3 components)
- **ProgressBar** - Linear horizontal progress bar (determinate/indeterminate)
- **ProgressCircle** - SVG-based circular progress indicator
- **ProgressRing** - Ring-style progress with optional gradient colors

#### Pulse Loaders (3 components)
- **PulseDots** - Bouncing dots with scale and fade animation
- **PulseWave** - Wave pattern with staggered bar animation
- **PulseBars** - Equalizer-style pulsing bars

#### Features
- Full TypeScript support with comprehensive type definitions
- Tailwind CSS integration for easy customization
- Tree-shakeable ESM and CJS builds
- Accessible components with ARIA labels
- Hardware-accelerated CSS animations (60fps)
- Zero runtime dependencies
- Support for React 18.x and 19.x
- Multiple customization methods (className, style, color props, CSS variables)
- Storybook documentation with interactive examples
- Comprehensive README with usage examples

#### Infrastructure
- Vite build system with library mode
- Dual ESM/CJS output for maximum compatibility
- Automated TypeScript declaration generation
- PostCSS with Tailwind CSS and Autoprefixer
- Storybook 8.x with React-Vite framework

### Documentation
- Comprehensive README with installation, setup, and usage guides
- API documentation for all component props
- TypeScript usage examples
- Storybook stories for all components
- Introduction and customization guides

## Future Releases

### Planned Features
- Additional loader variants
- Dark mode optimization
- Animation customization presets
- More composite components
- Unit tests with Vitest
- E2E tests with Playwright
