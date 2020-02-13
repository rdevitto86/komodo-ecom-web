import ValidationUtil from '../../app-supplemental/utility/validation-util';

/**
 * @class Address
 * @description - defines a new Address object
 */
export class Address {
    /**
     * @constructor
     * @param {String} line1 - primary street address
     * @param {String} line2 - secondary street/building address
     * @param {String} city - name of city
     * @param {String} region - name of region (state, province, etc)
     * @param {String} subRegion - name of sub-region (county, parish, etc)
     * @param {String} postalCode - postal code
     * @param {String} country - country of residence
     */
    constructor(line1, line2, city, region, subRegion, mailingCode, country) {
        //cache model data locally
        this.data = this.createAddress(
            line1, line2, city, region, subRegion, mailingCode, country
        );
    }

    /**
     * @public
     * @property
     * @description - gets the model data
     * @returns {Address}
     */
    get data() {
        return this._address;
    }

    /**
     * @public
     * @property
     * @description - sets the model data
     * @param {Address} address
     */
    set data(address = undefined) {
        if(address instanceof Address) {
            this._address = address;
        }
    }

    /**
     * @public
     * @function Address#createAddress
     * @description - creates a new Address object
     * @param {String} line1 - primary street address [MANDATORY]
     * @param {String} line2 - secondary street/building address [OPTIONAL]
     * @param {String} city - name of city [MANDATORY]
     * @param {String} region - name of region (state, province, etc) [MANDATORY]
     * @param {String} subRegion - name of sub-region (county, parish, etc) [OPTIONAL]
     * @param {String} postalCode - postal code [MANDATORY]
     * @param {String} country - country of residence [MANDATORY]
     * @returns {Address}
     */
    createAddress(line1, line2, city, region, subRegion, postalCode, country) {
        //generic address object
        const template = {
            line1: '',
            line2: '',
            city: '',
            region: '',
            subRegion: '',
            postalCode: '',
            country: '',
        };

        const validator = new ValidationUtil();

        //validate mandatory fields
        if(validator.validateType('string', [
            line1, city, region, postalCode, subRegion, country
        ])) {
            //set address details
            template.line1 = line1;
            template.line2 = validator.validateType('string', line2) ? line2 : null;
            template.city = city;
            template.region = region;
            template.subRegion = validator.validateType('string', subRegion) ? subRegion : null;
            template.postalCode = postalCode;
            template.country = country;
        }
        return template;
    }

    /**
     * @public
     * @function Address#toString
     * @description - converts an address to standardized format
     * @returns {String} -- Example: One Apple Park Way, Cupertino, CA 95014 US
     */
    toString() {
        const props = this.data;
        return (
            props.line1 
            + ((props.line2) ? (' ' + props.line2) : '')
            + (', ' + props.city) 
            + (', ' + props.region) 
            + (' ' + props.postalCode)
            + ((props.country) ? (' ' + props.country) : '')
        );
    }
}