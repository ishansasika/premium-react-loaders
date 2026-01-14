# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.3.1] - 2025-01-14

### Added
- **useEnhancedLoader**: Added `toggleLoading()` function for toggling loading state
- **useEnhancedLoader**: Added `setLoading(boolean)` function for direct state control
- These additions make useEnhancedLoader API-consistent with the basic useLoader hook

### Fixed
- **Documentation**: Updated component count from 28 to 29 across all documentation
- **Documentation**: Updated category count from 7 to 8 across all documentation
- **Storybook Introduction**: Added missing Transition category section

## [2.3.0] - 2025-01-13

### Added

#### Transition Component (New Category)
- **LoaderTransition Component** - Smooth transitions between loading and loaded states
  - Eliminates jarring content switches with smooth animations
  - Six transition types: `fade`, `slide-up`, `slide-down`, `slide-left`, `slide-right`, `scale`
  - Six timing functions: `ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear`, `spring`
  - Customizable duration and exit delay
  - Built-in delay and minDuration for optimal UX (prevents flash on fast loads)
  - Optional keepMounted for better animation performance
  - Example:
    ```tsx
    <LoaderTransition
      loading={isLoading}
      loadingContent={<Skeleton width={300} height={100} />}
      transitionType="fade"
      duration={300}
      delay={200}
    >
      <YourActualContent />
    </LoaderTransition>
    ```

#### Enhanced useLoader Hook
- **useEnhancedLoader Hook** - Supercharged loading state management
  - **Retry Logic** with exponential backoff
    - Configurable max retries, initial delay, and backoff multiplier
    - Custom shouldRetry function for conditional retries
  - **Success/Error States** - Full state machine (idle → loading → success/error)
    - Automatic state transitions
    - Error capture and storage
    - Retry attempt tracking
  - **Loading History** - Track all loading sessions with timestamps and durations
    - Useful for analytics and debugging
    - Clearable history with `clearHistory()`
  - **Debounce/Throttle** - Prevent excessive loading triggers
    - Debounce for search-like scenarios
    - Throttle for rate-limited operations
  - **Lifecycle Callbacks**
    - `onLoadingStart`, `onSuccess`, `onError` hooks
  - **Auto Success/Error Display Duration**
    - Configurable display time before auto-reset
  - Example:
    ```tsx
    const {
      status,
      error,
      retryAttempt,
      startLoading,
      stopLoading,
      setError,
      retry,
      history,
    } = useEnhancedLoader({
      delay: 200,
      minDuration: 600,
      retry: {
        maxRetries: 3,
        initialDelay: 1000,
        backoffMultiplier: 2,
      },
      onSuccess: () => console.log('Success!'),
      onError: (err) => console.error(err),
    });
    ```

#### New CSS Transitions
- Fade transitions: `.loader-transition-fade-enter-active`, `.loader-transition-fade-exit-active`
- Slide transitions (up, down, left, right): `.loader-transition-slide-*-enter-active`, `.loader-transition-slide-*-exit-active`
- Scale transition: `.loader-transition-scale-enter-active`, `.loader-transition-scale-exit-active`
- Timing function utilities: `.loader-transition-ease`, `.loader-transition-spring`, etc.

### Updated
- **Component Count**: Increased from 28 to 29 components
- **Category Count**: Increased from 7 to 8 categories
- **Hook Count**: Added useEnhancedLoader (now 3 hooks: useLoader, useEnhancedLoader, useTheme)
- **Demo App**: Added Transition category to playground
- **Storybook**: Added comprehensive stories for LoaderTransition and useEnhancedLoader
- **Type System**: Added comprehensive types for hooks (LoadingStatus, RetryConfig, UseLoaderOptions, etc.)

## [2.2.0] - 2025-01-12

### Added

#### Button Loaders (New Category)
- **ButtonSpinner Component** - Specialized spinner for button loading states
  - Three visual variants: `circle`, `dots`, `bars`
  - Positioning options: `left`, `right`, `center`
  - Compact size optimized for buttons (default 16px)
  - Option to hide content when loading with `showContent={false}`
  - Customizable gap between spinner and content
  - Uses `currentColor` by default for easy theming
  - Example:
    ```tsx
    <button>
      <ButtonSpinner variant="circle" size={16} color="white">
        Submit Form
      </ButtonSpinner>
    </button>
    ```

