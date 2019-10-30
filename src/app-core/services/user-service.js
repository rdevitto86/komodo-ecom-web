import ServiceError from '../common/errors/service-error.js';
import config from '../resources/config/app-config.js';

/**
 * @class
 * @description - collection of API operations of the User service
 */
export class UserService {
    /**
     * @constructor
     * @description - defines a new UserService object
     */
    constructor() {
        /**
         * @function UserService~sendServiceRequest
         * @description - utilizes a http client to send a request to the user service
         * @param {string} body - server path for request
         * @param {Object} params - request hbody
         * @returns {JSON}
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
         * @throws {ServiceError}
         */
        const sendServiceRequest = async (method = '', path = '', body = {}) => {
            return new Promise((resolve, reject) => {
                try {
                    if (config.ALLOWED_HTTP_METHODS.indexOf(method) === -1) {
                        throw new ServiceError(400, 'unable to process HTTP request - unrecognized method', 'UserService');
                    }
                    if (typeof path !== 'string' || path.charAt(0) !== '/') {
                        throw new ServiceError(400, 'unable to process HTTP request - operation path invalid', 'UserService');
                    }

                    //TODO add session and CSRF tokens
                    const url = (JSON.stringify(process.env.USER_SERVICE_ENDPOINT)).concat(path);
                    // const response = await fetch(url, {
                    //     method: method,
                    //     mode: 'cors',
                    //     credentials: 'include', //reference this
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //         'authorization': JSON.stringify(process.env.USER_SERVICE_KEY)

                    //     },
                    //     body: (method !== 'GET') 
                    //         ? JSON.stringify((typeof body === 'object') ? body : '')
                    //         : undefined
                    // });

                    const response = {
                        status: '200'
                    };

                    if (response.status === '200') {
                        resolve(response);
                    } else {
                        throw new ServiceError(response.status, response.message, 'UserService');
                    }
                } catch (error) {
                    //TODO - log error
                    reject(error);
                }
            });
        };

        /**
         * @function UserService#executeLogin
         * @description - submits a login request to validate a user
         * @param {string} username
         * @param {string} password
         */
        this.executeLogin = (username = '', password = '') => {
            sendServiceRequest('POST', '/login', { 
                username: username, 
                password: password 
            });
        };
    }
}