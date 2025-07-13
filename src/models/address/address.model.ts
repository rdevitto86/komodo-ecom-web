import { uuid } from '@/utils/uuid';
import {
  hasValidCountryCode,
  normalizePostalCode,
  normalizeRegion,
  normalizeAddressLine,
} from '@/utils/validations/address';
import { AddressType } from './types';
import RuntimeError from '../errors/runtime/runtime.model';

export * from './types';

export default class Address implements AddressType {
  id: string; // addressId, assigned in backend
  alias?: string;
  line1: string;
  line2?: string;
  line3?: string;
  company?: string;
  city!: string;
  region: string;
  postalCode: string;
  countryCode: string;
  isResidential: boolean;
  isDefaultBilling: boolean;
  isNew: boolean;
  hasEdits: boolean;
  geo?: [number, number];

  constructor(
    data: AddressType,
    isResidential?: boolean,
    isDefaultBilling?: boolean,
    isNew?: boolean,
    hasEdits?: boolean
  ) {
    if (!hasValidCountryCode(data.countryCode, window?.navigator?.language)) {
      throw new RuntimeError('Failed to create new address - invalid country');
    }

    const country = data.countryCode.toUpperCase();

    this.alias = data.alias;
    this.id = (isNew || data.isNew) ? uuid() : data.id ?? '';
    this.line1 = normalizeAddressLine(data.line1);
    this.line2 = normalizeAddressLine(data.line2);
    this.line3 = normalizeAddressLine(data.line3);
    this.region = normalizeRegion(data.region, country);
    this.postalCode = normalizePostalCode(data.postalCode, country);
    this.countryCode = country
    this.isResidential = isResidential || !!data.isResidential;
    this.isDefaultBilling = isDefaultBilling || !!data.isDefaultBilling;
    this.isNew = isNew || !!data.isNew;
    this.hasEdits = hasEdits || !!data.hasEdits;
  }

  isValid() {
    return Boolean(
      this.line1 &&
      this.city &&
      this.region &&
      this.postalCode &&
      this.countryCode
    );
  }

  printAddress(useNewLines = false) {
    const lines = [];

    if (this.line1) lines.push(this.line1);
    if (this.line2) lines.push(this.line2);
    if (this.line3) lines.push(this.line3);

    let cityLine = '';
    if (this.city) cityLine += this.city;
    if (this.region) cityLine += (cityLine ? ', ' : '') + this.region;
    if (this.postalCode) cityLine += (cityLine ? ' ' : '') + this.postalCode;
    if (cityLine) lines.push(cityLine);
    if (this.countryCode) lines.push(this.countryCode);

    return useNewLines ? lines.join('\n') : lines.join(', ');
  }

  toJSON() { return { ...this }; }
}
