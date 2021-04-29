import HTTPS from '../npm-libs/typescript/web/network/https';
import {
    KEY_ID_TOKEN,
    KEY_ACCESS_TOKEN,
    KEY_REFRESH_TOKEN
} from '../config/session-storage-config';
import Validations from '../npm-libs/typescript/util/validation/validations';
import ServiceException from '../npm-libs/typescript/exceptions/service-exception';
import { LoginResponse } from './responses/security-api-responses';

// /**
//  * @private
//  * @constant {String} BASE_URL
//  * @description Security API endpoint
//  */
// const API_URL = `${process.env.SECURITY_API_URL || ''}/${process.env.SECURITY_API_VER || ''}`;

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
     * @throws {ServiceException} service exception
     * @see HTTPS
     */
    async login(username: string, password: string): Promise<void> {
        if (Validations.isString([username, password])) {
            const response = await this.POST(
                new Request(API_URL, {
                    method: 'POST',
                    headers: HEADERS,
                    body: JSON.stringify({
                        username,
                        password
                    })
                })
            );
            const body = response.json() as unknown as LoginResponse;

            if (response.ok) {
                const {
                    idToken,
                    accessToken,
                    refreshToken
                } = body;

                // validate tokens exsist and place in session storage
                if (idToken && accessToken && refreshToken) {
                    sessionStorage.setItem(KEY_ID_TOKEN, idToken);
                    sessionStorage.setItem(KEY_ACCESS_TOKEN, accessToken);
                    sessionStorage.setItem(KEY_REFRESH_TOKEN, refreshToken);
                    return;
                }
            }
            throw new ServiceException(response.status, body.message);
        }
        throw new ServiceException(400, 'invalid username/password param');
    }

    /**
     * @public
     * @async
     * @function SecurityService.logout
     * @description logs-out a user and invalidates session token
     * @param {String} username user login ID
     * @returns {Promise<Boolean>} log-out status (true/false)
     * @throws {ServiceException} service exception
     * @see HTTPS
     */
    async logout(username: string): Promise<void> {
        if (Validations.isString(username) && !sessionStorage.getItem(KEY_ACCESS_TOKEN)) {
            const response = await this.POST(
                new Request(API_URL, {
                    method: 'POST',
                    headers: HEADERS,
                    body: JSON.stringify({
                        username
                    })
                })
            );

            if (response.ok) {
                sessionStorage.removeItem(KEY_ACCESS_TOKEN);
                return;
            }
        }
        throw new ServiceException(400, 'invalid username param');
    }

    /**
     * @public
     * @async
     * @function SecurityService.valididateSession
     * @description checks if a session token is valid
     * @returns {Promise<Boolean>} session validity (true/false/undefined)
     * @throws {ServiceException} service exception
     * @see HTTPS
     */
    async valididateSession(): Promise<boolean> {
        return (await this.POST(
            new Request(API_URL, {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify({
                    session: sessionStorage.getItem(KEY_ACCESS_TOKEN)
                })
            })
        )).ok;
    }
}
