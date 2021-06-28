import { CatalogItemJSON, isCatalogItem } from '../../types/catalog-item';
import { ProductJSON } from '../catalog-product';

/**
 * Defines an abstract Catalog Service object
 */
export interface ServiceJSON extends CatalogItemJSON {
    total?: number;
    products: ProductJSON[];
    serviceDate?: Date | string;
    estimateMinutes: number;
    estimateHours: number;
    estimateDays: number;
    technicianName?: string;
    partsCost: number,
    laborCost: number;
}

/**
 * Checks if an item is an Catalog Service type object
 * @param {any} obj object to reference
 * @returns {boolean} true/false
 */
export function isService(obj: any): obj is ServiceJSON {
    return isCatalogItem(obj) && 'products' in obj;
}
