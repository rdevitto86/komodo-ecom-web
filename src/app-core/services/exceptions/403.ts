/**
 * @class
 * @extends {Error}
 * @description creates a new forbidden access (403) error
 */
export default class Error403 extends Error {
    public name: string = 'Forbidden';
    public http: number = 403;
}
