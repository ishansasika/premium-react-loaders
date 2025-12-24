import { ReactNode, useEffect, cloneElement, isValidElement } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useSidebarContext } from '../../contexts/SidebarContext';

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  sidebar?: ReactNode;
}

export function Layout({ children, showSidebar = false, sidebar }: LayoutProps) {
  const { isOpen, close, isMobile } = useSidebarContext();

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && isOpen && showSidebar) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isMobile, isOpen, showSidebar]);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {showSidebar && (
          <>
            {/* Backdrop overlay - mobile only */}
            {isMobile && isOpen && (
              <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={close}
                aria-hidden="true"
              />
            )}
            {/* Sidebar - pass props if it's a valid React element */}
            {isValidElement(sidebar)
              ? cloneElement(sidebar, { isOpen, onClose: close, isMobile } as any)
              : sidebar}
          </>
        )}
        <main className="flex-1 overflow-y-auto flex flex-col">
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
