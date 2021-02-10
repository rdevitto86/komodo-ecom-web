import React from 'react';
import ReactDOM from 'react-dom';

// import './index.scss';
import App from './app/App';

/*
  NOTES:

  It is entirely possible to have no css/scss here at all if sub-components
  handle their own rendering. Remove in the future if un-needed.

  The root react module will instantiate sub-components and their stylings. This file
  is to faciliate the creation of the react DOM.
*/

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
