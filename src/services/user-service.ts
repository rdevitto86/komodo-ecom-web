import { UserAbstract } from '../models/user';
import ValidationUtil from '../plugins/komodo-util/validation-util';

/**
 * @class
 * @description handles requests/responses for the User service
 */
export default class UserService {
    /**
     * @private
     * @static
     * @readonly
     * @property {String} _SERVICE_URL
     * @description url for the User service
     */
    private static readonly _SERVICE_URL = 'https://www.todo.com';

    /**
     * @public
     * @static
     * @async
     * @function UserService.getAccountInfo
     * @description fetches a user's account information
     * @param {String} username user ID
     * @returns {Promise<Object | Undefined>} user details
     */
    static async getAccountInfo(username: string): Promise<Object | undefined> {
        if (!ValidationUtil.isString(username)) {
            return undefined;
        }

        const response = await fetch(this._SERVICE_URL, {
            method: 'POST',
            body: JSON.stringify({ username })
        });

        return (response.ok) ? response.json() : undefined;
    }

    /**
     * @public
     * @static
     * @async
     * @function UserService.updateAccountInfo
     * @description updates a user's account information
     * @param {String} username user ID
     * @param {Object<UserAbstract>} data updated user information
     * @returns {Promise<Boolean>} user details
     */
    static async updateAccountInfo(username: string, payload: UserAbstract): Promise<Boolean> {
        if (!ValidationUtil.isString(username)) {
            return false;
        }

        const response = await fetch(this._SERVICE_URL, {
            method: 'POST',
            body: JSON.stringify({
                username,
                payload
            })
        });

        return response.ok;
    }

    /**
     * @public
     * @static
     * @async
     * @function UserService.deleteAccount
     * @description deletes a user's account
     * @param {String} username user ID
     * @returns {Promise<Boolean>} user details
     */
    static async deleteAccount(username: string): Promise<Boolean> {
        if (!ValidationUtil.isString(username)) {
            return false;
        }

        const response = await fetch(this._SERVICE_URL, {
            method: 'DELETE',
            body: JSON.stringify({ username })
        });

        return response.ok;
    }
}
