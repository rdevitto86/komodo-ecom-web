type HeaderField = string | number | null;

/**
 * builds headers for User API requests
 * @version 1.0.0
 * @extends Headers
 */
export default class UserAPIHeaders extends Headers {
    /**
     * @param {HeaderField} token access token
     * @param {HeaderField} clientID session identifier
     * @returns {Headers} populated request headers
     */
    constructor(token: HeaderField, clientID: HeaderField) {
        super({
            'accept': 'application/json',
            'content-type:': 'application/json',
            'authorization': `Bearer ${token}`,
            'client-id': `${clientID}`
        });
    }
}
