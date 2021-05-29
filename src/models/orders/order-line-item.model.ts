import CatalogItem from '../catalog-items/catalog-item.model';
import Promotion from '../promotions/promotion.model';
import { OrderLineItemJSON } from '../../npm/ec-shared/types/order-line-item';
import { isCatalogItem } from '../../npm/ec-shared/types/catalog-items';
import { isPromotion } from '../../npm/ec-shared/types/promotion';

/**
 * Defines a new OrderLineItem model
 * @version 1.0.0
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
                details,
                quantity,
                basePrice,
                netCost,
                promotion,
            } = props;

            this.id = id;

            // set item details
            if (isCatalogItem(details)) {
                this.details = (details instanceof CatalogItem)
                    ? details : new CatalogItem(details);
            }
            // set item quantity
            if (typeof quantity === 'number') {
                this.quantity = quantity;
            } else if (details && details.quantity) {
                this.quantity = details.quantity;
            }
            // set item price
            if (typeof basePrice === 'number') {
                this.basePrice = basePrice;
            } else if (details && details.price) {
                this.basePrice = details.price;
            }
            // set net-cost
            if (typeof netCost === 'number') {
                this.netCost = netCost;
            } else if (this.quantity && this.basePrice) {
                this.netCost = this.quantity * this.basePrice;
            }
            // set item-level promotion
            if (isPromotion(promotion)) {
                this.promotion = (promotion instanceof Promotion)
                    ? promotion : new Promotion(promotion);
            }
        }
    }
}
