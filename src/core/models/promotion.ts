/**
 * @interface
 * @description defines a new Promotion abstract class
 */
export interface PromotionJSON {
    id: string;
    dollarsOff: number;
    percentOff: number;
    hasFreeShipping: boolean;
    hasBOGO: boolean;
    description?: string;
}

/**
 * @class
 * @version 1.0
 * @implements {PromotionJSON}
 * @description defines a new Promotion model
 */
export class Promotion implements PromotionJSON {
    /**
     * @public
     * @property {String} id
     * @description promotion identifier
     */
    public id: string = '';

    /**
     * @public
     * @property {Number} dollarsOff
     * @description number of dollars off
     */
    public dollarsOff: number = 0;

    /**
     * @public
     * @property {Number} percentOff
     * @description percent discounted
     */
     public percentOff: number = 0;

    /**
     * @public
     * @property {Boolean} freeShipping
     * @description should removes shipping cost
     */
     public hasFreeShipping: boolean = false;

    /**
     * @public
     * @property {Boolean} hasBOGO
     * @description has free item with purchase
     */
     public hasBOGO: boolean = false;

    /**
     * @public
     * @property {Number | Undefined} description
     * @description promotion title/name
     */
    public description?: string;

    /**
     * @constructor
     * @param {PromotionJSON} [props] promotions details object
     */
    constructor(props?: PromotionJSON) {
        if (isPromotion(props)) {
            const {
                id,
                dollarsOff,
                percentOff,
                hasFreeShipping,
                hasBOGO,
                description
            } = props;

            this.id = id;
            this.dollarsOff = dollarsOff;
            this.percentOff = percentOff;
            this.hasFreeShipping = hasFreeShipping;
            this.hasBOGO = hasBOGO;
            this.description = description;
        }
    }
}

/**
 * @constant
 * @function isPromotion
 * @description checks if an item is an Promotion type object
 * @param {Any} obj object to reference
 * @returns {Boolean} true/false
 */
 export const isPromotion = (obj: any): obj is PromotionJSON => (
    'id' in obj && 'dollarsOff' in obj && 'percentOff' in obj && 'hasFreeShipping' in obj
);
