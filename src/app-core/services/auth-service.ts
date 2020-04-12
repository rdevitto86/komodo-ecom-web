import HTTPService from './http-client';
import { User } from '../models/user';

import { LoginResponse, SessionValidResponse } from '../models/service-responses/auth-response';
import { ServiceError } from '../models/service-responses/service-error';

import AppConfig from '../resources/config/app-config';
import LOGGER from '../../app-plugins/loggers/runtime-logger';

/**
 * @class
 * @extends HTTPService
 * @description collection of operations used in the authorization service
 */
export default class AuthService extends HTTPService {
    /**
     * @public
     * @function AuthService#login
     * @description executes a login request for a user
     * @param {String} email entered user email
     * @param {String} password entered password
     * @param {Function} success success callback
     * @param {Function} error error callback
     * @see HTTPService#POST
     */
    login(email: string, password: string, success?: Function, error?: Function): void {
        super.POST(`${process.env.AUTH_SERVICE_URL}/login`, {
            username: email,
            password: password
        }).then((response: LoginResponse) => {
            //check if response contains valid session token
            if (response && typeof response === 'object' && response.sessionToken) {
                sessionStorage.setItem(
                    AppConfig.SESSION_KEY_CLIENT, response.sessionToken
                );

                //TODO - set user object (in state or other location)
                User.setUserDetails(response.data);

                //execute callback function
                if (typeof success === 'function') {
                    success();
                }
            } else {
                //TODO - handle missing session token error
            }
        }).catch((response: ServiceError) => {
            LOGGER.error(response);

            if (typeof error === 'function') {
                error();
            }
        });
    }

    /**
     * @public
     * @function AuthService#logoff
     * @description logs a user off the application
     * @param {String} email user email
     * @param {Function} success success callback
     * @param {Function} error error callback
     * @see HTTPService#POST
     */
    logoff(email: string, success?: Function, error?: Function): void {
        super.POST(`${process.env.AUTH_SERVICE_URL}/logoff`, {
            email: email,
            session: sessionStorage.getItem(AppConfig.SESSION_KEY_CLIENT)
        }).then(() => {
            sessionStorage.removeItem(AppConfig.SESSION_KEY_CLIENT);

            if (typeof success === 'function') {
                success();
            }
        }).catch((response: ServiceError) => {
            LOGGER.error(response);

            if (typeof error === 'function') {
                error();
            }
        });
    }

    /**
     * @public
     * @function AuthService#validateSession
     * @description validates a session token
     * @see HTTPService#POST
     */
    validateSession(): void {
        super.POST(`${process.env.AUTH_SERVICE_URL}/validate`, {
            session: sessionStorage.getItem(AppConfig.SESSION_KEY_CLIENT)
        }).then((response: SessionValidResponse) => {
            if (!response.valid) {
                //TODO - navigate user to login screen
            }
        }).catch((response: ServiceError) => {
            LOGGER.error(response);
            //TODO - failed session validation check
        });
    }
}
