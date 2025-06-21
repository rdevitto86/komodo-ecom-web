import React from 'react';
import ReactDOM from 'react-dom/client';
// import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <React.StrictMode>
      Test
      {/* <LandingPage /> */}
    </React.StrictMode>
  );
};

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
