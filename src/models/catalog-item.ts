/**
 * @interface
 * @description defines an abstract Catalog Item object
 */
export interface CatalogItemAbstract {
    id: string;
    sku?: string;
    price?: number;
    quantity?: number;
    stock?: number;
    description?: string;
}

/**
 * @class
 * @implements {CatalogItemAbstract}
 * @description defines a new Catalog Item model
 */
export class CatalogItem implements CatalogItemAbstract {
    // mandatory properties
    private _id: string;

    // optional properties
    private _sku?: string;
    private _price?: number;
    private _quantity?: number;
    private _stock?: number;
    private _description?: string;

    /**
     * @constructor
     * @description creates a new Catalog Item object
     * @param {String} id item identifier
     * @param {Object<CatalogItemAbstract>} [props] item details object
     */
    constructor(id: string, props?: CatalogItemAbstract) {
        this._id = id || '';

        if (props && props.constructor === Object) {
            const {
                price,
                sku,
                quantity,
                stock,
                description
            } = props;

            this.price = price;
            this.sku = sku;
            this.quantity = quantity;
            this.stock = stock;
            this.description = description;
        }
    }

    /**
     * @public
     * @property {String} id
     * @description catalog item id
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
     * @property {String | Undefined} sku
     * @description item SKU number
     */
    get sku() {
        return this._sku;
    }
    set sku(sku: string | undefined) {
        if (typeof sku === 'number') {
            this._sku = sku;
        }
    }

    /**
     * @public
     * @property {Number | Undefined} price
     * @description item price
     */
    get price() {
        return this._price;
    }
    set price(price: number | undefined) {
        if (typeof price === 'number') {
            this._price = price;
        }
    }

    /**
     * @public
     * @property {Number | Undefined} quantity
     * @description item quantity
     */
    get quantity() {
        return this._quantity;
    }
    set quantity(quantity: number | undefined) {
        if (typeof quantity === 'number' || quantity === undefined) {
            this._quantity = quantity;
        }
    }

    /**
     * @public
     * @property {Number | Undefined} quantity
     * @description item stock level
     */
    get stock() {
        return this._stock;
    }
    set stock(stock: number | undefined) {
        if (typeof stock === 'number' || stock === undefined) {
            this._stock = stock;
        }
    }

    /**
     * @public
     * @property {String | Undefined} description
     * @description item description
     */
    get description() {
        return this._description;
    }
    set description(description: string | undefined) {
        if (typeof description === 'string' || description === undefined) {
            this._description = description;
        }
    }
}
