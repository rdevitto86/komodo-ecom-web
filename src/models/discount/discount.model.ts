import { uuid } from '@/utils/uuid';
import { Currency } from '../payment/types';
import {
  DiscountType,
  DiscountStatus,
  DiscountSubType,
  DiscountApplicability,
  BogoDetails,
} from './types';

export * from './types';

export default class Discount {
  id: string;
  name: string;
  description: string;
  code: string;
  status: DiscountStatus;
  type: DiscountSubType;
  value: number;
  currency: Currency;
  applicability: DiscountApplicability;
  applicableOfferingIds: string[];
  applicableCategoryIds: string[];
  minDiscountValue: number;
  maxDiscountValue: number;
  isStackable: boolean;
  bogoDetails?: BogoDetails;
  maxUses?: 1 | number;
  timesUsed: number;
  startDate!: Date;
  endDate?: Date;
  creationDate: Date;
  lastUpdateDate: Date;

  constructor(data: DiscountType) {
    this.id = data.id || uuid();
    this.name = data.name;
    this.description = data.description || '';
    this.code = data.code || '';
    this.status = data.status || DiscountStatus.INACTIVE;
    this.type = data.discountType;
    this.value = data.discountValue || 0;
    this.currency = data.currency || 'USD';
    this.applicability = data.applicability || DiscountApplicability.ENTIRE_ORDER;
    this.isStackable = data.isStackable || false;
    this.timesUsed = data.timesUsed || 0;
    this.applicableOfferingIds = data.applicableOfferingIds || [];
    this.applicableCategoryIds = data.applicableCategoryIds || [];
    this.minDiscountValue = data.minimumPurchaseAmount || 0;
    this.maxDiscountValue = data.maximumDiscountAmount || 0;
    this.creationDate = data.creationDate || new Date();
    this.lastUpdateDate = data.lastUpdateDate || new Date();
    this.startDate = new Date(data.startDate);
    if (data.endDate) this.endDate = new Date(data.endDate);
  }

  isActive() {
    const now = new Date();
    const isWithinDateRange = this.startDate && now >= this.startDate && (!this.endDate || now <= this.endDate);
    const hasUsesLeft = this.maxUses === undefined || this.timesUsed < this.maxUses;
    return this.status === DiscountStatus.ACTIVE && isWithinDateRange && hasUsesLeft;
  }

  canApply(subtotal: number) {
    if (!this.isActive()) return false;
    if (this.minDiscountValue && subtotal < this.minDiscountValue) return false;
    if (this.maxDiscountValue && subtotal > this.maxDiscountValue) return false;
    return true;
  }

  toJSON() { return { ...this }; }
}
