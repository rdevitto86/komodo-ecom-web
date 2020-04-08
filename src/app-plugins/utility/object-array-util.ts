/**
 * @class ObjectUtil
 * @description - utility class containing object and array functions
 */
export default class ObjectArrayUtil {
    /**
     * @public
     * @static
     * @function ObjectUtil#deepCopy
     * @description - creates a unique (deep) object copy
     * @param {Object} obj - object to clone
     * @returns {Object}
     */
    public static deepCopy(obj): object {
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
     * @function ObjectUtil#shallowCopy
     * @description - creates a shallow object copy
     * @param {Object} obj - object to clone
     * @returns {Object}
     */
    public static shallowCopy(obj): object {
        if (!obj || typeof obj !== 'object') {
            return obj;
        }
        return (obj instanceof Array) ? [...obj] : { ...obj };
    }
}
