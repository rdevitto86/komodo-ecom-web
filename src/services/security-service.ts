import HTTPS from '../npm-libs/ts/web/network/https';
import { LoginResponse } from '../npm-libs/ts/api/responses/security-api-responses';
import {
    LoginHeaders,
    LogoutHeaders,
    ValidateSessionHeaders
} from '../npm-libs/ts/api/headers/security-api-headers';
import {
    KEY_SESH_ID_TOKEN,
    KEY_SESH_ACCESS_TOKEN,
    KEY_SESH_REFRESH_TOKEN
} from '../config/session-storage-config';
import ServiceException from '../npm-libs/ts/api/exceptions/service-exception';
import { isString } from '../npm-libs/ts/validations/types/string-validations';

// /**
//  * @private
//  * @constant {string} BASE_URL
//  * @description Security API endpoint
//  */
// const API_URL = `${process.env.SECURITY_API_URL || ''}/${process.env.SECURITY_API_VER || ''}`;

const API_URL = '';

/**
 * Handles requests/responses for the Security API
 * @version 1.0.0
 * @extends HTTPS
 */
export default class SecurityService extends HTTPS {
    /**
     * Logs a user into the current session
     * @async
     * @param {string} username user login ID
     * @param {string} password account password
     * @returns {Promise<void>} success/failure
     * @throws {ServiceException} service exception
     */
    async login(username: string, password: string): Promise<void> {
        if (isString([username, password])) {
            const response = await this.POST(
                new Request(API_URL, {
                    method: 'POST',
                    headers: new LoginHeaders(null),
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
                    sessionStorage.setItem(KEY_SESH_ID_TOKEN, idToken);
                    sessionStorage.setItem(KEY_SESH_ACCESS_TOKEN, accessToken);
                    sessionStorage.setItem(KEY_SESH_REFRESH_TOKEN, refreshToken);
                    return;
                }
            }
            throw new ServiceException(response.status, body.message);
        }
        throw new ServiceException(400, 'invalid username/password param');
    }

    /**
     * Logs-out a user and invalidates session token
     * @async
     * @param {string} username user login ID
     * @returns {Promise<void>} log-out status (true/false)
     * @throws {ServiceException} service exception
     */
    async logout(username: string): Promise<void> {
        if (isString(username) && !sessionStorage.getItem(KEY_SESH_ACCESS_TOKEN)) {
            const response = await this.POST(
                new Request(API_URL, {
                    method: 'POST',
                    headers: new LogoutHeaders(null),
                    body: JSON.stringify({
                        username
                    })
                })
            );

            if (response.ok) {
                sessionStorage.removeItem(KEY_SESH_ACCESS_TOKEN);
                return;
            }
        }
        throw new ServiceException(400, 'invalid username param');
    }

    /**
     * Checks if a session token is valid
     * @async
     * @returns {Promise<boolean>} session validity (true/false/undefined)
     * @throws {ServiceException} service exception
     */
    async valididateSession(): Promise<boolean> {
        return (await this.POST(
            new Request(API_URL, {
                method: 'POST',
                headers: new ValidateSessionHeaders(
                    sessionStorage.getItem(KEY_SESH_ACCESS_TOKEN),
                    null // TODO
                ),
                body: JSON.stringify({
                    session: sessionStorage.getItem(KEY_SESH_ACCESS_TOKEN)
                })
            })
        )).ok;
    }
}
