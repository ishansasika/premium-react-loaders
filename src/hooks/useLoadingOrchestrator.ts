import { useState, useCallback, useEffect, useRef } from 'react';

export type LoadingTaskStatus = 'pending' | 'loading' | 'success' | 'error';

export interface LoadingTask {
  /** Unique identifier for the task */
  id: string;
  /** Human-readable label */
  label: string;
  /** Current status */
  status: LoadingTaskStatus;
  /** Task dependencies (IDs of tasks that must complete first) */
  dependsOn?: string[];
  /** Progress percentage (0-100) */
  progress?: number;
  /** Error object if task failed */
  error?: Error;
}

export interface OrchestratorOptions {
  /** Execution mode: parallel or sequential */
  mode?: 'parallel' | 'sequential';
  /** Stop all tasks on first error */
  stopOnError?: boolean;
  /** Callback when a task starts */
  onTaskStart?: (taskId: string) => void;
  /** Callback when a task completes successfully */
  onTaskComplete?: (taskId: string) => void;
  /** Callback when a task fails */
  onTaskError?: (taskId: string, error: Error) => void;
  /** Callback when all tasks complete */
  onAllComplete?: () => void;
}

export interface UseLoadingOrchestratorReturn {
  /** Current state of all tasks */
  tasks: LoadingTask[];
  /** Start a specific task */
  startTask: (taskId: string) => Promise<void>;
  /** Mark a task as complete */
  completeTask: (taskId: string) => void;
  /** Mark a task as failed */
  failTask: (taskId: string, error: Error) => void;
  /** Update progress for a task */
  updateProgress: (taskId: string, progress: number) => void;
  /** Reset all tasks to pending */
  resetTasks: () => void;
  /** Overall progress (0-100) */
  overallProgress: number;
  /** Whether all tasks are complete */
  allComplete: boolean;
  /** Whether any task has errors */
  hasErrors: boolean;
}

/**
 * useLoadingOrchestrator - Manage multiple loading states with dependencies
 *
 * Coordinates multiple loading tasks with dependency management, progress tracking,
 * and execution control (parallel or sequential).
 *
 * @param initialTasks - Array of loading tasks
 * @param options - Configuration options
 * @returns Task state and control functions
 *
 * @example
 * ```tsx
 * function DataLoader() {
 *   const {
 *     tasks,
 *     startTask,
 *     completeTask,
 *     failTask,
 *     updateProgress,
 *     overallProgress,
 *   } = useLoadingOrchestrator(
 *     [
 *       { id: 'auth', label: 'Authenticating...', status: 'pending' },
 *       { id: 'data', label: 'Fetching data...', status: 'pending', dependsOn: ['auth'] },
 *       { id: 'render', label: 'Rendering...', status: 'pending', dependsOn: ['data'] },
 *     ],
 *     {
 *       mode: 'sequential',
 *       onAllComplete: () => console.log('All done!'),
 *     }
 *   );
 *
 *   const loadAll = async () => {
 *     await startTask('auth');
 *     // ... perform auth
 *     completeTask('auth');
 *
 *     await startTask('data');
 *     // ... fetch data
 *     completeTask('data');
 *   };
 *
 *   return (
 *     <div>
 *       <ProgressBar value={overallProgress} />
 *       {tasks.map(task => (
 *         <div key={task.id}>{task.label}: {task.status}</div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useLoadingOrchestrator(
  initialTasks: LoadingTask[],
  options: OrchestratorOptions = {}
): UseLoadingOrchestratorReturn {
  const {
    mode = 'parallel',
    stopOnError = false,
    onTaskStart,
    onTaskComplete,
    onTaskError,
    onAllComplete,
  } = options;

  const [tasks, setTasks] = useState<LoadingTask[]>(initialTasks);
  const previousTasksRef = useRef<LoadingTask[]>(initialTasks);
  const allCompleteCalledRef = useRef(false);

  // Reset all tasks
  const resetTasks = useCallback(() => {
    setTasks(
      initialTasks.map((task) => ({
        ...task,
        status: 'pending',
        progress: 0,
        error: undefined,
      }))
    );
    allCompleteCalledRef.current = false;
  }, [initialTasks]);

  // Check if task dependencies are met
  const areDependenciesMet = useCallback(
    (taskId: string, currentTasks: LoadingTask[]): boolean => {
      const task = currentTasks.find((t) => t.id === taskId);
      if (!task || !task.dependsOn || task.dependsOn.length === 0) {
        return true;
      }

      return task.dependsOn.every((depId) => {
        const depTask = currentTasks.find((t) => t.id === depId);
        return depTask?.status === 'success';
      });
    },
    []
  );

  // Start a task
  const startTask = useCallback(
    async (taskId: string) => {
      setTasks((prevTasks) => {
        const task = prevTasks.find((t) => t.id === taskId);
        if (!task) {
          console.warn(`Task ${taskId} not found`);
          return prevTasks;
        }

        // Check dependencies
        if (!areDependenciesMet(taskId, prevTasks)) {
          console.warn(`Task ${taskId} dependencies not met`);
          return prevTasks;
        }

        // Check if should stop due to previous errors
        if (stopOnError && prevTasks.some((t) => t.status === 'error')) {
          return prevTasks;
        }

        // Update task to loading
        const updatedTasks = prevTasks.map((t) =>
          t.id === taskId ? { ...t, status: 'loading' as LoadingTaskStatus } : t
        );

        // Call callback
        if (onTaskStart) {
          onTaskStart(taskId);
        }

        return updatedTasks;
      });
    },
    [areDependenciesMet, stopOnError, onTaskStart]
  );

  // Complete a task
  const completeTask = useCallback(
    (taskId: string) => {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((t) =>
          t.id === taskId ? { ...t, status: 'success' as LoadingTaskStatus, progress: 100 } : t
        );

        if (onTaskComplete) {
          onTaskComplete(taskId);
        }

        return updatedTasks;
      });
    },
    [onTaskComplete]
  );

  // Fail a task
  const failTask = useCallback(
    (taskId: string, error: Error) => {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((t) =>
          t.id === taskId ? { ...t, status: 'error' as LoadingTaskStatus, error } : t
        );

        if (onTaskError) {
          onTaskError(taskId, error);
        }

        return updatedTasks;
      });
    },
    [onTaskError]
  );

  // Update progress
  const updateProgress = useCallback((taskId: string, progress: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === taskId ? { ...t, progress: Math.min(Math.max(progress, 0), 100) } : t
      )
    );
  }, []);

  // Calculate overall progress
  const overallProgress =
    tasks.length > 0
      ? tasks.reduce((sum, task) => sum + (task.progress || 0), 0) / tasks.length
      : 0;

  // Check if all complete
  const allComplete = tasks.every((task) => task.status === 'success' || task.status === 'error');

  // Check if any errors
  const hasErrors = tasks.some((task) => task.status === 'error');

  // Call onAllComplete when all tasks finish
  useEffect(() => {
    if (allComplete && !allCompleteCalledRef.current && onAllComplete) {
      allCompleteCalledRef.current = true;
      onAllComplete();
    }
  }, [allComplete, onAllComplete]);

  return {
    tasks,
    startTask,
    completeTask,
    failTask,
    updateProgress,
    resetTasks,
    overallProgress,
    allComplete,
    hasErrors,
  };
}
