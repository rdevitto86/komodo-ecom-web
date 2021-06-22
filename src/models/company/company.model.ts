import { isAddress } from '../../npm/kfs-api/user-api/schemas/address';
import { CompanyJSON, isCompany } from '../../npm/kfs-api/user-api/schemas/company';
import Address from '../address/address.model';

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
                address,
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
