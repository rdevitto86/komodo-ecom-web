import HTTPClient from './http-client';

import { User } from '../models/user';
import { UserResponse } from '../models/service-responses/user-response';
import { ServiceError } from '../models/service-responses/service-error';

import AppConfig from '../resources/config/app-config';
import LOGGER from '../../app-plugins/loggers/runtime-logger';

/**
 * @class
 * @extends HTTPClient
 * @description collection of operations used in the User service
 */
export default class UserService extends HTTPClient {
    /**
     * @public
     * @function UserService#createUser
     * @description creates a new user account
     * @param {Object} data user details
     * @param {Function} success success callback
     * @param {Function} error error callback
     * @see HTTPClient#POST
     */
    createUser(data: UserResponse, success?: Function, error?: Function): void {
        if (!data || typeof data !== 'object') {
            LOGGER.warn('unable to create new user - invalid form data');
            LOGGER.debug(`data: ${String(data)}`);
            return;
        }

        super.POST(`${process.env.URL_USER_SERVICE}/create`, data)
            .then((response: UserResponse) => {
                if (response && typeof response === 'object') {
                    if (response.sessionToken) {
                        sessionStorage.setItem(AppConfig.SESSION_KEY_CLIENT, response.sessionToken);
                    } else {
                        //TODO - handle missing session token error
                        return;
                    }

                    User.setUserDetails(data);

                    if (typeof success === 'function') {
                        success();
                    }
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
     * @function UserService#updateUser
     * @description updates an exsisting user account
     * @param {Object} data user details
     * @param {Function} success success callback
     * @param {Function} error error callback
     * @see HTTPClient#PUT
     */
    updateUser(data: UserResponse, success?: Function, error?: Function): void {
        if (!data || typeof data !== 'object') {
            LOGGER.warn('unable to update exsisting user - invalid form data');
            LOGGER.debug(`data: ${String(data)}`);
            return;
        }

        super.PUT(`${process.env.URL_USER_SERVICE}/update`, data)
            .then(() => {
                User.setUserDetails(data);

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
     * @function UserService#deleteUser
     * @description deletes an exsisting user account
     * @param {Function} success success callback
     * @param {Function} error error callback
     * @see HTTPClient#DELETE
     */
    deleteUser(success?: Function, error?: Function): void {
        super.DELETE(`${process.env.URL_USER_SERVICE}/delete`, {
            email: User.email
        }).then(() => {
            User.reset();

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
     * @function UserService#resetPassword
     * @description sends a password reset request
     * @param {Function} success success callback
     * @param {Function} error error callback
     * @see HTTPClient#DELETE
     */
    resetPassword(success: Function, error: Function): void {
        super.POST(`${process.env.URL_USER_SERVICE}/reset`, {
            email: User.email
        }).then(() => {
            //TODO - inform user to check their email for the password

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
}
