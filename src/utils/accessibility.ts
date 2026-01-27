import { AnnouncementPriority } from '../types';

/**
 * Generate contextual ARIA label for loaders
 */
export function generateAriaLabel(
  componentName: string,
  options?: {
    progress?: number;
    status?: string;
    estimatedTime?: number;
  }
): string {
  const { progress, status, estimatedTime } = options || {};

  let label = `Loading`;

  if (componentName) {
    label = `${componentName} loading`;
  }

  if (status) {
    label += `, ${status}`;
  }

  if (progress !== undefined && progress >= 0 && progress <= 100) {
    label += `, ${Math.round(progress)}% complete`;
  }

  if (estimatedTime !== undefined && estimatedTime > 0) {
    const seconds = Math.ceil(estimatedTime);
    label += `, approximately ${seconds} second${seconds !== 1 ? 's' : ''} remaining`;
  }

  return label;
}

/**
 * Determine if a progress value should trigger an announcement
 */
export function shouldAnnounceProgress(
  currentProgress: number,
  previousProgress: number,
  milestones: number[] = [25, 50, 75, 100],
  minInterval = 10
): boolean {
  // Check if crossed a milestone
  const crossedMilestone = milestones.some(
    (milestone) =>
      previousProgress < milestone && currentProgress >= milestone
  );

  // Check if minimum interval passed
  const intervalPassed = currentProgress - previousProgress >= minInterval;

  return crossedMilestone || intervalPassed;
}

/**
 * Get announcement message for progress updates
 */
export function getProgressAnnouncement(
  progress: number,
  options?: {
    taskName?: string;
    includeTimeEstimate?: boolean;
    estimatedSeconds?: number;
  }
): string {
  const { taskName, includeTimeEstimate, estimatedSeconds } = options || {};

  let message = taskName ? `${taskName}: ` : '';
  message += `${Math.round(progress)}% complete`;

  if (includeTimeEstimate && estimatedSeconds !== undefined && estimatedSeconds > 0) {
    const seconds = Math.ceil(estimatedSeconds);
    message += `. Approximately ${seconds} second${seconds !== 1 ? 's' : ''} remaining`;
  }

  return message;
}

/**
 * Determine politeness level based on priority
 */
export function getPolitenessLevel(
  priority: AnnouncementPriority
): 'polite' | 'assertive' {
  return priority === 'high' ? 'assertive' : 'polite';
}

/**
 * Queue for managing announcements to prevent overwhelming screen readers
 */
export class AnnouncementQueue {
  private queue: Array<{ message: string; priority: AnnouncementPriority }> = [];
  private isProcessing = false;
  private readonly minDelay = 500; // Minimum delay between announcements

  /**
   * Add an announcement to the queue
   */
  add(message: string, priority: AnnouncementPriority = 'medium'): void {
    // Remove duplicate messages
    this.queue = this.queue.filter((item) => item.message !== message);

    // Add new message
    this.queue.push({ message, priority });

    // Sort by priority (high first)
    this.queue.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    this.processQueue();
  }

  /**
   * Process the announcement queue
   */
  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;

    while (this.queue.length > 0) {
      const item = this.queue.shift();
      if (item) {
        // Announce the message
        this.announce(item.message, item.priority);

        // Wait before processing next
        await new Promise((resolve) => setTimeout(resolve, this.minDelay));
      }
    }

    this.isProcessing = false;
  }

  /**
   * Announce a message (to be implemented by consumer)
   */
  private announce(message: string, priority: AnnouncementPriority): void {
    // This would typically dispatch an event or call a callback
    // For now, we'll just log (consumer can override this)
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('loader-announcement', {
        detail: { message, priority },
      });
      window.dispatchEvent(event);
    }
  }

  /**
   * Clear all pending announcements
   */
  clear(): void {
    this.queue = [];
  }

  /**
   * Get queue length
   */
  getLength(): number {
    return this.queue.length;
  }
}

/**
 * Singleton announcement queue instance
 */
export const announcementQueue = new AnnouncementQueue();

/**
 * Helper to announce loading state changes
 */
export function announceLoadingState(
  state: 'start' | 'progress' | 'success' | 'error',
  options?: {
    taskName?: string;
    progress?: number;
    errorMessage?: string;
    priority?: AnnouncementPriority;
  }
): void {
  const { taskName = 'Loading', progress, errorMessage, priority = 'medium' } = options || {};

  let message = '';

  switch (state) {
    case 'start':
      message = `${taskName} started`;
      break;
    case 'progress':
      if (progress !== undefined) {
        message = getProgressAnnouncement(progress, { taskName });
      }
      break;
    case 'success':
      message = `${taskName} completed successfully`;
      break;
    case 'error':
      message = errorMessage || `${taskName} failed`;
      break;
  }

  if (message) {
    announcementQueue.add(message, state === 'error' ? 'high' : priority);
  }
}
