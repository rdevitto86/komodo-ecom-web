import { describe, beforeEach, it, expect } from 'vitest';
import Address, { AddressType } from './address.model';

describe('Address Model', () => {
  describe('For a US address', () => {
    let mockAddress: Address;

    const props: AddressType = {
      id: 'test-address-id',
      alias: 'Test Address',
      line1: '123 Unknown Lane',
      line2: 'Building A',
      line3: 'Suite 100',
      company: 'Web Dynamics LLC',
      city: 'Fakerton',
      region: 'IL',
      postalCode: '60601',
      countryCode: 'US',
      isResidential: true,
      isDefaultBilling: true,
      isNew: true,
      hasEdits: false,
      geo: [ -87.623177, 41.883 ],
    }

    beforeEach(() => {
      mockAddress = new Address(props);
    });

    it('should create a new model correctly', () => {
      for(const [key, value] of Object.entries(props)) {
        expect((mockAddress as any)[key]).toEqual(value);
      }
      expect(mockAddress.isValid()).toBe(true);
    });

    it('should validate false with invalid line1', () => {
      mockAddress.line1 = '';
      expect(mockAddress.isValid()).toBe(false);
    });

    it('should output address format correctly', () => {
      expect(mockAddress.printAddress()).toBe('123 Unknown Lane, Building A, Suite 100, Fakerton, IL 60601, US'); // one line
      expect(mockAddress.printAddress(true)).toBe('123 Unknown Lane\nBuilding A\nSuite 100\nFakerton, IL 60601\nUS'); // new lines
    });
  });
});
