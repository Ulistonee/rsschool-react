import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from './components/error-boundary/error-boundary.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PersonDetails from './components/person-details/person-details.tsx';
import About from './pages/about/about.tsx';
import NotFound from './pages/not-found/not-found.tsx';
import { ThemeProvider } from './context/theme-context.tsx';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found');
}

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="person/:id" element={<PersonDetails />} />
              <Route path="about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
