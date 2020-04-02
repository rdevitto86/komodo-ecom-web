import HTTPService from './http-client';

import User from '../models/user';

import appConfig from '../resources/config/app-config.json';

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
    login(username = undefined, password = undefined, success = undefined, error = undefined) {
        super.POST(`${appConfig.URL_AUTH_SERVICE}/login`, {
            username: username,
            password: password
        }).then((response) => {
            if (response.sessionStorage) {
                sessionStorage.setItem(appConfig.SESSION_KEY_CLIENT, response.session);
            }

            //TODO - set user object (in state or other location)
            User.setUserDetails(response.data);

            if (typeof success === 'function') {
                success();
            }
        }).catch((response) => {
            //TODO - LOGGER.error()

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
    logoff(email = undefined, success = undefined, error = undefined) {
        super.POST(`${appConfig.URL_AUTH_SERVICE}/logoff`, {
            email: email,
            session: sessionStorage.getItem(appConfig.SESSION_KEY_CLIENT)
        }).then(() => {
            sessionStorage.removeItem(appConfig.SESSION_KEY_CLIENT);

            if (typeof success === 'function') {
                success();
            }
        }).catch((response) => {
            //TODO - LOGGER.error()

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
    validateSession() {
        super.POST(`${appConfig.URL_AUTH_SERVICE}/validate`, {
            session: sessionStorage.getItem(appConfig.SESSION_KEY_CLIENT)
        }).then((response) => {
            if (!response.valid) {
                //TODO - navigate user to login screen
            }
        }).catch((response) => {
            //TODO - LOGGER.error()
        });
    }
}
