/**
 * @interfaces
 * @extends {Error}
 * @description defines a generic client/server service exception
 */
 export default class ServiceException extends Error {
    public name: string;
    public code: number;
    public message: string;
    public ok: boolean = false;

    /**
     * @constructor
     * @param {String} name exception name
     * @param {Number} code http status code
     * @param {String} message exception message
     */
    constructor(name: string, code: number, message: string) {
        super();
        this.name = name;
        this.code = code;
        this.message = message;
    }
}