#### Status Indicators (New Category)
- **SuccessCheckmark Component** - Animated checkmark for successful operations
  - Smooth drawing animation
  - Optional circle background with `showCircle`
  - Filled or outlined circle with `fillCircle`
  - Customizable animation duration
  - Perfect for form submissions, uploads, and confirmations
  - Example:
    ```tsx
    <SuccessCheckmark
      visible={isSuccess}
      showCircle
      fillCircle
      size={64}
    />
    ```

- **ErrorIndicator Component** - Animated error indicator with X mark
  - Smooth X mark drawing animation
  - Optional shake animation for emphasis
  - Optional circle background with `showCircle`
  - Filled or outlined circle with `fillCircle`
  - Customizable animation duration
  - Perfect for error states and validation feedback
  - Example:
    ```tsx
    <ErrorIndicator
      visible={hasError}
      showCircle
      shake
      size={64}
    />
    ```

#### New Animations
- `button-dot-pulse` - Sequenced pulsing animation for button dots
- `button-bar-pulse` - Wave animation for button bars
- `success-scale` - Bouncy scale-in animation for success indicator
- `success-circle` - Circle drawing animation for success background
- `success-check` - Checkmark drawing animation
- `error-shake` - Shake animation for error emphasis
- `error-scale` - Scale-in animation for error indicator
- `error-circle` - Circle drawing animation for error background
- `error-x` - X mark drawing animation

### Updated
- **Component Count**: Increased from 25 to 28 components
- **Category Count**: Increased from 5 to 7 categories
- **Demo App**: Added Button and Status categories to playground
- **Storybook**: Added comprehensive stories for new components

## [2.1.0] - 2025-01-07

### Added

#### Theming System
- **ThemeProvider Component** - Global theme configuration for all loaders
  - Set default colors, sizes, speeds, and UX options
  - Automatically applies to all loader components
  - Optional - components work without it
  - Example:
    ```tsx
    <ThemeProvider theme={{ primaryColor: '#8b5cf6', defaultSpeed: 'fast' }}>
      <App />
    </ThemeProvider>
    ```

- **useTheme Hook** - Access theme configuration in custom components
  - Returns current theme from ThemeProvider
  - Falls back to empty theme if no provider present
  - Useful for creating custom loaders

#### Loading State Management
- **useLoader Hook** - Smart loading state management
  - Built-in delay, minimum duration, and auto-hide
  - Returns loading state and control functions
  - Provides `isVisible` for optimal UX
  - Example:
    ```tsx
    const { loading, startLoading, stopLoading, isVisible } = useLoader({
      delay: 200,
      minDuration: 600,
    });
    ```

#### Enhanced CSS Variables
- Added comprehensive CSS custom properties for theming
  - Size presets: `--loader-size-xs` through `--loader-size-xl`
  - Spacing variables: `--loader-gap`, `--loader-padding`
  - Border radius: `--loader-radius-sm/md/lg/full`
  - Transition durations: `--loader-transition-fast/normal/slow`
- **Dark mode support** - Automatic skeleton color adjustment for dark themes
  - Uses `@media (prefers-color-scheme: dark)`
  - Adjusts skeleton base and highlight colors

### Fixed

#### TypingIndicator Component
- **Improved animation timing** - Delay between dots now scales with animation duration
  - Uses 15% of animation duration for smoother sequencing
  - Works correctly with all speed settings (slow, normal, fast)
- **Enhanced animation smoothness**
  - Adjusted keyframe timing (70% idle instead of 60%)
  - Increased bounce height for better visibility
  - Improved fade opacity range
- **Performance optimization** - Added `willChange: 'transform, opacity'` for better rendering

### Changed

- Updated version to 2.1.0
- CSS bundle slightly increased to 6.94 KB (was 6.27 KB) due to enhanced theme variables
  - Still 67% smaller than v1.x (21 KB)
  - Gzipped: 1.85 KB

---

## [2.0.0] - 2025-01-07

### 🎉 Major Release - Zero Configuration, Smaller Bundle

This release removes the Tailwind CSS dependency, making the library easier to use and significantly smaller.

### Breaking Changes

#### Removed Dependencies
- **Removed Tailwind CSS peer dependency** - No longer required
  - The library now uses custom CSS utilities instead of Tailwind
  - Users no longer need to configure `tailwind.config.js`
  - Zero configuration required - just import styles and go

#### Migration Guide

**For v1.x users:**
1. Update to v2.0.0: `npm install premium-react-loaders@latest`
2. Remove library path from `tailwind.config.js` (if not using Tailwind elsewhere)
3. That's it! All component APIs remain identical

**What stays the same:**
- ✅ All component APIs unchanged
- ✅ All props work exactly the same
- ✅ TypeScript types unchanged
- ✅ Same import paths
- ✅ Same customization options (className, style, color props)

