import { ServiceJSON, isService } from '../../npm/ec-shared/types/services';
import CatalogItem from './catalog-item.model';
import Product from './product.model';

/**
 * A schedulable, catalog service.
 * @version 1.0.0
 * @extends {CatalogItem}
 */
export default class Service extends CatalogItem {
    /**
     * Total expense of service
     */
    total: number | null = null;

    /**
     * List of products included in service
     */
    products: Product[] = [];

    /**
     * Date of service
     */
    serviceDate: Date | string | null = null;

    /**
     * Estimate on minutes required
     */
    estimateMinutes: number | null = null;

    /**
     * Estimate on hours required
     */
    estimateHours: number | null = null;

    /**
     * Estimate on days required
     */
    estimateDays: number | null = null;

    /**
     * Name of service technician
     */
    technicianName: string | null = null;

    /**
     * Cost of parts
     */
    partsCost: number | null = null;

    /**
     * Labor rate for technician and/or company
     */
    laborCost: number | null = null;

    /**
     * @param {Service | ServiceJSON} [props] service details
     */
    constructor(props?: Service | ServiceJSON) {
        super(props);

        if (isService(props)) {
            const {
                total,
                products,
                serviceDate,
                estimateMinutes,
                estimateHours,
                estimateDays,
                technicianName,
                partsCost,
                laborCost,
            } = props;

            this.partsCost = partsCost;
            this.laborCost = laborCost;

            // TODO - determine if total price should come from service or calculated dynamically
            // TODO - determine if partsCost is null, default to adding-up products in array

            if (total) {
                this.total = partsCost + laborCost;
            }

            // set service parts/products
            if (products instanceof Array && products.length > 0) {
                for (let i = 0, len = products.length; i < len; i++) {
                    this.products.push(new Product(products[i]));
                }
            }

            // set scheduled date
            if (serviceDate) {
                this.serviceDate = serviceDate;
            }

            // set estimated job time
            this.estimateMinutes = estimateMinutes;
            this.estimateHours = estimateHours;
            this.estimateDays = estimateDays;

            // set technician details
            if (technicianName) {
                this.technicianName = technicianName;
            }
        }
    }
}
