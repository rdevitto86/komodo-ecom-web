/**
 * @interface
 * @description defines a new Promotion abstract class
 */
export interface PromotionAbstract {
    id: string;
    value: number;
    title?: string;
}

/**
 * @class
 * @version 1.0.0
 * @implements {PromotionAbstract}
 * @description defines a new Promotion model
 */
export class Promotion implements PromotionAbstract {
    private _id: string = '';
    private _value: number = 0;
    private _title?: string;

    /**
     * @constructor
     * @param {Object<PromotionAbstract>} [props] promotions details object
     */
    constructor(props?: PromotionAbstract) {
        if (props && typeof props === 'object') {
            const { id, value, title } = props;

            this.id = id;
            this.value = value;
            this.title = title;
        }
    }

    /**
     * @public
     * @property {String} id
     * @description promotion identifier
     */
    get id() {
        return this._id;
    }
    set id(id: string) {
        if (typeof id === 'string') {
            this._id = id;
        }
    }

    /**
     * @public
     * @property {Number} value
     * @description promotion value
     */
    get value() {
        return this._value;
    }
    set value(value: number) {
        if (typeof value === 'number') {
            this._value = value;
        }
    }

    /**
     * @public
     * @property {Number | Undefined} title
     * @description promotion title/name
     */
    get title() {
        return this._title;
    }
    set title(title: string | undefined) {
        if (typeof title === 'string' || title === undefined) {
            this._title = title;
        }
    }
}
