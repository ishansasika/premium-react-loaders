# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-12-31

### Added

#### New Components
- **SkeletonForm** - Form loading skeleton with configurable fields, labels, and submit button
  - Perfect for checkout flows, login forms, and data entry UIs
  - Customizable field count, label visibility, and button positioning
  - Example: `<SkeletonForm fields={5} showLabels={true} buttonPosition="right" />`

- **SpinnerWave** - Modern ripple/wave spinner with expanding circles
  - Premium aesthetic for high-end designs (Stripe, Airbnb style)
  - Configurable ripple count and maximum scale
  - Example: `<SpinnerWave ripples={3} maxScale={2.5} />`

- **SpinnerPulse** - Heartbeat/pulse spinner for critical operations
  - Creates emotional urgency for important loading states
  - Single or multiple pulse circles with static center
  - Example: `<SpinnerPulse pulses={2} maxScale={1.8} />`

- **ProgressSteps** - Multi-step progress indicator for wizards and workflows
  - Essential for multi-step forms, checkout flows, and guided processes
  - Horizontal and vertical orientations with optional labels
  - Customizable colors for completed, active, and inactive states
  - Example: `<ProgressSteps steps={5} currentStep={2} labels={['Info', 'Review', 'Payment', 'Confirm', 'Done']} />`

- **TypingIndicator** - Chat typing indicator with bounce and fade animations
  - Classic pattern for messaging and chat applications
  - Bounce or fade animation variants
  - Example: `<TypingIndicator variant="bounce" dotCount={3} />`

#### New Animation Keyframes
- `ripple-expand` - Expanding circles with fade for SpinnerWave
- `heartbeat-pulse` - Pulsing scale animation for SpinnerPulse
- `typing-bounce` - Bouncing dots for TypingIndicator
- `typing-fade` - Fading dots for TypingIndicator fade variant

### Changed
- Component count increased from 20 to 25
  - Skeleton: 8 → 9 (+SkeletonForm)
  - Spinner: 5 → 7 (+SpinnerWave, +SpinnerPulse)
  - Progress: 3 → 4 (+ProgressSteps)
  - Pulse: 3 → 4 (+TypingIndicator)
  - Overlay: 1 (unchanged)

### Library
- All new components follow existing architecture patterns
- Full TypeScript support with comprehensive prop types
- WCAG-compliant accessibility features (ARIA labels, role="status")
- CSS-only animations using hardware-accelerated transforms
- Tree-shakeable - import components individually
- Zero breaking changes - fully backward compatible

## [1.0.2] - 2024-12-31

### Added

#### New Features
- **Buffer Progress** - Added `buffer` prop to all progress components (ProgressBar, ProgressCircle, ProgressRing)
  - YouTube-style loading indicator showing both current progress and buffered amount
  - Buffer indicator displayed with 30% opacity behind main progress
  - Works with determinate progress only

- **Gradient Support for ProgressBar** - Added `gradient` prop to ProgressBar component
  - Creates smooth color transitions from primary to secondary color
  - Matches existing gradient functionality in ProgressRing
  - SVG-based gradient implementation for consistent rendering

- **Speed Control for Progress Components** - Added `speed` prop support to all progress components
  - Controls animation speed for indeterminate progress indicators
  - Accepts 'slow', 'normal', 'fast', or custom milliseconds
  - Previously only available in spinner/pulse components

- **Customizable Last Line Width** - Added `lastLineWidth` prop to SkeletonText
  - Control the width of the final skeleton line
  - Defaults to '80%' for natural text appearance
  - Example: `<SkeletonText lines={5} lastLineWidth="60%" />`

- **Secondary Color Support** - Added `secondaryColor` prop usage to SpinnerRing
  - Customize the background ring color
  - Defaults to 'rgba(0, 0, 0, 0.1)' for backward compatibility
  - Example: `<SpinnerRing color="#3b82f6" secondaryColor="#e0e0e0" />`

#### New Utilities
- **Safe Size Parsing** - Added `parseSizeToNumber()` utility function
  - Safely parses size values to numbers with fallback
  - Prevents NaN errors from invalid input like 'auto'
  - Validates positive numbers

- **Color Luminance Calculation** - Added `getColorLuminance()` utility
  - Calculates relative luminance using WCAG formula
  - Supports hex and RGB/RGBA color formats
  - Used for accessible text color selection

- **Contrast Color Selection** - Added `getContrastColor()` utility
  - Automatically selects black or white text based on background luminance
  - Ensures WCAG-compliant color contrast
  - Improves accessibility for progress indicators with `showValue`

### Fixed

#### Critical Bug Fixes
- **Size Parsing Bug** - Fixed `parseInt()` returning NaN for non-numeric size values
  - Affected components: SpinnerDots, SpinnerBars, SpinnerGrid, PulseWave, PulseBars
  - Now safely handles invalid inputs like 'auto' with proper fallbacks
  - Prevents rendering breaks and calculation errors

- **Animation Duration Validation** - Fixed `getAnimationDuration()` accepting invalid values
  - Now validates and clamps numeric speeds to 50ms - 10000ms range
  - Handles NaN, negative values, and invalid inputs gracefully
  - Provides fallback to 'normal' (1000ms) for invalid speed strings

- **Progress Bar Color Contrast** - Fixed poor text visibility in ProgressBar with `showValue`
  - Replaced naive `value > 50` logic with proper luminance calculation
  - Uses WCAG-compliant contrast color selection
  - Ensures readable text on both light and dark progress bars

### Changed

#### API Improvements
- **Standardized Thickness Defaults** - Changed ProgressRing thickness default from 6 to 4
  - Now consistent with ProgressCircle and spinner components
  - Maintains visual consistency across progress indicators
  - **Breaking Change**: May affect existing ProgressRing layouts (minor visual change only)

#### Internal Improvements
- **Improved Type Safety** - All size/thickness parsing now uses type-safe utility functions
- **Memoized Gradient IDs** - ProgressBar and ProgressRing now use `useMemo` for stable gradient IDs
  - Prevents unnecessary re-renders and animation resets
  - More efficient rendering

#### Accessibility Enhancements
- **Better Default ARIA Labels** - Improved contextual aria-label generation
- **Luminance-Based Contrast** - All progress text now uses calculated contrast colors
- **Consistent ARIA Attributes** - All loaders properly implement role="status" or role="progressbar"

### Documentation
- Updated component examples with new prop usage
- Added JSDoc comments for all new utility functions
- Improved type definitions with detailed prop descriptions

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
