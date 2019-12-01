import ServiceError from '../common/errors/service-error.js';
import config from '../resources/config/app-config.js';

/**
 * @class
 * @description - collection of API operations of the auth service
 */
class UserService {
    /**
     * @constructor
     * @description - defines a new AuthService object
     */
    constructor() {
        this.user = {}; //set the default user object

        /**
         * @public
         * @function UserService~updateUserAccount
         * @description - sends a request to update a user's account information
         * @param {User} user - updated user object
         * @returns {Object}
         * @throws ServiceError
         */
        this.updateUserAccount = (user = {}) => {
            if(typeof user !== 'object' || (!user.details && !user.billing && !user.address)) {
                throw new ServiceError(500, 'failed to update user information - params invalid', 'UserService');
            }

            return sendServiceRequest('PUT', 'userDetailsUpdate', details);
        };

        /**
         * @private
         * @function UserService~sendServiceRequest
         * @description - helper function that utilizes a http client to send a request to the user service
         * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
         * @param {string} path - server path for request
         * @param {Object} body - request body
         * @returns {Object}
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
         * @throws {ServiceError}
         */
        const sendServiceRequest = async (method = '', path = '', body = {}) => {
            if (config.ALLOWED_HTTP_METHODS.indexOf(method) === -1) {
                throw new ServiceError(500, 'unable to process HTTP request - unrecognized method', 'UserService');
            }
            if (typeof path !== 'string' || path.charAt(0) !== '/') {
                throw new ServiceError(500, 'unable to process HTTP request - operation path invalid', 'UserService');
            }

            //add HTTP request params
            const params = {
                method: method,
                mode: 'cors',
                credentials: 'include', //reference this
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': JSON.stringify(process.env.USER_SERVICE_KEY)
                }
            };

            //TODO - see if the body can be null/{} instead of adding body after

            //add HTTP body (if applicable)
            if (method !== 'GET' && typeof body === 'object') {
                params.body = JSON.stringify(body);
            }

            // //construct the service operation URL
            // const url = (JSON.stringify(process.env.USER_SERVICE_ENDPOINT)).concat(path);

            //send http request
            // return await fetch(url, params);

            const response = {
                status: '200'
            };
            return response;
        };
    }

    /**
     * @public
     * @function UserService#userCache
     * @description - gets the locally cached user object
     * @returns {User}
     */
    get userCache() {
        return this.user;
    }

    /**
     * @public
     * @function UserService#userCache
     * @description - sets the locally cached user object
     * @param {User} user
     */
    set userCache(user) {
        if(user && user instanceof User) {
            this.userCache = user;
        }
    }
}