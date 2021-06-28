import HTTP from '../npm/kfs-web/http';
// import HttpException from '../npm/kfs-web/http-exceptions';
// import { UserAPIHeaders } from '../npm/kfs-api/user-api/headers';
// import { GetAccountInfoResponse } from '../npm/kfs-api/user-api/responses';
// import User from '../models/users/user.model';
// import { 
//     isUser, 
//     UserJSON,
// } from '../npm/kfs-api/user-api/schemas/user';
// import { KEY_SESH_ACCESS_TOKEN } from '../config/session-storage.config';
// import { isString } from '../npm/kfs-util/validations/primitives/strings';

/**
 * Handles requests/responses for the User API
 * @extends HTTP
 */
export default class UserService extends HTTP {
    readonly URL = process.env.USER_API_URL || '';

    /**
     * Fetches a user's account information
     * @async
     * @param {string} username user ID
     * @returns {Promise<User>} user details
     * @throws {ServiceException} service exception
     */
    // async getAccountInfo(username: string): Promise<User> {
    //     if (!isString(username)) {
    //         throw new HttpException(400, 'invalid username param');
    //     }

    //     const request = new Request(this.URL, {
    //         method: 'POST',
    //         headers: new UserAPIHeaders(
    //             sessionStorage.getItem(KEY_SESH_ACCESS_TOKEN),
    //             null, // TODO
    //         ),
    //         body: JSON.stringify({
    //             username,
    //         }),
    //     });

    //     // execute request and set response
    //     const response = await this.POST(request);
    //     const body = response.json() as unknown as GetAccountInfoResponse;

    //     // populate model from response
    //     if (response.ok) {
    //         return new User(body.user);
    //     }
    //     throw new HttpException(response.status, body.message);
    // }

    /**
     * Updates a user's account information
     * @async
     * @param {string} username user ID
     * @param {User | UserJSON} details user account information
     * @returns {Promise<boolean>} user details
     * @throws {ServiceException} service exception
     */
    // async updateAccountInfo(username: string, details: User | UserJSON): Promise<boolean> {
    //     if (!isString(username)) {
    //         throw new HttpException(400, 'invalid username param');
    //     }
    //     if (!isUser(details)) {
    //         throw new HttpException(400, 'invalid user model');
    //     }

    //     const request = new Request(this.URL, {
    //         method: 'POST',
    //         headers: new UserAPIHeaders(
    //             sessionStorage.getItem(KEY_SESH_ACCESS_TOKEN),
    //             null,
    //         ),
    //         body: JSON.stringify({
    //             username,
    //             details,
    //         }),
    //     });

    //     const response = await this.POST(request);
    //     return response.ok;
    // }

    /**
     * Deletes a user's account
     * @async
     * @param {string} username user ID
     * @returns {Promise<boolean>} user details
     * @throws {ServiceException} service exception
     */
    // async deleteAccount(username: string): Promise<boolean> {
    //     if (!isString(username)) {
    //         throw new HttpException(400, 'invalid username param');
    //     }

    //     const request = new Request(this.URL, {
    //         method: 'DELETE',
    //         headers: new UserAPIHeaders(
    //             sessionStorage.getItem(KEY_SESH_ACCESS_TOKEN),
    //             null,
    //         ),
    //         body: JSON.stringify({
    //             username,
    //         }),
    //     });

    //     const response = await this.DELETE(request);
    //     return response.ok;
    // }
}
