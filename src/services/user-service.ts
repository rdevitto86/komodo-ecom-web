import HTTPS from '../npm-libs/typescript/web/network/https';
import { isUser, User, UserJSON } from '../models/user';
import Validations from '../npm-libs/typescript/util/validation/validations';
import ServiceException from '../npm-libs/typescript/exceptions/service-exception';
import { GetAccountInfoResponse } from './responses/user-api-responses';

// /**
//  * @private
//  * @constant {String} BASE_URL
//  * @description User API endpoint
//  */
// const API_URL = `${process.env.USER_API_URL || ''}/${process.env.USER_API_VER || ''}`;

const API_URL = '';

/**
 * @private
 * @constant {Object<String, String>} HEADERS
 * @description default headers for the API
 */
const HEADERS = {
    'accept': 'application/json',
    'content-type': 'application/json',
};

/**
 * @class
 * @singleton
 * @version 1.0
 * @extends {HTTPS}
 * @description handles requests/responses for the User API
 */
export default class UserService extends HTTPS {
    /**
     * @public
     * @async
     * @function UserService.getAccountInfo
     * @description fetches a user's account information
     * @param {String} username user ID
     * @returns {Promise<User>} user details
     * @throws {Error} service exception
     * @see HTTPS
     * @see ServiceException
     */
    async getAccountInfo(username: string): Promise<User> {
        if (!Validations.isString(username)) {
            throw new ServiceException(400, 'invalid username param');
        }

        // execute request and set response
        const response = await this.POST(
            new Request(API_URL, {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify({
                    username
                })
            })
        );
        const body = response.json() as unknown as GetAccountInfoResponse;

        // populate model from response
        if (response.ok) {
            return new User(body.user);
        }
        throw new ServiceException(response.status, body.message);
    }

    /**
     * @public
     * @async
     * @function UserService.updateAccountInfo
     * @description updates a user's account information
     * @param {String} username user ID
     * @param {User | UserJSON} details user account information
     * @returns {Promise<Boolean>} user details
     * @throws {Error} service exception
     * @see HTTPS
     * @see ServiceException
     */
    async updateAccountInfo(username: string, details: User | UserJSON): Promise<boolean> {
        if (!Validations.isString(username)) {
            throw new ServiceException(400, 'invalid username param');
        }
        if (!isUser(details)) {
            throw new ServiceException(400, 'invalid user model');
        }

        const response = await this.POST(
            new Request(API_URL, {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify({
                    username,
                    details
                })
            })
        );
        return response.ok;
    }

    /**
     * @public
     * @async
     * @function UserService.deleteAccount
     * @description deletes a user's account
     * @param {String} username user ID
     * @returns {Promise<Boolean>} user details
     * @throws {Error} service exception
     * @see HTTPS
     * @see ServiceException
     */
    async deleteAccount(username: string): Promise<boolean> {
        if (!Validations.isString(username)) {
            throw new ServiceException(400, 'invalid username param');
        }
        const response = await this.DELETE(
            new Request(API_URL, {
                method: 'DELETE',
                headers: HEADERS,
                body: JSON.stringify({
                    username
                })
            })
        );
        return response.ok;
    }
}
