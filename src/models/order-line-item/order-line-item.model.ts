import { OrderLineItemJSON } from '../../npm/kfs-api/src/order-api/schemas/order-line-item';
import CatalogItem from '../catalog-items/catalog-item.model';
import Promotion from '../promotions/promotion.model';

/**
 * Defines a new OrderLineItem model
 */
export default class OrderLineItem {
    /**
     * Line-item identifier
     */
    id: string | null = null;

    /**
     * Product/service details
     */
    details: CatalogItem | null = null;

    /**
     * Price/cost of item
     */
    basePrice: number | null = null;

    /**
     * Quantity of item ordered
     */
    quantity: number | null = null;

    /**
     * Total cost of line item (price * quantity)
     */
    netCost: number | null = null;

    /**
     * Item-level promotion
     */
    promotion: Promotion | null = null;

    /**
     * @param {OrderLineItemJSON | OrderLineItem} props line item details object
     */
    constructor(props?: OrderLineItemJSON | OrderLineItem) {
        if (props) {
            const {
                id,
                // details,
                // quantity,
                // basePrice,
                // netCost,
                // promotion,
            } = props;

            this.id = id;

            // TODO
        }
    }
}
