import React, { Component } from 'react';
import './app-root.scss';

// import LandingRootModuleDesktop from '../landing-page-desktop/landing-root-module-desktop';

/**
 * @class AppDesktop
 * @description - module that renders all the components/UI elements tied to
 * the landing page on desktop browsers.
 */
export class AppDesktop extends Component {
    /**
     * @function AppDesktop#render
     * @description - renders the main desktop browser application
     * @returns {JSX}
     * @see LandingRootModuleDesktop
     */
    render() {
        //TODO - pre-render UI elements before sending to client
        // return (
        //     <div class='app-root-desktop'>
        //         <LandingRootModuleDesktop />
        //     </div>
        // );

        return (
            <div className='app-react-root'>
                <text>
                    Hello World
                </text>
            </div>
        );
    }
}