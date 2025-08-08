import Offering, { OfferingType } from '../catalog-item/catalog-item.model';
import Address from '../address/address.model';
import {
  OrderItemClassification,
  OrderItemType,
  OrderItemStatus,
  AdditionalCharge,
  OrderItemShipping,
  OrderItemServicing
} from './types';
import { uuid } from '@utils/uuid';

export * from './types';

export default class OrderItem<T extends OrderItemClassification> implements OrderItemType {
  id: string; // placeholder, assigned in backend
  orderId: string; // parent order's ID
  type: T;
  sequence: number;
  status: OrderItemStatus;

  offering: Offering<OfferingType>;

  quantity: number;
  taxes: AdditionalCharge[];
  fees: AdditionalCharge[];
  shipping: AdditionalCharge[];
  subtotal: number;

  address?: Address;

  shippingDetails?: OrderItemShipping;
  servicingDetails?: OrderItemServicing;

  createdAt: Date;
  updatedAt: Date;

  isTemporary: boolean;

  constructor(data: OrderItemType, isTemporary: boolean = true) {
    this.id = data.id || uuid();
    this.orderId = data.orderId;
    this.type = data.type as T;
    this.sequence = data.sequence || -1;
    this.status = data.status || 'PENDING';
    this.offering = data.offering;
    this.quantity = data.quantity || 0;
    this.taxes = data?.taxes || [];
    this.shipping = data.shipping || [];
    this.fees = data?.fees || [];
    this.shippingDetails = data.shippingDetails;
    this.servicingDetails = data.servicingDetails;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
    this.address = data.address;
    this.subtotal = this.offering.pricing.basePrice * this.quantity;
    this.isTemporary = (typeof isTemporary === 'boolean') ? isTemporary : true;
  }

  addCharge(charge: AdditionalCharge) {
    switch (charge.type) {
      case 'TAX':
        this.taxes.push(charge);
        break;
      case 'SHIPPING':
        this.shipping.push(charge);
        break;
      case 'FEE':
        this.fees.push(charge);
        break;
      default:
        break;
    }
    this.updatedAt = new Date();
  }

  addShippingDetails(shipping: Partial<OrderItemShipping>) {
    if (!shipping) return;
    this.shippingDetails = shipping;
    this.updatedAt = new Date();
  }

  removeShippingDetails() {
    delete this.shippingDetails;
    this.updatedAt = new Date();
  }

  addServicingDetails(servicing: Partial<OrderItemServicing>) {
    if (!servicing) return;
    this.servicingDetails = servicing;
    this.updatedAt = new Date();
  }

  removeServicingDetails() {
    delete this.servicingDetails;
    this.updatedAt = new Date();
  }

  setAddress(address: Address) {
    if (!address) return;
    this.address = address;
    this.updatedAt = new Date();
  }

  removeAddress() {
    delete this.address;
    this.updatedAt = new Date();
  }

  isValid() {
    return this.offering && this.quantity > 0 && this.subtotal > 0 && this.status && this.createdAt;
  }

  toJSON() { return { ...this }; }
}
