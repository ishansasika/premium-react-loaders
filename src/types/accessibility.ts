/**
 * LiveRegion component props
 */
export interface LiveRegionProps {
  /** Message to announce to screen readers */
  message: string;
  /** ARIA live politeness level */
  politeness?: 'polite' | 'assertive' | 'off';
  /** Auto-clear message after duration (ms) */
  clearAfter?: number;
  /** Whether the entire region should be announced */
  atomic?: boolean;
  /** Whether to announce relevant changes only */
  relevant?: 'additions' | 'removals' | 'text' | 'all';
  /** Custom className */
  className?: string;
}

/**
 * Announcement priority levels
 */
export type AnnouncementPriority = 'low' | 'medium' | 'high';

/**
 * Progress announcement configuration
 */
export interface ProgressAnnouncementConfig {
  /** Enable progress announcements */
  enabled?: boolean;
  /** Announce at these milestone percentages */
  milestones?: number[];
  /** Minimum interval between announcements (ms) */
  minInterval?: number;
  /** Include estimated time in announcement */
  includeTimeEstimate?: boolean;
}
