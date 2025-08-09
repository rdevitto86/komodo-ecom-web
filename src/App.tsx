import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from '@router/routes';
import '@assets/styles/index.css'; // Global styles

const App = () => (
  <AppRouter />
);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<React.StrictMode><App /></React.StrictMode>);