### Added

#### Custom CSS System
- **Custom utility classes** replacing Tailwind dependencies
  - Layout utilities: flex, grid, gap, spacing
  - Positioning utilities: relative, absolute, fixed, inset
  - Border utilities: rounded-*, border-*
  - Typography utilities: text-*, font-*
  - All utilities are self-contained in the package

- **Component-specific styles**
  - Base skeleton, spinner, and progress styles
  - Optimized for small bundle size
  - Hardware-accelerated animations

#### Internal Improvements
- **Inline className utility** - Replaced clsx dependency
  - Lightweight 10-line utility function
  - Zero runtime dependencies
  - Maintains same API as clsx

### Changed

#### Bundle Size Optimizations
- **70% smaller CSS bundle**
  - Before: 21 KB (uncompressed)
  - After: 6.27 KB (1.64 KB gzipped)
  - Removed unused Tailwind utilities

- **36% smaller total package**
  - Before: 1.0 MB
  - After: 640 KB
  - Removed JavaScript source maps from distribution
  - Removed unnecessary dependencies

#### Build Configuration
- **Disabled source maps** in production builds
  - Reduces package size by ~500 KB
  - Source maps available in development mode
  - Users can still debug with preserved module structure

- **Optimized PostCSS configuration**
  - Removed Tailwind plugin
  - Kept autoprefixer for browser compatibility

#### Developer Experience
- **Simplified installation**
  - No Tailwind configuration needed
  - No additional build setup required
  - Works in any React project (not just Tailwind projects)

- **Faster installation**
  - Fewer peer dependencies to download
  - No Tailwind CSS installation required

### Removed

#### Dependencies
- Removed `tailwindcss` from peer dependencies
- Removed `clsx` from dependencies
- Removed `tailwind.config.js` configuration file

#### Configuration Requirements
- No longer need to add library path to Tailwind config
- No longer need Tailwind CSS installed

### Benefits

#### For Library Users
- 🎉 **Zero configuration** - no Tailwind setup required
- 🎉 **Smaller bundle** - 70% smaller CSS, 36% smaller package
- 🎉 **Faster installation** - fewer dependencies to download
- 🎉 **Works everywhere** - compatible with any React project
- 🎉 **Same great API** - drop-in replacement for v1.x

#### For Package Maintainers
- Simpler build process
- Smaller npm package
- Fewer dependency conflicts
- Better tree-shaking support

### Notes

This is a **major version** release due to the Tailwind CSS removal. While the component APIs remain unchanged, the removal of a peer dependency is considered a breaking change following semantic versioning.

All 25 components continue to work exactly as before:
- 9 Skeleton components
- 7 Spinner components
- 4 Progress components
- 4 Pulse components
- 1 Overlay component

---

## [1.3.0] - 2025-01-07

### Added

#### Smart Loading UX Features
- **Delayed Appearance** with `delay` prop (all components)
  - Prevents loader flash on fast-completing operations
  - Loader only appears if loading takes longer than specified delay
  - Default: 0ms (immediate), Recommended: 200-300ms for optimal UX
  - Example: `<SpinnerCircle delay={200} />` - shows loader only if loading takes >200ms
  - Perfect for API calls that usually complete quickly but occasionally take longer

- **Minimum Display Duration** with `minDuration` prop (all components)
  - Prevents jarring quick disappear of loader once shown
  - Ensures loader remains visible for minimum duration after appearing
  - Default: 0ms (no minimum), Recommended: 500-1000ms for smooth UX
  - Example: `<ProgressBar minDuration={800} />` - stays visible for at least 800ms
  - Creates more polished, professional loading experience

- **Smooth Fade Transitions** with `transition` prop (all components)
  - Adds elegant fade-in/fade-out animations when loader appears/disappears
  - Set to `true` for default 150ms transition, or specify custom duration in milliseconds
  - Default: `undefined` (no transition), Example: `<SpinnerCircle transition={200} />`
  - Works seamlessly with delay and minDuration for complete loading UX control
  - Hardware-accelerated CSS transitions for 60fps performance

#### New Utilities
- **useLoaderVisibility() Hook** - Core visibility management system
  - Handles delay timing, minimum duration enforcement, and transition states
  - Returns `shouldRender`, `opacity`, and `transitionStyle` for components
  - Automatically manages timers and cleanup for optimal performance
  - Example usage in custom loaders:
    ```typescript
    const { shouldRender, opacity, transitionStyle } = useLoaderVisibility(
      visible,
      delay,
      minDuration,
      transition
    );
    ```

