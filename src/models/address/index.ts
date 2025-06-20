// TODO import address, postal, etc validators
export interface AddressType {
    name?: string;
    line1: string;
    line2?: string;
    line3?: string;
    company?: string;
    city: string;
    region: string; // states, provinces, etc.
    postalCode: string;
    country: string;
    territory?: string; // counties, districts, etc.
    isResidential?: boolean;
    isDefaultBilling?: boolean;
    geo?: [number, number];
}

export default class Address implements AddressType {
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
    isResidential?: boolean;
    isDefaultBilling?: boolean;
    geo?: [number, number];

    constructor(props: AddressType) {
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
        this.geo = props.geo;
    }
}
