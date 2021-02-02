/**
 * @class
 * @version 1.0.0
 * @description utility class containing object and array functions
 */
export default class ObjectUtil {
    /**
     * @public
     * @static
     * @function ObjectUtil.deepCopy
     * @description creates a unique (deep) object copy
     * @param {Any} obj object to clone
     * @returns {Any}
     */
    static deepCopy(obj) {
        if (!obj || typeof obj !== 'object') {
            return obj;
        }

        const cloned = obj.constructor();

        Object.keys(obj).forEach((key) => {
            cloned[key] = this.deepCopy(obj[key]);
        });

        return cloned;
    }

    /**
     * @public
     * @static
     * @function ObjectUtil.shallowCopy
     * @description creates a shallow object copy
     * @param {Any} obj object to clone
     * @returns {Any}
     */
    static shallowCopy(obj) {
        if (!obj || typeof obj !== 'object') {
            return obj;
        }
        return (obj instanceof Array) ? [...obj] : { ...obj };
    }

    /**
     * @public
     * @static
     * @function ObjectUtil.countProperties
     * @description counts the number of properties on an object
     * @param {Object | Array} obj object to parse
     * @returns {Number}
     */
    static countProperties(obj) {
        return (obj && typeof obj === 'object') ? Object.keys(obj).length : 0;
    }
}
