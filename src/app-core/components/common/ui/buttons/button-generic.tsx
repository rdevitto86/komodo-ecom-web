import React, { Component } from 'react';

/**
 * @interface
 * @description defines the component properties
 */
interface P {
    className: string;
    title: string;
    type: 'button' | 'submit' | 'reset';
    href?: string;
    onClick: Function;
    style?: {[key: string]: any} | {};
    children?: any;
}

/**
 * @class
 * @extends React.Component
 * @description builds and renders a generic button
 */
export default class ButtonGeneric extends Component<P, {}> {
    /**
     * @constructor
     * @param {Object} props component properties
     */
    constructor(props: P) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    /**
     * @public
     * @function ButtonGeneric#onClick
     * @description handles the onClick functionality for the button
     */
    onClick(): any {
        this.props.onClick();
    }

    /**
     * @public
     * @function ButtonGeneric#render
     * @description renders the button component
     * @returns {JSX} JSX
     */
    render(): JSX.Element {
        const {
            className, type, style, title
        } = this.props;

        switch (type) {
            case 'submit':
                return (
                    <button
                        className={className || 'button'}
                        type="submit"
                        onClick={this.onClick}
                        style={style || {}}
                    > {title || ''} </button>
                );
            default:
                return (
                    <button
                        className={className || ''}
                        type="button"
                        onClick={this.onClick}
                        style={style || {}}
                    > {title || ''} </button>
                );
        }
    }
}
