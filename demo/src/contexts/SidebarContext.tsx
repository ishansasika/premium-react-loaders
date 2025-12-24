import { createContext, useContext, ReactNode, useCallback, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface SidebarContextValue {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  isMobile: boolean;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

interface SidebarProviderProps {
  children: ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Get initial state based on screen size
  const getInitialState = useCallback(() => {
    if (typeof window !== 'undefined') {
      const isCurrentlyMobile = window.matchMedia('(max-width: 768px)').matches;
      return !isCurrentlyMobile; // Open on desktop, closed on mobile
    }
    return false;
  }, []);

  const [isOpen, setIsOpen] = useLocalStorage('sidebar-open', getInitialState());

  // Auto-close sidebar when switching to mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile, isOpen, setIsOpen]);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const value: SidebarContextValue = {
    isOpen,
    toggle,
    open,
    close,
    isMobile,
  };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
}
