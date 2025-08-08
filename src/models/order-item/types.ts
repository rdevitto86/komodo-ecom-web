import Offering from '../catalog-item/catalog-item.model';
import Address from '../address/address.model';
import { OfferingType } from '../catalog-item/types';

export type OrderItemStatus = 'PENDING' | 'PROCESSING' | 'FULFILLED' | 'CANCELLED';
export type OrderItemClassification = 'PRODUCT' | 'SERVICE';

export type OrderItemType = {
  id: string; // aka SKU
  orderId: string; // parent order's ID
  type: OrderItemClassification;
  status?: OrderItemStatus;
  sequence?: number;
  offering: Offering<OfferingType>;
  quantity: number;
  taxes?: AdditionalCharge[];
  fees?: AdditionalCharge[];
  shipping?: AdditionalCharge[];
  netTotal?: number;
  shippingDetails?: OrderItemShipping;
  servicingDetails?: OrderItemServicing
  address?: Address;
  createdAt?: Date;
  updatedAt?: Date;
}

export type OrderItemShipping = {
  shippingDate?: Date;
  shippingMethod?: string;
  shippingCharges?: number;
  shippingTrackingNumber?: string;
  fulfilledBy?: string;
  fulfilledAt?: Date;
}

export type OrderItemServicing = {
  serviceType?: string;
  serviceCharges?: number;
  serviceStartDate?: Date;
  serviceEndDate?: Date;
  technician?: string;
}

export type AdditionalCharge = {
  id: string; // orderChargeId
  type: 'SHIPPING' | 'TAX' | 'FEE';
  name?: string;
  description?: string;
  amount: number;
  waived?: boolean;
}
