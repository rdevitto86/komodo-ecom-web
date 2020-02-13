/**
 * @class ObjectUtil
 * @description - utility class containing object and array functions
 */
export class ObjectArrayUtil {
    /**
     * @public
     * @function ObjectUtil#deepCopy
     * @description - creates a unique (deep) object copy
     * @param {Any} obj - object to clone 
     * @returns {Any}
     */
    deepCopy(obj = undefined) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        const cloned = obj.constructor();
        for (let key in obj) {
            cloned[key] = this.deepCopy(obj[key]);
        }  
        return cloned;
    }

    /**
     * @public
     * @function ObjectUtil#shallowCopy
     * @description - creates a shallow object copy
     * @param {Any} obj - object to clone
     * @returns {Any}
     */
    shallowCopy(obj = undefined) {
        const isArray = obj instanceof Array;

        if(obj && (typeof obj === 'object' || isArray)) {
            return (isArray) ? [ ...obj ] : { ...obj };
        } else {
            return obj;
        }
    }
}