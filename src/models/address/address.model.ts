import { AddressJSON, isAddress } from '../../npm/kfs-api/src/user-api/schemas/address';

/**
 * Defines a new Address model
 */
export default class Address {
    /**
     * Primary street address
     */
    line1: string | null = null;

    /**
     * Secondary street address
     */
    line2: string | null = null;

    /**
     * Tertiary street address
     */
    line3: string | null = null;

    /**
     * Address city
     */
    city: string | null = null;

    /**
     * Region of address
     */
    state: string | null = null;

    /**
     * County of address
     */
    county: string | null = null;

    /**
     * Address mailing code
     */
    zipcode: string | null = null;

    /**
     * Country of address
     */
    country: string | null = null;

    /**
     * @param {AddressJSON | Address} [props] exsisting address details
     */
    constructor(props?: AddressJSON | Address) {
        if (isAddress(props)) {
            const {
                line1,
                line2,
                line3,
                city,
                region,
                subRegion,
                mailingCode,
                country,
            } = props;

            this.line1 = line1;
            this.city = city;
            this.state = region;
            this.zipcode = mailingCode;
            this.country = country;

            if (line2) {
                this.line2 = line2;
            }
            if (line3) {
                this.line3 = line3;
            }
            if (subRegion) {
                this.county = subRegion;
            }
        }
    }

    /**
     * Prints full, formatted address
     * @returns {string} address
     * @example 'One Apple Park Way, Cupertino, CA 95014 US'
     */
    print(): string {
        const {
            line1,
            line2,
            // line3,
            city,
            state,
            county,
            zipcode,
            country,
        } = this;

        const fullAddress = `${line1 || ''}${((line2) ? ` ${line2}` : '')}`;
        const fullRegion = `, ${state || ''}${(county) ? `, ${county}` : ''}`;
        return `${fullAddress}, ${city || ''}, ${fullRegion} ${zipcode || ''} ${country || ''}`;
    }
}
