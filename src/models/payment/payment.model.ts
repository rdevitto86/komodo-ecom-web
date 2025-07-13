import { uuid } from '@/utils/uuid';
import User from '@/models/user/user.model';
import { isValidURL } from '@/utils/url';
import {
  PaymentType,
  Currency,
  CardType,
  CardNetwork,
  CardIssuer,
} from './types';

export * from './types';

export default class Payment {
  id: string; // paymentId
  cardholder: User;
  alias?: string;
  currency: Currency;
  issuer: CardIssuer;
  cardType: CardType;
  network: CardNetwork;
  brand?: string;
  lastFour: string;
  expiresMonth: string;
  expiresYear: string;
  creationDate: Date;
  lastUpdateDate: Date;
  isDefault: boolean;
  isVCN: boolean;
  displayIcon?: string;

  constructor(data: PaymentType, isDefault: boolean = false) {
    this.id = data.id || uuid();
    this.cardholder = data.cardholder;
    this.alias = data.alias;
    this.currency = data.currency;
    this.issuer = data.issuer;
    this.cardType = data.cardType;
    this.network = data.network;
    this.brand = data.brand;
    this.lastFour = data.lastFour;
    this.expiresMonth = data.expiresMonth;
    this.expiresYear = data.expiresYear;
    this.creationDate = data.creationDate || new Date();
    this.lastUpdateDate = data.lastUpdateDate || new Date();
    this.isDefault = isDefault || data.isDefault || false;
    this.isVCN = data.isVCN || false;
    this.setDisplayIcon(data.displayIcon);
  }

  setDisplayIcon(url?: string) {
    if (isValidURL(url)) this.displayIcon = url;
  }

  toJSON() { return { ...this }; }
}
