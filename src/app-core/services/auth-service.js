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
     * @param {function} preValidationCallback
     * @param {function} postValidationCallback
     */
    constructor(preValidationCallback, postValidationCallback) {
        const publicKeys = {}; 

        /**
         * @function AuthService~sendServiceRequest
         * @description - helper function that utilizes a http client to send a request to the auth service
         * @param {string} body - server path for request
         * @param {Object} params - request hbody
         * @returns {JSON}
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
         * @throws {ServiceError}
         */
        const sendServiceRequest = async (method = '', operationPath = '', body = {}) => {
            return new Promise((resolve, reject) => {
                try {
                    if (config.ALLOWED_HTTP_METHODS.indexOf(method) === -1) {
                        throw new ServiceError(400, 'unable to process HTTP request - unrecognized method', 'AuthService');
                    }
                    if (typeof operationPath !== 'string' || operationPath.charAt(0) !== '/') {
                        throw new ServiceError(400, 'unable to process HTTP request - operation path invalid', 'AuthService');
                    }

                    //construct the service operation URL
                    const url = (JSON.stringify(process.env.AUTH_SERVICE_ENDPOINT)).concat(operationPath);

                    //add HTTP request params
                    const params = {
                        method: method,
                        mode: 'cors',
                        credentials: 'include', //reference this
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': JSON.stringify(process.env.AUTH_SERVICE_KEY)
                        }
                    }

                    //add HTTP body (if applicable)
                    if(method === 'GET' && typeof body === 'object') {
                        params.body = JSON.stringify(body);
                    }

                    //send http request
                    // const response = await fetch(url, params);

                    const response = {
                        status: '200'
                    };

                    if (response.status === '200') {
                        resolve(response);
                    } else {
                        throw new ServiceError(response.status, response.message, 'AuthService');
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
            const authResponse = await sendServiceRequest('POST', '/login', { 
                username: username, 
                password: password 
            });

            //inform login component that the user needs to validate via OTP
            preValidationCallback();

            const validationResponse = await sendServiceRequest('GET', '/login/validation/687');

            //inform login component that the OTP validation has occured
            postValidationCallback();
        };

        /**
         * @function UserService#executeLogin
         * @description - submits a logoff request for a given user
         * @param {string} username
         */
        this.executeLogoff = (username = '') => {
            sendServiceRequest('POST', '/login', { username: username });
        };

        /**
         * @function UserService#getOTPKey
         * @description - submits a logoff request for a given user
         * @returns {string}
         */
        this.getOTPKey = () => {
            return publicKeys.otp;
        }
    }
}