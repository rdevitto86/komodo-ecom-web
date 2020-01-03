import React, { Component } from 'react';

import LandingPageBackground 
    from '../../components/module-sub-components/landing-page/landing-background-desktop';
import LandingPageForeground 
    from '../../components/module-sub-components/landing-page/landing-foreground-desktop';
import TriangleMediaInverted 
    from '../../components/common/ui-components/ui-media/triange-media-inverted/triangle-media-inverted';
import TriangleMediaVertical 
    from '../../components/common/ui-components/ui-media/triange-media-vertical/triangle-media-vertical';
import HeaderLandingDesktop 
    from '../../components/headers';

/**
 * @class LandingRootModuleDesktop
 * @description - module that renders all the components/UI elements tied to
 * the landing page on desktop browsers.
 */
export class LandingRootModuleDesktop extends Component {
    /**
     * @function LandingRootModuleDesktop#render
     * @description - renders the landing page modules using 
     * JSX tags and child components
     * @returns {JSX}
     * @see LandingPageBackground
     * @see LandingPageForeground
     * @see HeaderLandingDesktop
     * @see TriangleMediaInverted
     * @see TriangleMediaVertical
     */
    render() {
        return (
            <div class='landing-page-desktop-root'>

                <div class='landing-background'>
                    <LandingPageBackground />
                </div>

                {/* <div class='landing-core-body'>
                    <TriangleMediaInverted />
                    <TriangleMediaVertical />
                    <TriangleMediaInverted />
                </div>

                <div class='landing-foreground'>
                    <LandingPageForeground />
                </div>

                <div class='landing-header'>
                    <HeaderLandingDesktop />
                </div> */}

            </div>
        );
    }
}