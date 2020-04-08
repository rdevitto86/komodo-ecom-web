import HTTPService from './http-client';
import { User } from '../models/user';

import { LoginResponse, SessionValidResponse } from '../models/service-responses/auth-response';
import { ErrorResponse } from '../models/service-responses/error-response';

import appConfig from '../resources/config/app-config.json';
import LOGGER from '../../app-plugins/loggers/runtime-logger';

/**
 * @class
 * @description - collection of API operations of the auth service
 */
export default class AuthService extends HTTPService {
    /**
     * @public
     * @function AuthService#login
     * @description - executes a login request for a user
     * @param {String} username
     * @param {String} password
     * @param {Function} success - success callback
     * @param {Function} error - error callback
     * @see HTTPService#POST
     */
    login(username: string, password: string, success?: Function, error?: Function): void {
        super.POST(`${appConfig.URL_AUTH_SERVICE}/login`, {
            username: username,
            password: password
        }).then((response: LoginResponse) => {
            if (response && typeof response === 'object') {
                if (response.sessionToken) {
                    sessionStorage.setItem(appConfig.SESSION_KEY_CLIENT, response.sessionToken);
                } else {
                    //TODO - handle missing session token error
                    return;
                }

                //TODO - set user object (in state or other location)
                User.getInstance().setUserDetails(response.data);
            }

            //execute callback function
            if (typeof success === 'function') {
                success();
            }
        }).catch((response: ErrorResponse) => {
            LOGGER.error(response);

            if (typeof error === 'function') {
                error();
            }
        });
    }

    /**
     * @public
     * @function AuthService#logoff
     * @description - logs a user off
     * @param {String} email
     * @param {Function} success
     * @param {Function} error
     * @see HTTPService#POST
     */
    logoff(email: string, success?: Function, error?: Function): void {
        super.POST(`${appConfig.URL_AUTH_SERVICE}/logoff`, {
            email: email,
            session: sessionStorage.getItem(appConfig.SESSION_KEY_CLIENT)
        }).then(() => {
            sessionStorage.removeItem(appConfig.SESSION_KEY_CLIENT);

            if (typeof success === 'function') {
                success();
            }
        }).catch((response: ErrorResponse) => {
            LOGGER.error(response);

            if (typeof error === 'function') {
                error();
            }
        });
    }

    /**
     * @public
     * @function AuthService#validateSession
     * @description - validates a user's session
     * @see HTTPService#POST
     */
    validateSession(): void {
        super.POST(`${appConfig.URL_AUTH_SERVICE}/validate`, {
            session: sessionStorage.getItem(appConfig.SESSION_KEY_CLIENT)
        }).then((response: SessionValidResponse) => {
            if (!response.valid) {
                //TODO - navigate user to login screen
            }
        }).catch((response: ErrorResponse) => {
            LOGGER.error(response);
        });
    }
}
