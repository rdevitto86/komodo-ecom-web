/**
 * @class
 * @extends {Error}
 * @description creates a new bad gateway (502) error
 */
export default class Error502 extends Error {
    public name: string = 'Bad Gateway';
    public http: number = 502;
}
