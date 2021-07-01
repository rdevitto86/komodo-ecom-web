// import HTTP from '../npm/kfs-web/http';
// import {
//     KEY_SESH_ID_TOKEN,
//     KEY_SESH_ACCESS_TOKEN,
//     KEY_SESH_REFRESH_TOKEN,
// } from '../config/session-storage.config';
// import HttpException from '../npm/kfs-web/http-exceptions';
// import { isString } from '../npm/kfs-util/validations/primitives/strings';
// import { LoginResponse } from '../npm/kfs-api/security-api/responses';
// import { 
//     LoginHeaders, 
//     LogoutHeaders, 
//     ValidateSessionHeaders,
// } from '../npm/kfs-api/security-api/headers';

/**
 * Handles requests/responses for the Security API
 */
export default class SecurityService {
    readonly API_URL = process.env.AUTH_API_URL || '';

    /**
     * Logs a user into the current session
     * @async
     * @param {string} username user login ID
     * @param {string} password account password
     * @returns {Promise<void>} success/failure
     * @throws {ServiceException} service exception
     */
    // async login(username: string, password: string): Promise<void> {
    //     if (isString([username, password])) {
    //         const request = new Request(this.URL, {
    //             method: 'POST',
    //             headers: new LoginHeaders(null),
    //             body: JSON.stringify({
    //                 username,
    //                 password,
    //             }),
    //         });

    //         const response = await this.POST(request);
    //         const body = response.json() as unknown as LoginResponse;

    //         if (response.ok) {
    //             const {
    //                 idToken,
    //                 accessToken,
    //                 refreshToken,
    //             } = body;

    //             // validate tokens exsist and place in session storage
    //             if (idToken && accessToken && refreshToken) {
    //                 sessionStorage.setItem(KEY_SESH_ID_TOKEN, idToken);
    //                 sessionStorage.setItem(KEY_SESH_ACCESS_TOKEN, accessToken);
    //                 sessionStorage.setItem(KEY_SESH_REFRESH_TOKEN, refreshToken);
    //                 return;
    //             }
    //         }
    //         throw new HttpException(response.status, body.message);
    //     }
    //     throw new HttpException(400, 'invalid username/password param');
    // }

    /**
     * Logs-out a user and invalidates session token
     * @async
     * @param {string} username user login ID
     * @returns {Promise<void>} log-out status (true/false)
     * @throws {ServiceException} service exception
     */
    // async logout(username: string): Promise<void> {
    //     if (isString(username) && !sessionStorage.getItem(KEY_SESH_ACCESS_TOKEN)) {
    //         const request = new Request(this.URL, {
    //             method: 'POST',
    //             headers: new LogoutHeaders(null),
    //             body: JSON.stringify({
    //                 username,
    //             }),
    //         });

    //         const response = await this.POST(request);

    //         if (response.ok) {
    //             sessionStorage.removeItem(KEY_SESH_ACCESS_TOKEN);
    //             return;
    //         }
    //     }
    //     throw new HttpException(400, 'invalid username param');
    // }

    /**
     * Checks if a session token is valid
     * @async
     * @returns {Promise<boolean>} session validity (true/false/undefined)
     * @throws {ServiceException} service exception
     */
    // async valididateSession(): Promise<boolean> {
    //     const request = new Request(this.URL, {
    //         method: 'POST',
    //         headers: new ValidateSessionHeaders(
    //             sessionStorage.getItem(KEY_SESH_ACCESS_TOKEN),
    //             null, // TODO
    //         ),
    //         body: JSON.stringify({
    //             session: sessionStorage.getItem(KEY_SESH_ACCESS_TOKEN),
    //         }),
    //     });

    //     const response = await this.POST(request);
    //     return response.ok;
    // }
}
