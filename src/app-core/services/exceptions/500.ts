/**
 * @class
 * @extends {Error}
 * @description creates a new internal server (500) error
 */
export default class Error500 extends Error {
    public name: string = 'Internal Server Error';
    public http: number = 500;
}
