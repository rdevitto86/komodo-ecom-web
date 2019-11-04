

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
                /**
         * @function AuthService~sendServiceRequest
         * @description - helper function that utilizes a http client to send a request to the user service
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
                        throw new ServiceError(400, 'unable to process HTTP request - unrecognized method', 'AuthService');
                    }
                    if (typeof path !== 'string' || path.charAt(0) !== '/') {
                        throw new ServiceError(400, 'unable to process HTTP request - operation path invalid', 'AuthService');
                    }

                    //construct the service operation URL
                    const url = (JSON.stringify(process.env.USER_SERVICE_ENDPOINT)).concat(path);

                    //add HTTP request params
                    const params = {
                        method: method,
                        mode: 'cors',
                        credentials: 'include', //reference this
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': JSON.stringify(process.env.USER_SERVICE_KEY)
                        }
                    }

                    //add HTTP body (if applicable)
                    if(method !== 'GET' && typeof body === 'object') {
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
    }
}