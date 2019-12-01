import React from 'react';
import AuthService from '../../../services/auth-service.js';
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
            username: '',
            password: ''
        };
    }

    /**
     * @function LoginComponent#render
     * @description - executes a login request
     * @see UserService#executeLogin
     */
    submitLoginRequest() {
        try {
            const loginResponse = AuthService.executeLogin(
                this.state.userName, this.state.password
            );

            if(loginResponse.status === '200') {
                const validationResponse = AuthService.validateLoginAttempt(
                    loginResponse.valPasscode
                );

                //TODO - create local user object + 
            } else {
                //TODO - render login error UI
            }
        } catch(error) {
            //TODO - render login error UI
        }
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