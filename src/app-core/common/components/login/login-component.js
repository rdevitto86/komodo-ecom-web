import React from 'react';
import UserService from '../../../services/user-service.js';
import config from '../../../resources/config/app-config.js';

/**
 * @class
 * @description - UI component that allows users to login/logout of the application
 */
export class LoginComponent extends React.Component {
    /**
     * @constructor
     * @param {Object} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            rememberLogin: false,
            userName: '',
            password: ''
        };
    }

    /**
     * @function LoginComponent#render
     * @description - executes a login request
     * @see UserService#executeLogin
     */
    submitLoginRequest() {
        UserService.executeLogin(this.state.userName, this.state.password)
            .then(response => {
                //TODO
            })
            .catch(response => {
                //TODO
            });
    }

    /**
     * @function LoginComponent#render
     * @description - handles the rendering of the component
     * @returns {JSX}
     */
    render() {
        return (
            <div className='login'>
                <form onSubmit={this.submitLoginRequest}>
                    
                    <button type='submit'>
                        Login
                    </button>
                </form>
            </div>
        );
    }
}