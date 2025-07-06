import { uuid } from '@/utils/uuid';
import OrderItem, { OrderItemSubType } from '../order-item/order-item.model';
import User from '../user/user.model';
import Payment from '../payment/payment.model';
import Discount, { OrderDiscountScope, OrderDiscountState } from '../discount/discount.model';
import RuntimeError from '../errors/runtime/runtime.model';

export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'IN-PROGRESS' | 'PARTIAL COMPLETE' | 'COMPLETED' | 'CANCELLED';

type OrderHistory = {
  status: OrderStatus;
  timestamp: Date;
  note?: string;
};

interface OrderType {
  id: string; // orderItemId
  status: OrderStatus;
  itemsProduct?: OrderItem<'PRODUCT'>[];
  itemsService?: OrderItem<'SERVICE'>[];
  billing: Payment;
  subtotal: number;
  totalTax: number;
  totalFees: number;
  totalShipping: number;
  discounts: Discount[];
  totalDiscounts: number
  finalTotal: number;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  history: OrderHistory[];
}

export default class Order {
  id: string = uuid(); // orderItemId
  status: OrderStatus = 'PENDING';
  itemsProduct: Map<string, OrderItem<'PRODUCT'>> = new Map();
  itemsService: Map<string, OrderItem<'SERVICE'>> = new Map();
  subtotal: number = 0;
  totalTax: number = 0;
  totalFees: number = 0;
  totalShipping: number = 0;
  discount?: OrderDiscountState;
  finalTotal: number = 0;
  user?: User;
  billing?: Payment;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  history: Array<OrderHistory> = [{
    status: this.status,
    timestamp: this.createdAt,
    note: 'Order created',
  }];

  /**
   * Builds a new Order from an existing order
   */
  static fromOrder(order: OrderType) {
    if (!order?.id || !order?.itemsProduct?.length && !order?.itemsService?.length || !order?.history) {
      throw new RuntimeError('Failed to copy order - Invalid order data');
    }
    const itemsProduct = order?.itemsProduct || [];
    const itemsService = order?.itemsService || [];

    const cloned = new Order([...itemsProduct, ...itemsService], order?.user, order.billing);

    cloned.id = order.id;
    cloned.status = order.status;
    cloned.subtotal = order.subtotal;
    cloned.finalTotal = order.finalTotal;
    cloned.createdAt = order.createdAt;
    cloned.updatedAt = order.updatedAt;
    cloned.history = order.history;

    return cloned;
  }

  constructor(items: OrderItem<OrderItemSubType>[], user?: User, billing?: Payment) {
    if (items?.length) {
      items.forEach(item => {
        if (item.type === 'PRODUCT') {
          this.itemsProduct.set(item.id, item as OrderItem<'PRODUCT'>);
        } else if (item.type === 'SERVICE') {
          this.itemsService.set(item.id, item as OrderItem<'SERVICE'>);
        }
      });
      this.calculateTotals();
    }
    if (user) this.user = user;
    if (billing) this.billing = billing;
  }

  get items() { return [...this.itemsProduct.values(), ...this.itemsService.values()]; }
  get numItems() { return this.itemsProduct.size + this.itemsService.size; };
  get totalDiscounts() {
    if (!this.discount) return 0;
    if (this.discount.type === 'GLOBAL') return this.calculateDiscounts(this.discount.globalDiscount);

    const { productDiscount, serviceDiscount, productId, serviceId } = this.discount;
    let total = 0;

    if (!productDiscount && !serviceDiscount) return 0;
    if (productDiscount) total += this.calculateDiscounts(productDiscount, productId);
    if (serviceDiscount) total += this.calculateDiscounts(serviceDiscount, serviceId);
    return total;
  }

  calculateTotals() {
    this.items.forEach(item => {
      this.subtotal += item.subtotal;
      item.taxes.forEach(charge => { this.totalTax += charge.amount; });
      item.fees.forEach(charge => { this.totalFees += charge.amount; });
      item.shipping.forEach(charge => { this.totalShipping += charge.amount; });
    });
    this.finalTotal = (this.subtotal - this.totalDiscounts) + this.totalTax + this.totalFees + this.totalShipping;
  }

