import './App.scss';

/*
  NOTE:

    Most of the code here will be boostrapping React modules/components.
    Majority of landing page UI will be handled in index.html.

    When it comes to loading React modules/components, make it as optimized and "lazy"
    as possible. Don't want tons of components all loaded at once.

    Could do checks to see if certain modules have loaded, then trigger creation of
    less-important ones. Core UI can be injected with serverside rendered code to
    save on loading time; with only the supporting/facade UI being render on load (lazy load).

    TL;DR - the UI here should be as simple as possible. People want a fast start page.
*/

/**
 * Boostraps the React application and renders UI components
 */
export default function App() {
  return (
    <div id="landing-boostraper">
      <div id="landing-bg">
        <button className="test-button" type="button">Test</button>
      </div>
    </div>
  );
}
