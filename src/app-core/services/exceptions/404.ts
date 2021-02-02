/**
 * @class
 * @extends {Error}
 * @description creates a new resource not found (404) error
 */
export default class Error404 extends Error {
    public name: string = 'Not Found';
    public http: number = 404;
}