  addItem(item: OrderItem<OrderItemSubType>) {
    if (!item?.id || !item?.type) {
      // TODO - warn logger
      return;
    };

    switch (item.type) {
      case 'PRODUCT':
        this.itemsProduct.set(item.id, item as OrderItem<'PRODUCT'>);
        break;
      case 'SERVICE':
        this.itemsService.set(item.id, item as OrderItem<'SERVICE'>);
        break;
    }

    this.calculateTotals();
    this.updatedAt = new Date();
  }

  removeItem(id: string) {
    if (!id) {
      // TODO - warn logger
      return;
    };
    this.itemsProduct.delete(id);
    this.itemsService.delete(id);
    this.calculateTotals();
    this.updatedAt = new Date();
  }

  addDiscount(discount: Discount, scope: OrderDiscountScope) {
    switch (scope) {
      case 'GLOBAL':
        this.discount = { type: 'GLOBAL', globalDiscount: discount };
        break;
      case 'PRODUCT':
        this.discount = {
          type: 'SCOPED',
          ...(this.discount?.type === 'SCOPED' ? this.discount : {}),
          productDiscount: discount
        };
        break;
      case 'SERVICE':
        this.discount = {
          type: 'SCOPED',
          ...(this.discount?.type === 'SCOPED' ? this.discount : {}),
          serviceDiscount: discount
        };
        break;
    }
    this.calculateTotals();
  }

  removeAllDiscounts() {
    delete this.discount;
    this.calculateTotals();
    this.updatedAt = new Date();
  }

  calculateDiscounts({ type, value }: Discount, itemId?: string) {
    if (!type || !value) return 0;

    switch (type) {
      case 'PERCENTAGE':
        return (this.subtotal * value) / 100;
      case 'FIXED_AMOUNT':
        return value;
      case 'FREE_SHIPPING':
        return this.totalShipping;
      case 'BOGO':
        if (!itemId) return 0;
        return this.items.find(item => item.id === itemId)?.subtotal || 0;
      default:
        return 0;
    }
  }

  areDiscountsValid() {
    if (!this.discount) return true;
    if (this.discount.type === 'GLOBAL') return this.discount.globalDiscount.canApply(this.subtotal);
    return (this.discount.productDiscount?.canApply(this.subtotal) && this.discount.serviceDiscount?.canApply(this.subtotal));
  }

  addUser(user: User) {
    if (!user) {
      // TODO - warn logger
      return;
    };
    this.user = user;
    this.updatedAt = new Date();
  }

  removeUser() {
    delete this.user;
    this.updatedAt = new Date();
  }

  addBilling(billing: Payment) {
    if (!billing) {
      // TODO - warn logger
      return;
    };
    this.billing = billing;
    this.updatedAt = new Date();
  }

  removeBilling() {
    delete this.billing;
    this.updatedAt = new Date();
  }

  updateStatus(newStatus: OrderType['status'], note?: string) {
    if (!newStatus) {
      // TODO - warn logger
      return;
    };
    this.status = newStatus;
    const now = new Date();
    this.updatedAt = now;
    this.history.push({
      status: newStatus,
      timestamp: now,
      note,
    });
  }

  addHistory(history: OrderHistory) {
    if (!history) {
      // TODO - warn logger
      return;
    };
    this.history.push(history);
    this.updatedAt = new Date();
  }

  clearProducts() {
    this.itemsProduct.clear();
    this.calculateTotals();
    this.updatedAt = new Date();
  }

  clearServices() {
    this.itemsService.clear();
    this.calculateTotals();
    this.updatedAt = new Date();
  }

  clearAllItems() {
    this.itemsProduct.clear();
    this.itemsService.clear();
    this.calculateTotals();
    this.updatedAt = new Date();
  }

  isValid() {
    return this.numItems > 0 && this.finalTotal > 0 && this.user && this.billing && this.status && this.areDiscountsValid();
  }

  toJSON() { return { ...this }; }
}
