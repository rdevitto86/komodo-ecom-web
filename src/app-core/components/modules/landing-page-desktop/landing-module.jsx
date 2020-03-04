import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import LandingPageBackground 
    from './sub-components/landing-background-desktop';
// import LandingPageForeground 
//     from './sub-components/landing-foreground-desktop';
// import TriangleMediaInverted 
//     from '../../common/ui/media/triange-media-inverted';
// import TriangleMediaVertical 
//     from '../../common/ui/media/triange-media-vertical';
// import HeaderLandingDesktop 
//     from '../../common/headers/header-landing-desktop';

/**
 * @class LandingPageModuleDesktop
 * @description - module that renders all the components/UI elements tied to
 * the landing page on desktop browsers.
 */
export class LandingPageModuleDesktop extends Component {
    /**
     * @function LandingRootModuleDesktop#render
     * @description - renders the landing page modules using 
     * JSX tags and child components
     * @returns {JSX}
     * @see LandingPageBackground
     */
    render() {
        return (
            <div class='landing-page-desktop-root'>

                <div class='landing-background'>
                    <LandingPageBackground />
                </div>

            </div>
        );
    }
}