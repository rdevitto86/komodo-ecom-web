import ServiceError from '../common/errors/service-error.js';
import config from '../resources/config/app-config.js';

/**
 * @class
 * @description - collection of API operations of the auth service
 */
export class AuthService {
    /**
     * @constructor
     * @description - defines a new AuthService object
     */
    constructor() {
        /**
         * @public
         * @function UserService#executeLogin
         * @description - submits a login request to validate a user
         * @param {string} username
         * @param {string} password
         * @returns {Object}
         * @throws ServiceError
         */
        this.executeLogin = (username, password) => {
            if(typeof username !== 'string' || typeof password !== 'string') {
                throw new ServiceError(500, 'failed to send login request - params invalid', 'AuthService');
            }

            return sendServiceRequest('/login', { 
                username: username, 
                password: password 
            });
        };

        /**
         * @public
         * @function UserService#validateLoginAttempt
         * @description - verifies the user logging in is the correct account owner
         * @param {string} passcode - 6-digit generated key returned by login success
         * @returns {Object}
         * @throws ServiceError
         */
        this.validateLoginAttempt = (passcode) => {
            if(typeof passcode !== 'string' || passcode.length !== 6) {
                throw new ServiceError(500, 'failed to send login validtion request - params invalid', 'AuthService');
            }

            return sendServiceRequest('/otp', {
                passcode: passcode
            });
        };

        /**
         * @public
         * @function UserService#executeLogin
         * @description - submits a logoff request for a given user
         * @param {string} username
         * @returns {Object}
         */
        this.executeLogoff = (username = '') => {
            return sendServiceRequest('/logoff', { 
                username: username 
            });
        };

        /**
         * @private
         * @function AuthService~sendServiceRequest
         * @description - helper function that utilizes a http client to send a request to the auth service
         * @param {string} path - server path for request
         * @param {Object} body - request body
         * @returns {Object}
         * @throws {ServiceError}
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
         */
        const sendServiceRequest = async (path = '', body = {}) => {
            if (config.ALLOWED_HTTP_METHODS.indexOf(method) === -1) {
                throw new ServiceError(500, 'unable to process HTTP request - unrecognized method', 'AuthService');
            }
            if (typeof path !== 'string' || path.charAt(0) !== '/') {
                throw new ServiceError(500, 'unable to process HTTP request - operation path invalid', 'AuthService');
            }

            // //add HTTP request params
            // const params = {
            //     method: 'POST,
            //     mode: 'cors',
            //     credentials: 'include', //TODO - reference this
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'authorization': JSON.stringify(process.env.AUTH_SERVICE_KEY)
            //     },
            //     body: JSON.stringify(body)
            // };

            // // construct the service operation URL
            // const url = (JSON.stringify(process.env.AUTH_SERVICE_ENDPOINT)).concat(path);

            // // send http request
            // return await fetch(url, params);

            const response = {
                status: '200',
                session_token: 'xcdjhw730dbamjsgStg239jn',
                valPasscode: '123456'
            };
            return response;
        };
    }
}