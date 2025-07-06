import { uuid } from '@/utils/uuid';
import Address from '../address/address.model';
import { isValidURL } from '@/utils/url';
import { Currency, CardType, CardNetwork, CardIssuer } from './types';

export * from './types';

export interface PaymentType {
  id?: string; // paymentId
  userId?: 'GUEST' | string;
  alias?: string;
  currency?: Currency;
  issuer?: string;
  cardType?: CardType;
  network: CardNetwork;
  brand?: string;
  displayIcon?: string;
  cardholderName: string;
  billingAddress?: Address;
  lastFour: string;
  expiresMonth: string;
  expiresYear: string;
  creationDate: Date;
  lastUpdateDate: Date;
  isDefault?: boolean;
  isVCN?: boolean;
}

export default class Payment implements PaymentType {
  id!: string; // paymentId
  userId!: 'GUEST' | string;
  alias?: string;
  currency?: Currency;
  issuer?: CardIssuer;
  cardType?: CardType;
  network!: CardNetwork;
  brand?: string;
  cardholderName!: string;
  billingAddress?: Address;
  lastFour!: string;
  expiresMonth!: string;
  expiresYear!: string;
  creationDate!: Date;
  lastUpdateDate!: Date;
  isDefault?: boolean;
  isVCN?: boolean;

  constructor(data: Partial<PaymentType>, isDefault: boolean = false) {
    Object.assign(this, data);

    if (!data.creationDate) this.creationDate = new Date();
    if (!data.lastUpdateDate) this.lastUpdateDate = new Date();
    if (!data.id) this.id = uuid();

    this.isDefault = isDefault || !!data.isDefault;
  }

  set displayIcon(url: string) {
    if (isValidURL(url)) this.displayIcon = url;
  }

  toJSON() { return { ...this }; }
}
