import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  sidebar?: ReactNode;
}

export function Layout({ children, showSidebar = false, sidebar }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {showSidebar && sidebar}
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
