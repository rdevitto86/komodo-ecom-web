import * as React from 'react';
// import { Router, Switch, Route } from 'react-router-dom';

import NavSidebarLanding
    from './app-core/modules/nav-sidebar-landing/nav-sidebar-landing';

import './app-root.scss';

// import LandingRootModuleDesktop from '../landing-page-desktop/landing-root-module-desktop';

//TODO - move this code to a server-side render and only load local components

const AppRoot: React.FunctionComponent<{}> = () => (
    <div className="landing-desktop-bootstrap">
        <NavSidebarLanding />
    </div>
);
export default AppRoot;
