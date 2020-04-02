import HTTPClient from './http-client';

import User from '../models/user';

import ValidationUtil from '../../app-plugins/utility/validation-util';

import appConfig from '../resources/config/app-config.json';
import userConfig from '../resources/config/user-config.json';

import LOGGER from '../../app-plugins/loggers/runtime-logger';

/**
 * @class
 * @description - collection of API operations of the auth service
 */
export default class UserService extends HTTPClient {
    /**
     * @public
     * @function UserService#createUser
     * @description - creates a new user account
     * @param {Object} data - user details
     * @param {Function} success - success callback
     * @param {Function} error - error callback
     * @see HTTPClient#POST
     */
    createUser(data = undefined, success = undefined, error = undefined) {
        if (!ValidationUtil.isObject(data)) {
            LOGGER.warn('unable to create new user - invalid form data');
            LOGGER.debug(`data: ${String(data)}`);
            return;
        }

        super.POST(`${appConfig.URL_USER_SERVICE}/create`, data)
            .then((response) => {
                //TODO - set session (WeakMap w/ User object)
                userConfig.session = response.session;

                //TODO - set user object (in state or other location)
                User.setUserDetails(data);

                //TODO - fire user creation event

                if (typeof success === 'function') {
                    success();
                }
            }).catch((response) => {
                //LOGGER.error()

                if (typeof error === 'function') {
                    error();
                }
            });
    }

    /**
     * @public
     * @function UserService#updateUser
     * @description - updates an exsisting user account
     * @param {Object} data - user details
     * @param {Function} success - success callback
     * @param {Function} error - error callback
     * @see HTTPClient#PUT
     */
    updateUser(data = undefined, success = undefined, error = undefined) {
        if (!ValidationUtil.isObject(data)) {
            LOGGER.warn('unable to update exsisting user - invalid form data');
            LOGGER.debug(`data: ${String(data)}`);
            return;
        }

        super.PUT(`${appConfig.URL_USER_SERVICE}/update`, data)
            .then(() => {
                //TODO - update user object (Object.keys?)
                //TODO - set user object (in state or other location)

                //TODO - fire user update event

                if (typeof success === 'function') {
                    success();
                }
            }).catch((response) => {
                //LOGGER.error()

                if (typeof error === 'function') {
                    error();
                }
            });
    }

    /**
     * @public
     * @function UserService#deleteUser
     * @description - deletes an exsisting user account
     * @see HTTPClient#DELETE
     */
    deleteUser(success = undefined, error = undefined) {
        super.DELETE(`${appConfig.URL_USER_SERVICE}/delete`, {
            email: '' //TODO - user model
        }).then(() => {
            //TODO - set user object (in state or other location)
            //TODO - fire user deletion event

            if (typeof success === 'function') {
                success();
            }
        }).catch((response) => {
            //LOGGER.error()

            if (typeof error === 'function') {
                error();
            }
        });
    }

    /**
     * @public
     * @function UserService#resetPassword
     * @description - sends a password reset request
     * @see HTTPClient#DELETE
     */
    resetPassword() {
        super.POST(`${appConfig.URL_USER_SERVICE}/reset`, {
            email: '' ////TODO - user model
        }).then(() => {
            //TODO - inform user to check their email for the password
            //TODO - navigate to login screen / open login modal
        }).catch((response) => {
            //LOGGER.error()
        });
    }
}
