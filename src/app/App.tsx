import './App.scss';

/*
  NOTES:

  Since this is the root react module, styling, basic animations, and can occur here.
  Most of the sub-components will handle their own UI, therefor, rending majority of
  stylings here redundant.

  any styling here will be JavaScript focused where the index.html/css files will handle much
  of the background and structural elements. Animations here can be any first-time animations,
  frameworks for sub-components, or things the HMTL didnt render.
*/

/**
 * Boostraps the React application
 * @version 1.0.0
 */
export default function App() {
  return (
    <div className="app-root" />
  );
}
