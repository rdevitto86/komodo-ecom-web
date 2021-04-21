import HTTPS from '../../auxiliary/util/web/network/https';
import { isUser, User, UserJSON } from '../models/user';
import ExceptionFactory from './exceptions/ExceptionFactory';
import Validations from '../../auxiliary/util/validation/validations';

/**
 * @private
 * @constant {String} SERVICE_URL
 * @description url for the User API
 */
 const SERVICE_URL = 'https://www.todo.com';

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
     * @see ExceptionFactory
     */
    async getAccountInfo(username: string): Promise<User> {
        if (!Validations.isString(username)) {
            throw ExceptionFactory.build(400, 'invalid username param');
        }

        // execute request and set response
        const response = await this.POST(
            new Request(SERVICE_URL, {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify({
                    username
                })
            })
        );
        // response body
        const body = response.json();

        // populate model from response
        if (response.ok) {
            return new User(body);
        }
        throw ExceptionFactory.build(response.status, body.message);
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
     * @see ExceptionFactory
     */
    async updateAccountInfo(username: string, details: User | UserJSON): Promise<boolean> {
        if (!Validations.isString(username)) {
            throw ExceptionFactory.build(400, 'invalid username param');
        }
        if (!isUser(details)) {
            throw ExceptionFactory.build(400, 'invalid user model');
        }
        return (await this.POST(
            new Request(SERVICE_URL, {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify({
                    username,
                    details
                })
            })
        )).ok;
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
     * @see ExceptionFactory
     */
    async deleteAccount(username: string): Promise<boolean> {
        if (!Validations.isString(username)) {
            throw ExceptionFactory.build(400, 'invalid username param');
        }
        return (await this.DELETE(
            new Request(SERVICE_URL, {
                method: 'DELETE',
                headers: HEADERS,
                body: JSON.stringify({
                    username
                })
            })
        )).ok;
    }
}
