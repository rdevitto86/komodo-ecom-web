/**
 * @class
 * @extends {Error}
 * @description creates a new gateway timeout (504) error
 */
export default class Error504 extends Error {
    public name: string = 'Gateway Timed Out';
    public http: number = 504;
}
