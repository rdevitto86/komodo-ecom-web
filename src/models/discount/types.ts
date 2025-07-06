import { Currency } from '../payment/types';
import Discount from './discount.model';

export interface DiscountType {
  id: string; // promotionId
  name: string;
  description?: string;
  code?: string; // eg. "SUMMER20"
  status: DiscountStatus;

  discountType: DiscountSubType;
  discountValue: number; // eg 20 for 20% or 10 for $10. For FREE_SHIPPING, could be 0.
  currency?: Currency;

  applicability: DiscountApplicability;
  applicableOfferingIds?: string[]; // For SPECIFIC_OFFERINGS
  applicableCategoryIds?: string[]; // For SPECIFIC_CATEGORIES

  minimumPurchaseAmount?: number;
  maximumDiscountAmount?: number; // Cap for percentage discounts
  isStackable: boolean; // Can be combined with other promotions

  bogoDetails?: BogoDetails;

  usageLimit?: number; // Total uses allowed
  usageLimitPerUser?: number; // Uses per user
  timesUsed: number;

  startDate: Date;
  endDate?: Date; // Optional
  creationDate: Date;
  lastUpdateDate: Date;
}

export enum DiscountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SCHEDULED = 'SCHEDULED',
  EXPIRED = 'EXPIRED',
  ARCHIVED = 'ARCHIVED',
}

export enum DiscountSubType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_AMOUNT = 'FIXED_AMOUNT',
  FREE_SHIPPING = 'FREE_SHIPPING',
  BOGO = 'BOGO',
}

export enum DiscountApplicability {
  ENTIRE_ORDER = 'ENTIRE_ORDER',
  SPECIFIC_OFFERINGS = 'SPECIFIC_OFFERINGS',
  SPECIFIC_CATEGORIES = 'SPECIFIC_CATEGORIES',
}

export interface BogoDetails {
  buyQuantity: number;
  getQuantity: number;
  getDiscountType: 'FREE' | 'PERCENTAGE';
  getDiscountValue?: number;
}

export enum DiscountHierarchy {
  BOGO = 1,
  PERCENTAGE = 2,
  FIXED_AMOUNT = 3,
  FREE_SHIPPING = 4,
}

export type OrderDiscountScope = 'GLOBAL' | 'PRODUCT' | 'SERVICE';

export type OrderDiscountState = | { type: 'GLOBAL'; globalDiscount: Discount } | {
  type: 'SCOPED';
  productDiscount?: Discount;
  productId?: string;
  serviceDiscount?: Discount
  serviceId?: string;
};
