import { User, UserJSON } from '../models/user';
import HTTP from '../../app-auxiliary/util/web/network/http';
import ValidationUtil from '../../app-auxiliary/util/primitives/validation-util';

/**
 * @class
 * @version 1.0
 * @extends {HTTP}
 * @description handles requests/responses for the User service
 */
export default class UserService extends HTTP {
    /**
     * @private
     * @readonly
     * @property {String} _SERVICE_URL
     * @description url for the User service
     */
    private readonly _SERVICE_URL = 'https://www.todo.com';

    /**
     * @public
     * @async
     * @function UserService.getAccountInfo
     * @description fetches a user's account information
     * @param {String} username user ID
     * @returns {Promise<Object | Undefined>} user details
     */
    async getAccountInfo(username: string): Promise<Object | undefined> {
        if (!ValidationUtil.isString(username)) {
            return undefined;
        }

        const response = await this.POST(this._SERVICE_URL, { username })
            .catch((error) => { throw error; });

        return (response.ok) ? new User(response.json()) : undefined;
    }

    /**
     * @public
     * @async
     * @function UserService.updateAccountInfo
     * @description updates a user's account information
     * @param {String} username user ID
     * @param {Object<UserJSON>} data updated user information
     * @returns {Promise<Boolean>} user details
     */
    async updateAccountInfo(username: string, payload: UserJSON): Promise<Boolean> {
        if (!ValidationUtil.isString(username)) {
            return false;
        }

        const response = await this.POST(this._SERVICE_URL, { username, payload });
        return response.ok;
    }

    /**
     * @public
     * @async
     * @function UserService.deleteAccount
     * @description deletes a user's account
     * @param {String} username user ID
     * @returns {Promise<Boolean>} user details
     */
    async deleteAccount(username: string): Promise<Boolean> {
        if (!ValidationUtil.isString(username)) {
            return false;
        }

        const response = await this.DELETE(this._SERVICE_URL, { username });
        return response.ok;
    }
}
