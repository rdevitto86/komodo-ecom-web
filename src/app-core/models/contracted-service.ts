/**
 * @interface
 * @description - defines a new Contracted Service abstract class
 */
export interface ContractedService {
    getID(): string;
    getCost(): number;
}

/**
 * @class
 * @description - defines a new Contracted Service model
 */
export class ContractedService {
    private id = '';
    private cost = 0;

    constructor(details = undefined) {
        const { id, cost } = details;

        if (typeof id === 'string') {
            this.id = id;
        }
        if (typeof cost === 'number' && !Number.isNaN(cost)) {
            this.cost = cost;
        }

        // this.id = id;
        // this.cost = cost;
    }

    /**
     * @public
     * @function ContractedService#getID
     * @description - gets the service ID
     * @returns {String}
     */
    public getID(): string {
        return this.id || '';
    }

    /**
     * @public
     * @function ContractedService#getCost
     * @description - gets the service ID
     * @returns {String}
     */
    public getCost(): number {
        return this.cost || 0;
    }

    // private setID(id: string | null = undefined): void {
    //     if (typeof id === 'string' || id === null) {
    //         this.id = id;
    //     }
    // }
}
