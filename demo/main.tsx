import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '../src/tokens/ThemeProvider';
import DyingPage from './ShowcaseApp';
import '../theme.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="dying-theme">
      <DyingPage />
    </ThemeProvider>
  </React.StrictMode>
);
