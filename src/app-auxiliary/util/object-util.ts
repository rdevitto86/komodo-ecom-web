/**
 * @class
 * @version 1.0
 * @description utility class containing object and array functions
 */
export default class ObjectUtil {
    /**
     * @public
     * @static
     * @function ObjectUtil.deepCopy
     * @description creates a unique (deep) object copy
     * @param {Any} obj object to clone
     * @returns {Any} deep copied object
     * TODO - add check for Map object and use Map.keys()
     * TODO - prevent deep copies of unsupported types
     */
    static deepCopy(obj: any) {
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
     * @returns {Any} shallow copied object
     * TODO - add check for Map object
     * TODO - prevent deep copies of unsupported types
     */
    static shallowCopy(obj: any) {
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
     * @param {Object | Array<any>} obj object to parse
     * @returns {Number} number of object properties
     * TODO - add check for Map object and use Map.keys()
     * TODO - prevent deep copies of unsupported types
     */
    static countProperties(obj: Object | Array<any>) {
        return (obj && typeof obj === 'object') ? Object.keys(obj).length : 0;
    }
}
