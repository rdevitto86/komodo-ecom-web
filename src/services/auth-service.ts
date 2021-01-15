import ValidationUtil from '../plugins/komodo-util/validation-util';

/**
 * @class
 * @description handles requests/responses for the Authorization service
 */
export default class AuthService {
    /**
     * @private
     * @static
     * @readonly
     * @property {String} _SERVICE_URL
     * @description url for the Authorization service
     */
    private static readonly _SERVICE_URL = 'https://www.todo.com';

    /**
     * @public @static @async
     * @function AuthService.login
     * @description logs a user into the current session
     * @param {String} username user login ID
     * @param {String} password account password
     * @returns {Promise<Object | Undefined>} account information
     */
    static async login(username: string, password: string): Promise<Object | undefined> {
        if (!ValidationUtil.isString([username, password])) {
            return undefined;
        }

        const response = await fetch(this._SERVICE_URL, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = response.json();

        // TODO - determine if token should be set here or in login component
        if (response.ok) {
            // TODO - set session token
        }
        return data;
    }

    /**
     * @public
     * @static
     * @async
     * @function AuthService.logout
     * @description logs-out a user and invalidates session token
     * @param {String} username user login ID
     * @returns {Promise<Boolean>} log-out status (true/false)
     */
    static async logout(username: string): Promise<boolean> {
        if (!ValidationUtil.isString(username)) {
            return false;
        }

        const response = await fetch(this._SERVICE_URL, {
            method: 'POST',
            body: JSON.stringify({ username })
        });

        // TODO - determine if token should be removed here or in login component
        if (response.ok) {
            // TODO - remove session token
            return true;
        }
        return false;
    }

    /**
     * @public
     * @static
     * @async
     * @function AuthService.valididateSession
     * @description checks if a session token is valid
     * @returns {Promise<Boolean | Undefined>} session validity (true/false/undefined)
     */
    static async valididateSession(): Promise<Boolean | undefined> {
        const response = await fetch(this._SERVICE_URL, {
            method: 'POST',
            body: JSON.stringify({
                // TODO - get session token
            })
        });

        // @ts-ignore
        return (response.ok) ? (response.json()).isValid : undefined;
    }
}
