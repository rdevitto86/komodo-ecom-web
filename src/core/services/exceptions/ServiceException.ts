/**
 * @interfaces
 * @extends {Error}
 * @description defines a generic client/server service exception
 */
 export default class ServiceException extends Error {
    /**
     * @public
     * @property {String} name
     * @description exception title/name
     */
    public name: string;

    /**
     * @public
     * @property {Number} http
     * @description http status code
     */
    public http: number;

    /**
     * @public
     * @override
     * @property {String} message
     * @description custom error message
     */
    public message: string;

    /**
     * @constructor
     * @param {String} name exception name
     * @param {Number} http http status code
     * @param {String} message exception message
     */
    constructor(name: string, http: number, message: string) {
        super();
        this.name = name;
        this.http = http;
        this.message = message;
    }

    /**
     * @public
     * @function ServiceException.print
     * @description prints exception to console
     */
    print() {
        if (console && console.error) {
            console.error(`[ERROR][${this.http}] ${this.message}\n.....\n${this.stack}`);
        }
    }
}
