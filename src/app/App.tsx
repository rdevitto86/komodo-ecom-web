// import React from 'react';
import './App.scss';

/*
  NOTES:

  Since this is the root react module, styling, basic animations, and can occur here.
  Most of the sub-components will handle their own UI, therefor, rending majority of
  stylings here redundant.

  Any styling here will be JavaScript focused where the index.html/css files will handle much
  of the background and structural elements. Animations here can be any first-time animations,
  frameworks for sub-components, or things the HMTL didnt render.
*/

/**
 * @class
 * @version 1.0.0
 * @description root react module for the website applicaiton
 */
function App() {
  return (
    // TODO - rename this to app-root
    <div className="app-root-react" />
  );
}

export default App;
