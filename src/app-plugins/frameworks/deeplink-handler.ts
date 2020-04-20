/**
 * @interface
 * @description defines a new abstract class for Deeplink Errors
 */
export interface DeeplinkError {
    name: string;
    message: string;
    stack: string;
    path: string;
    domain: string;
}

/**
 * @class
 * @description creates a new Deeplink Error object
 * @param {Error} e runtime error object
 * @param {String} path executed deeplink path
 * @param {String} domain application domain
 * @returns {DeeplinkError} DeeplinkError
 */
export class DeeplinkError extends Error {
    constructor(path: string, domain: string, e?: Error) {
        super();

        this.name = 'DeeplinkError';
        this.path = path;
        this.domain = domain;

        if (e instanceof Error) {
            this.message = e.message;
            this.stack = e.stack || 'DeeplinkRouter@unknown';
        } else {
            this.message = 'Unexpected error occured while executing deeplink';
            if (!this.stack) {
                this.stack = Error().stack || 'DeeplinkRouter@unknown';
            }
        }
    }
}

/**
 * @class
 * @singleton
 * @constant DeeplinkRouter
 * @version 0.1.0
 * @description - creates a new Deeplink Handler singleton used to handle
 * authorized app routing based off marketing emails, SMS notifications, etc.
 */
export default new class DeeplinkRouter {
    //config properties
    private _initComplete = false;

    //app-specific properties
    private appDomain = '';

    //app-specific callbacks
    private appLoginCallback: Function | null = null;
    private appLogoffCallback: Function | null = null;

    /**
     * @public
     * @function DeeplinkHandler#openDeeplink
     * @description opens a deeplink URL within the app
     * @param {String} path application resource path to navigate to
     * @throws DeeplinkError
     */
    openDeeplink(path: string): void {
        try {
            if (!this._initComplete) {
                //TODO - log config warning
                return;
            }

            console.log(path);
            //TODO
        } catch (e) {
            e.message = 'failed to open deeplink path';
            throw new DeeplinkError(path, this.appDomain, e);
        }
    }

    /**
     * 
     */
    validateDeeplink(path: string): boolean {
        try {
            if (!this._initComplete) {
                //TODO - log config warning
                return false;
            }

            console.log(path);

            //TODO - check app routes/file structure

            return true;
        } catch (e) {
            e.message = 'failed to validate deeplink path';
            throw new DeeplinkError(path, this.appDomain, e);
        }
    }

    /**
     * @public
     * @function DeeplinkHandler#init
     * @description initializes the instance with application resources
     * @param {Object} config configuration object containing app-specific properties/resources
     * @returns {Boolean} boolean
     */
    init(config: any = {}): boolean {
        if (!this._initComplete && config && typeof config === 'object') {
            const {
                appDomain, loginCallback, logoffCallback
            } = config;

            //validate app properties
            if (typeof appDomain === 'string') {
                //TODO - validate URL
                this.appDomain = appDomain;
            }

            //validate app callbacks
            if (typeof loginCallback === 'function') {
                this.appLoginCallback = loginCallback;
            }
            if (typeof logoffCallback === 'function') {
                this.appLogoffCallback = logoffCallback;
            }

            //complete initialization
            this._initComplete = true;
        }
        return this._initComplete;
    }

    /**
     * @public
     * @readonly
     * @property initComplete
     * @description gets the instance's initialization status
     * @returns {Boolean} boolean
     */
    get initComplete(): boolean {
        return this._initComplete;
    }
}();
