import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';

// No touching!
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'), // invoked from index.html using Webpack
);
