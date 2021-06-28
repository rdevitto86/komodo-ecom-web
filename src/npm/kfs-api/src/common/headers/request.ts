/**
 * Standard HTTP request headers
 */
export interface RequestHeaders {
    // Cookies?
    // CORS?
    // Referer + Referrer-Policy?
    // Allow?
    // Accept?
    // Caching?

    // standard API heasers
    'Content-Type'?: 'application/json';
    'Content-Language'?: string;
    'User-Agent'?: any;

    // extended headers
    'App-Id'?: string;
    'Access-Bearer'?: string;
    'Refresh-Bearer'?: string;
}

export class RequestHeaders {
    /**
     * @param {RequestHeaders} [params] request properties
     */
    constructor(params?: RequestHeaders) {
        const headers = {
            'Content-Type': 'application/json',
            'App-Id': process.env.APP_ID as string,
        } as RequestHeaders;

        if (params) {
            Object.assign(headers, params);
        }
        return headers;
    }
}
