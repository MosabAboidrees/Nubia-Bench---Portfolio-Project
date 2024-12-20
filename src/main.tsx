// Import necessary React components and methods
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
// Import global styles
import './index.css';

// Create and render the React application
// - Find the DOM element with id 'root'
// - Create a React root using createRoot
// - Render the App component wrapped in StrictMode
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
