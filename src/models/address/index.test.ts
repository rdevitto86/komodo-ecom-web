import { describe, it, expect } from 'vitest';
import Address from '.';

describe('Address Model', () => {
    const props: Address = {
        name: 'Test Address',
        line1: '123 Unknown Lane',
        line2: 'Suite 100',
        line3: '',
        company: '',
        city: 'Fakerton',
        region: 'IL',
        postalCode: '60601',
        country: 'US',
        territory: 'Cook',
        isResidential: true,
        isDefaultBilling: true,
        geo: [ -87.623177, 41.883 ],
    }

    it('should create a new model with properties correctly set', () => {
        const mockAddress = new Address(props);

        for(const [key, value] of Object.entries(props)) {
            expect((mockAddress as any)[key]).toEqual(value);
        }
    });

    it('should create a new model with missing required props', () => {
        // TODO
    });

    it('should create a new model with invalid line1', () => {
        // TODO
    });

    it('should create a new model with invalid postal code', () => {
        // TODO
    });
});