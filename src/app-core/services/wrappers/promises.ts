/**
 * @class
 * @version 1.0.0
 * @description wraps the native JavaScript Promise functionality with application-specific code
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 */
export default class Promises {
    /**
     * @public
     * @static
     * @function Promises.all
     * @description waits and fufills all promises amoung an array of given promises
     * @param {Promise<any>[]} requests series of parallel promises
     * @returns {any}
     */
    static all(requests: Promise<any>[]): any {
        if (!(requests instanceof Array)) {
            throw Error();
        }

        return Promise.all(requests);
            // .then((responses) => {

            // })
            // .catch((err) => {

            // });
    }

    /**
     * @public
     * @static
     * @function Promises.any
     * @description fufills the first resolved promise amoung an array of given promises
     * @param {Promise<any>[]} requests series of parallel promises
     * @returns {any}
     */
    static any(requests: Promise<any>[]): any {
        if (!(requests instanceof Array)) {
            throw Error();
        }

        return Promise.any(requests);
            // .then(response) => {

            // })
            // .catch((err) => {

            // });
    }

    /**
     * @public
     * @static
     * @function Promises.race
     * @description fufills the first resolved/rejected promise amoung an array of given promises
     * @param {Promise<any>[]} requests series of parallel promises
     * @returns {any}
     */
    static race(requests: Promise<any>[]): any {
        if (!(requests instanceof Array)) {
            throw Error();
        }

        return Promise.race(requests);
            // .then((response) => {

            // })
            // .catch((err) => {

            // });
    }
}
