import HTTPService from './http-client';

import User from '../models/user';
import Address from '../models/address';
import Billing from '../models/billing';

import ServiceError from '../errors/service-error';

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
     * @throws ServiceError
     * @see HTTPService#POST
     */
    login(username = undefined, password = undefined) {
        super.POST(`${appConfig.URL_AUTH_SERVICE}/login`, {
            username: username,
            password: password
        }).then((response) => {
            if (response.sessionStorage) {
                sessionStorage.setItem(appConfig.SESSION_KEY_CLIENT, response.session);
            }

            const { details, type, address, billing } = response.data;

            //TODO - set user object (in state or other location)
            User(details, type, new Address(address), new Billing(billing));
        }).catch((response) => {
            throw new ServiceError(response);
        });
    }

    /**
     * @public
     * @function AuthService#logoff
     * @description - logs a user off
     * @param {String} email
     * @throws ServiceError
     * @see HTTPService#POST
     */
    logoff(email = undefined) {
        super.POST(`${appConfig.URL_AUTH_SERVICE}/logoff`, {
            email: email,
            session: sessionStorage.getItem(appConfig.SESSION_KEY_CLIENT)
        }).then(() => {
            sessionStorage.removeItem(appConfig.SESSION_KEY_CLIENT);
        }).catch((response) => {
            throw new ServiceError(response);
        });
    }

    /**
     * @public
     * @function AuthService#validateSession
     * @description - validates a user's session
     * @throws ServiceError
     * @see HTTPService#POST
     */
    validateSession() {
        super.POST(`${appConfig.URL_AUTH_SERVICE}/validate`, {
            session: sessionStorage.getItem(appConfig.SESSION_KEY_CLIENT)
        }).then((response) => {
            if (!response.valid) {
                //TODO - show login flow
            }
        }).catch((response) => {
            throw new ServiceError(response);
        });
    }
}
