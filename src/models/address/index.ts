export interface AddressType {
    addressId: string;
    name?: string;
    line1: string;
    line2?: string;
    line3?: string;
    company?: string;
    city: string;
    region: string; // states, provinces, etc.
    postalCode: string; // zip, etc.
    country: string;
    territory?: string; // counties, districts, etc.
    isResidential?: boolean;
    isDefaultBilling?: boolean;
    isNew: boolean;
    geo?: [number, number];
}

export default class Address implements AddressType {
  addressId: string;
  name?: string;
  line1: string;
  line2?: string;
  line3?: string;
  company?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  territory?: string;
  isResidential: boolean = false;
  isDefaultBilling: boolean = false;
  isNew: boolean = false;
  geo?: [number, number];

  constructor(props: AddressType) {
    this.addressId = props?.addressId || ''; // TODO generate new token
    this.name = props.name;
    this.line1 = props.line1;
    this.line2 = props.line2;
    this.line3 = props.line3;
    this.company = props.company;
    this.city = props.city;
    this.region = props.region;
    this.postalCode = props.postalCode;
    this.country = props.country;
    this.territory = props.territory;
    this.isResidential = props.isResidential || false;
    this.isDefaultBilling = props.isDefaultBilling || false;
    this.isNew = props?.isNew || false;
    this.geo = props.geo;
  }

  isValid() {
    return Boolean(
      this.line1 &&
      this.city &&
      this.region &&
      this.postalCode &&
      this.country
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

    if (this.country) lines.push(this.country);

    return useNewLines ? lines.join('\n') : lines.join(', ');
  }
}
