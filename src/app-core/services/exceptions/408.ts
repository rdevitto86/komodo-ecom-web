/**
 * @class
 * @extends {Error}
 * @description creates a new request timeout (408) error
 */
export default class Error408 extends Error {
    public name: string = 'Request Timeout';
    public http: number = 408;
}
