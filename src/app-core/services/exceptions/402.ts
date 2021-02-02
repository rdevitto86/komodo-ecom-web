/**
 * @class
 * @extends {Error}
 * @description creates a new payment required (402) error
 */
export default class Error402 extends Error {
    public name: string = 'Payment Required';
    public http: number = 402;
}
