import Offering from '../offering/offering.model';
import Address from '../address/address.model';
import { OfferingType } from '../offering/types';

export type OrderItemStatus = 'PENDING' | 'PROCESSING' | 'FULFILLED' | 'CANCELLED';
export type OrderItemSubType = 'PRODUCT' | 'SERVICE';

export type OrderItemType = {
  id: string; // aka SKU
  type: OrderItemSubType;
  status?: OrderItemStatus;
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
