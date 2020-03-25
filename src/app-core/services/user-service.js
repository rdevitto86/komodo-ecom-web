import HTTPClient from './http-client';

import User from '../models/user';
import Address from '../models/address';
import Billing from '../models/billing';

import ValidationUtil from '../../app-plugins/utility/validation-util';

import ServiceError from '../errors/service-error';

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
     * @throws ServiceError
     * @see HTTPClient#POST
     */
    createUser(data = undefined) {
        if (!ValidationUtil.isObject(data)) {
            LOGGER.warn('unable to create new user - invalid form data');
            LOGGER.debug(`data: ${String(data)}`);
            return;
        }

        super.POST(`${appConfig.URL_USER_SERVICE}/create`, data)
            .then((response) => {
                //TODO - set session (WeakMap w/ User object)
                userConfig.session = response.session;

                const { details, type, address } = data;

                //TODO - set user object (in state or other location)
                User(details, type, new Address(address), null);

                //TODO - fire user creation event
            }).catch((response) => {
                throw new ServiceError(response);
            });
    }

    /**
     * @public
     * @function UserService#updateUser
     * @description - updates an exsisting user account
     * @throws ServiceError
     * @see HTTPClient#PUT
     */
    updateUser(data = undefined) {
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
            }).catch((response) => {
                throw new ServiceError(response);
            });
    }

    /**
     * @public
     * @function UserService#deleteUser
     * @description - deletes an exsisting user account
     * @throws ServiceError
     * @see HTTPClient#DELETE
     */
    deleteUser() {
        super.DELETE(`${appConfig.URL_USER_SERVICE}/delete`, {
            email: '' //TODO - user model
        }).then(() => {
            //TODO - set user object (in state or other location)
            //TODO - fire user deletion event
        }).catch((response) => {
            throw new ServiceError(response);
        });
    }

    /**
     * @public
     * @function UserService#resetPassword
     * @description - sends a password reset request
     * @throws ServiceError
     * @see HTTPClient#DELETE
     */
    resetPassword() {
        super.POST(`${appConfig.URL_USER_SERVICE}/reset`, {
            email: '' ////TODO - user model
        }).then(() => {
            //TODO - inform user to check their email for the password
            //TODO - navigate to login screen / open login modal
        }).catch((response) => {
            throw new ServiceError(response);
        });
    }
}
