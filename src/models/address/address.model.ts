import { AddressJSON, isAddress } from '../../npm/ec-shared/types/address';

/**
 * Defines a new Address model
 * @version 1.0.0
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
     * Address city
     */
    city: string | null = null;

    /**
     * Region of address (ex. state, etc.)
     */
    region: string | null = null;

    /**
     * Address sub-region (ex. county)
     */
    subRegion: string | null = null;

    /**
     * Address mailing code (ex. zipcode)
     */
    mailingCode: string | null = null;

    /**
     * Address country (ex. US, CA, etc.)
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
                city,
                region,
                subRegion,
                mailingCode,
                country
            } = props;

            this.line1 = line1;
            this.city = city;
            this.region = region;
            this.mailingCode = mailingCode;
            this.country = country;

            if (line2) {
                this.line2 = line2;
            }
            if (subRegion) {
                this.subRegion = subRegion;
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
            city,
            region,
            subRegion,
            mailingCode,
            country: countryCode
        } = this;

        const fullAddress = `${line1 || ''}${((line2) ? ` ${line2}` : '')}`;
        const fullRegion = `, ${region || ''}${(subRegion) ? `, ${subRegion}` : ''}`;
        return `${fullAddress}, ${city || ''}, ${fullRegion} ${mailingCode || ''} ${countryCode || ''}`;
    }
}
