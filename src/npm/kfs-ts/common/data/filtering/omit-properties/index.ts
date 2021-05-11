/**
 * Omits specified properties from extensible classes
 * @version 1.0.0
 * @param {T} classRef object/class to omit properties from
 * @param {K[]} keys list of properties names to be removed
 * @return {Omit<T, K[]>} object/class with omitted properties
 */
 export default function OmitProps<T, K extends keyof T>(
    classRef: T,
    keys: readonly K[],
): Omit<T, typeof keys[number]> {
    if (classRef && keys && keys.length > 0) {
        // loop through property keys and remove from classRef
        for (let i = 0, len = keys.length; i < len; i++) {
            if (classRef[keys[i]]) {
                delete classRef[keys[i]];
            }
        }
    }
    return classRef;
}
