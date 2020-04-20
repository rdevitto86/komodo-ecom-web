import * as React from 'react';
// import { Router, Switch, Route } from 'react-router-dom';
// import AppConfig from '../../../../../resources/config/app-config';

import ButtonGeneric from '../../components/common/ui/buttons/button-generic';

import './nav-sidebar-landing.scss';

/**
 * @interface
 * @description defines the React state object for this component
 */
interface P {

}

/**
 * @interface
 * @description defines the React state object for this component
 */
interface S {
    isNavHidden: boolean;
}

/**
 * @class
 * @extends React.Component
 * @description renders the primary side-bar navigation component
 */
export default class NavSidebarLanding extends React.Component<P, S> {
    /**
     * @constructor
     * @description creates a new side-bar navigation module
     * @see React.Component
     */
    constructor(props: P) {
        super(props);

        this.state = {
            isNavHidden: true
        };

        this.onClickOpenMenu = this.onClickOpenMenu.bind(this);
        this.onClickHideMenu = this.onClickHideMenu.bind(this);
        this.onClickSolutions = this.onClickSolutions.bind(this);
        this.onClickProducts = this.onClickProducts.bind(this);
        this.onClickContactUs = this.onClickContactUs.bind(this);
        this.onClickContactUs = this.onClickContactUs.bind(this);
    }

    /**
     * @private
     * @function NavSidebarLanding~onClickOpenMenu
     * @description opens the top layer nav-bar
     */
    onClickOpenMenu(): void {
        this.setState({ isNavHidden: false });
        alert('Menu Opened');
    }

    /**
     * @private
     * @function NavSidebarLanding~onClickHideMenu
     * @description hides the entire navigation side-bar module
     */
    onClickHideMenu(): void {
        this.setState({ isNavHidden: true });
        alert('Menu Closed');
    }

    /**
     * 
     */
    onClickSolutions(): void {
        //TODO
    }

    /**
     * 
     */
    onClickProducts(): void {
        //TODO
    }

    /**
     * 
     */
    onClickContactUs(): void {
        //TODO
    }

    /**
     * 
     */
    onClickSocialMedia(): void {
        //TODO
    }

    /**
     * @public
     * @function NavSidebarPrimary#render
     * @description - renders the styling, HTML, and JS code
     * @returns {JSX} JSX
     */
    render(): JSX.Element {
        const onClickNavVisibility = this.state.isNavHidden
            ? this.onClickOpenMenu : this.onClickHideMenu;

        //NOTE: navigation buttons flow top to bottom
        return (
            <div className="navbar_primary">
                <ButtonGeneric className="button_nav" type="button" title="Solutions" onClick={this.onClickSolutions} />
            </div>
        );
    }
}
