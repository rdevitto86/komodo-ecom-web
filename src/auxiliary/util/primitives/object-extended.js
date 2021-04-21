/**
 * @class
 * @version 1.0
 * @description utility class that extends JavScript Object functions
 */
export default class ObjectExtended {
    /**
     * @public
     * @static
     * @function ObjectExtended.deepCopy
     * @description creates a unique (deep) object copy
     * @param {Any} obj object to clone
     * @returns {Any} deep copied object
     * TODO - add check for Map object and use Map.keys()
     * TODO - prevent deep copies of unsupported types
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
     * @function ObjectExtended.shallowCopy
     * @description creates a shallow object copy
     * @param {Any} obj object to clone
     * @returns {Any} shallow copied object
     * TODO - add check for Map object
     */
    static shallowCopy(obj) {
        if (!obj || typeof obj !== 'object') {
            return obj;
        }
        return (obj instanceof Array) ? [...obj] : { ...obj };
    }
}
