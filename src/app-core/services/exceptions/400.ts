/**
 * @class
 * @extends {Error}
 * @description creates a new bad request (400) error
 */
export default class Error400 extends Error {
    public name: string = 'Bad Request';
    public http: number = 400;
}
