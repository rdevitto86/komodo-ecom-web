/**
 * @interface
 * @description - defines a new Contracted Service abstract class
 */
export interface ContractedService {
    id: string;
    cost: number;
}

/**
 * @class
 * @description - defines a new Contracted Service model
 */
export class ContractedService {
    /**
     * @constructor
     * @description - creates a new Contracted Service object
     * @param {ContractedService} details - object containing service details
     */
    constructor(details?: ContractedService) {
        if (!details || details.constructor !== Object) {
            return;
        }

        const { id, cost } = details;

        this.id = id;
        this.cost = cost;
    }
}
