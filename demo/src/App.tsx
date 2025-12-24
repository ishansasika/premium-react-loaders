import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import { SidebarProvider } from './contexts/SidebarContext';
import { Home } from './pages/Home';
import { Playground } from './pages/Playground';
import { Gallery } from './pages/Gallery';
import { Documentation } from './pages/Documentation';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <SidebarProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/playground/:componentId" element={<Playground />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </SidebarProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
