import HTTPS from '../../auxiliary/util/web/network/https';
import ExceptionFactory from './exceptions/ExceptionFactory';
import ValidationUtil from '../../auxiliary/util/primitives/validation-util';

/**
 * @private
 * @constant {String} SERVICE_URL
 * @description url for the Security API
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
 * @private
 * @constant {String} SESH_TOKEN_KEY
 * @description session storage key for the auth token
 */
const SESH_TOKEN_KEY = 'SESSION_AUTH';

/**
 * @class
 * @version 1.0
 * @extends {HTTPS}
 * @description handles requests/responses for the Security API
 */
export default class SecurityService extends HTTPS {
    /**
     * @public
     * @async
     * @function SecurityService.login
     * @description logs a user into the current session
     * @param {String} username user login ID
     * @param {String} password account password
     * @returns {Promise<Boolean>} success/failure
     * @see HTTPS
     * @see ExceptionFactory
     */
    async login(username: string, password: string): Promise<void> {
        if (ValidationUtil.isString([username, password])) {
            const response = await this.POST(
                new Request(SERVICE_URL, {
                    method: 'POST',
                    headers: HEADERS,
                    body: JSON.stringify({
                        username,
                        password
                    })
                })
            );
            const body = response.json();

            if (response.ok) {
                const { session } = body;
                sessionStorage.setItem(SESH_TOKEN_KEY, session);
            }
            throw ExceptionFactory.build(response.status, body.message);
        }
        throw ExceptionFactory.build(400, 'invalid username/password param');
    }

    /**
     * @public
     * @async
     * @function SecurityService.logout
     * @description logs-out a user and invalidates session token
     * @param {String} username user login ID
     * @returns {Promise<Boolean>} log-out status (true/false)
     * @see HTTPS.POST
     */
    async logout(username: string): Promise<void> {
        if (ValidationUtil.isString(username) && !sessionStorage.getItem(SESH_TOKEN_KEY)) {
            const response = await this.POST(
                new Request(SERVICE_URL, {
                    method: 'POST',
                    headers: HEADERS,
                    body: JSON.stringify({
                        username
                    })
                })
            );

            if (response.ok) {
                sessionStorage.removeItem(SESH_TOKEN_KEY);
            }
        }
        throw ExceptionFactory.build(400, 'invalid username param');
    }

    /**
     * @public
     * @async
     * @function SecurityService.valididateSession
     * @description checks if a session token is valid
     * @returns {Promise<Boolean>} session validity (true/false/undefined)
     * @see HTTPS.POST
     */
    async valididateSession(): Promise<boolean> {
        return (await this.POST(
            new Request(SERVICE_URL, {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify({
                    session: sessionStorage.getItem(SESH_TOKEN_KEY)
                })
            })
        )).ok;
    }
}
