import { isAddress } from '../npm-libs/ts/types/address-type';
import { CompanyJSON, isCompany } from '../npm-libs/ts/types/company-type';
import Address from './address';

/**
 * Defines a new Company model
 * @version 1.0.0
 */
export default class Company {
    /**
     * Full company name
     */
    name: string | null = null;

    /**
     * Full name of company contact
     */
    contactName: string | null = null;

    /**
     * Phone number of company contact
     */
    contactPhone: string | null = null;

    /**
     * Email of company contact
     */
    contactEmail: string | null = null;

    /**
     * Company street address
     */
    address: Address | null = null;

    /**
     * @param {CompanyJSON | Company} [props] exsisting business details
     */
    constructor(props?: CompanyJSON | Company) {
        if (isCompany(props)) {
            const {
                name,
                contactName,
                contactPhone,
                contactEmail,
                address
            } = props;

            this.name = name;
            this.contactName = contactName;
            this.contactEmail = contactEmail;

            if (typeof contactPhone === 'string') {
                this.contactPhone = contactPhone;
            }
            if (isAddress(address)) {
                this.address = new Address(address);
            }
        }
    }
}
