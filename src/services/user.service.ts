import HTTP from '../npm/kfs-util/web/network/http/rest';
import ServiceException from '../npm/kfs-api/exceptions/service.exception';
import { KEY_SESH_ACCESS_TOKEN } from '../config/session-storage-config';
import User from '../models/users/user.model';
import { isString } from '../npm/kfs-util/validations/primitives/strings';
import { isUser, UserJSON } from '../npm/kfs-api/user-api/schemas/user';
import UserAPIHeaders from '../npm/kfs-api/user-api/headers';
import { GetAccountInfoResponse } from '../npm/kfs-api/user-api/responses';

// /**
//  * @private
//  * @constant {string} BASE_URL
//  * @description User API endpoint
//  */
// const API_URL = `${process.env.USER_API_URL || ''}/${process.env.USER_API_VER || ''}`;

const API_URL = '';

/**
 * Handles requests/responses for the User API
 * @version 1.0.0
 * @extends HTTP
 */
export default class UserService extends HTTP {
    /**
     * Fetches a user's account information
     * @async
     * @param {string} username user ID
     * @returns {Promise<User>} user details
     * @throws {ServiceException} service exception
     */
    async getAccountInfo(username: string): Promise<User> {
        if (!isString(username)) {
            throw new ServiceException(400, 'invalid username param');
        }

        // execute request and set response
        const response = await this.POST(
            new Request(API_URL, {
                method: 'POST',
                headers: new UserAPIHeaders(
                    sessionStorage.getItem(KEY_SESH_ACCESS_TOKEN),
                    null, // TODO
                ),
                body: JSON.stringify({
                    username,
                }),
            }),
        );
        const body = response.json() as unknown as GetAccountInfoResponse;

        // populate model from response
        if (response.ok) {
            return new User(body.user);
        }
        throw new ServiceException(response.status, body.message);
    }

    /**
     * Updates a user's account information
     * @async
     * @param {string} username user ID
     * @param {User | UserJSON} details user account information
     * @returns {Promise<boolean>} user details
     * @throws {ServiceException} service exception
     */
    async updateAccountInfo(username: string, details: User | UserJSON): Promise<boolean> {
        if (!isString(username)) {
            throw new ServiceException(400, 'invalid username param');
        }
        if (!isUser(details)) {
            throw new ServiceException(400, 'invalid user model');
        }

        const response = await this.POST(
            new Request(API_URL, {
                method: 'POST',
                headers: new UserAPIHeaders(
                    sessionStorage.getItem(KEY_SESH_ACCESS_TOKEN),
                    null,
                ),
                body: JSON.stringify({
                    username,
                    details,
                }),
            }),
        );
        return response.ok;
    }

    /**
     * Deletes a user's account
     * @async
     * @param {string} username user ID
     * @returns {Promise<boolean>} user details
     * @throws {ServiceException} service exception
     */
    async deleteAccount(username: string): Promise<boolean> {
        if (!isString(username)) {
            throw new ServiceException(400, 'invalid username param');
        }
        const response = await this.DELETE(
            new Request(API_URL, {
                method: 'DELETE',
                headers: new UserAPIHeaders(
                    sessionStorage.getItem(KEY_SESH_ACCESS_TOKEN),
                    null,
                ),
                body: JSON.stringify({
                    username,
                }),
            }),
        );
        return response.ok;
    }
}
