/**
 * @class
 * @extends {Error}
 * @description creates a new method not allowed (405) error
 */
export default class Error405 extends Error {
    public name: string = 'Method Not Allowed';
    public http: number = 405;
}
