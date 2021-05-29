import { isPromotion, PromotionJSON } from '../../npm/ec-shared/types/promotion';

/**
 * Defines a new Promotion model
 * @version 1.0.0
 */
export default class Promotion {
    /**
     * Unique promotion identifier
     */
    id: string | null = null;

    /**
     * Promotion title/header
     */
    title: string | null = null;

    /**
     * Promotion description
     */
    description: string | null = null;

    /**
     * Denotes if promotion has dollars-off applied
     */
    dollarsOff: number = 0;

    /**
     * Denotes if promotion has percentage-off applied
     */
    percentOff: number = 0;

    /**
     * Denotes if promotion has free shipping applied
     */
    hasFreeShipping: boolean = false;

    /**
     * Denotes if promotion has buy one, get one applied
     */
    hasBOGO: boolean = false;

    /**
     * @param {PromotionJSON | Promotion} [props] promotions details object
     */
    constructor(props?: PromotionJSON | Promotion) {
        if (isPromotion(props)) {
            const {
                id,
                title,
                description,
                dollarsOff,
                percentOff,
                hasFreeShipping,
                hasBOGO,
            } = props;

            this.id = id;

            if (title) {
                this.title = title;
            }
            if (description) {
                this.description = description;
            }
            if (typeof dollarsOff === 'number') {
                this.dollarsOff = dollarsOff;
            }
            if (typeof percentOff === 'number') {
                this.percentOff = percentOff;
            }
            if (typeof hasFreeShipping === 'boolean') {
                this.hasFreeShipping = hasFreeShipping;
            }
            if (typeof hasBOGO === 'boolean') {
                this.hasBOGO = hasBOGO;
            }
        }
    }
}
