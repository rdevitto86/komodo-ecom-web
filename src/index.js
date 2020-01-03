import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import LandingRootModuleDesktop from '../landing-page-desktop/landing-root-module-desktop';

/**
 * @class AppRootDesktop
 * @description - module that renders all the components/UI elements tied to
 * the landing page on desktop browsers.
 */
class AppRootDesktop extends Component {
    /**
     * @function AppRootDesktop#render
     * @description - renders the main desktop browser application
     * @returns {JSX}
     * @see LandingRootModuleDesktop
     */
    render() {
        return (
            <div class='app-root-desktop'>
                <LandingRootModuleDesktop />
            </div>
        );
    }
}

//renders the root application module to the browser
ReactDOM.render(
    <AppRootDesktop/>, document.getElementById('root')
);