### Changed

#### API Enhancements
- All 25 loader components now support smart loading UX props
  - Spinners (7): SpinnerCircle, SpinnerRing, SpinnerDots, SpinnerBars, SpinnerGrid, SpinnerWave, SpinnerPulse
  - Skeletons (9): Skeleton, SkeletonText, SkeletonAvatar, SkeletonImage, SkeletonCard, SkeletonList, SkeletonTable, SkeletonPage, SkeletonForm
  - Progress (4): ProgressBar, ProgressCircle, ProgressRing, ProgressSteps
  - Pulse (4): PulseDots, PulseWave, PulseBars, TypingIndicator
  - Overlay (1): LoaderOverlay

#### Internal Improvements
- Refactored all components to use centralized visibility management
- Improved timer cleanup and memory management
- Enhanced TypeScript types with new smart loading UX props in BaseLoaderProps
- Added transition utility CSS classes (loader-fade-enter, loader-fade-exit)

### Best Practices

#### Optimal UX Patterns
```typescript
// Pattern 1: Fast operations (API calls, form submissions)
<SpinnerCircle
  visible={isLoading}
  delay={200}           // Don't show unless takes >200ms
  minDuration={600}     // Stay visible for at least 600ms
  transition={150}      // Smooth 150ms fade
/>

// Pattern 2: Data fetching with progress
<ProgressBar
  visible={isLoading}
  value={progress}
  delay={300}           // Delay appearance
  minDuration={1000}    // Ensure users can see progress
  transition={200}      // Smooth transitions
/>

// Pattern 3: Skeleton screens (page loads)
<SkeletonCard
  visible={!dataLoaded}
  transition={250}      // Smooth content swap
/>

// Pattern 4: Full-screen overlays
<LoaderOverlay
  loading={isProcessing}
  delay={400}           // Only for long operations
  minDuration={800}     // Professional feel
  transition={300}      // Smooth overlay
>
  <SpinnerCircle size="xl" />
</LoaderOverlay>
```

### Documentation
- Updated component prop documentation with smart loading UX examples
- Added best practice guidelines for delay and minDuration values
- Included common UX patterns and anti-patterns
- Enhanced TypeScript JSDoc comments for new props

## [1.2.0] - 2025-01-04

### Added

#### Size Presets
- **Size presets** for all loader components: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`
  - `xs`: 16px - Extra small loaders for tight spaces
  - `sm`: 24px - Small loaders for compact UIs
  - `md`: 40px - Medium/default size (new default)
  - `lg`: 56px - Large loaders for prominent loading states
  - `xl`: 72px - Extra large loaders for hero sections
  - Numeric and CSS string values still supported (`size={50}`, `size="3rem"`)
  - Example: `<SpinnerCircle size="lg" />` instead of `<SpinnerCircle size={56} />`

#### Accessibility - Reduced Motion Support
- **Reduced motion detection** with `respectMotionPreference` prop (default: true)
  - Automatically respects user's `prefers-reduced-motion` media query
  - Animations significantly reduced (0.01ms duration) when user prefers reduced motion
  - Improves accessibility for users sensitive to motion
  - Example: `<SpinnerCircle respectMotionPreference={false} />` to override
  - Uses React hook `useReducedMotion()` for real-time detection

#### Animation Direction Control
- **Reverse animation** with `reverse` prop on all animated loaders
  - Spinners: Reverse rotation direction (counter-clockwise)
  - Progress (indeterminate): Reverse sweep direction
  - Pulse/Dots: Reverse animation sequence
  - Example: `<SpinnerCircle reverse />`, `<ProgressBar indeterminate reverse />`

### Changed

#### Breaking Changes (Minor)
- **Default size values** changed from numeric (`40`, `60`) to preset (`'md'`, `'lg'`)
  - Spinners: `40` → `'md'` (still renders as 40px)
  - Progress circles: `60` → `'lg'` (now renders as 56px, previously 60px)
  - This may cause **minor visual changes** in existing implementations using default sizes
  - To maintain exact previous sizing, explicitly set `size={40}` or `size={60}`

#### Internal Improvements
- Refactored animation duration calculation with new `getEffectiveDuration()` utility
- Added `useReducedMotion()` hook for accessibility support
- Updated `normalizeSize()` utility to support size presets
- Improved type definitions with `SizePreset` type

### Fixed
- Fixed PostCSS warning about `@import` order in styles
- Improved CSS import structure for better build performance

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
