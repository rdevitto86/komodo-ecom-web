import Address from './address.model';

describe('Address Model tests', () => {
    const fullMock = new Address({
        line1: 'One Apple Park Way',
        line2: 'Suite 100',
        city: 'Cupertino',
        state: 'CA',
        county: 'Santa Clara',
        zipcode: '95014',
        country: 'US',
    });

    const partialMock = new Address({
        line1: 'One Apple Park Way',
        city: 'Cupertino',
        state: 'CA',
        zipcode: '95014',
        country: 'US',
    });

    test('model w/ params fully instatiates model', () => {
        const {
            line1,
            line2,
            city,
            state,
            county,
            zipcode,
            country,
        } = fullMock;

        expect(line1).toBe('One Apple Park Way');
        expect(line2).toBe('Suite 100');
        expect(city).toBe('Cupertino');
        expect(state).toBe('CA');
        expect(county).toBe('Santa Clara');
        expect(zipcode).toBe('95014');
        expect(country).toBe('US');
    });

    test('model w/ params partially instatiates model', () => {
        const {
            line1,
            line2,
            city,
            state,
            county,
            zipcode,
            country,
        } = partialMock;

        expect(line1).toBe('One Apple Park Way');
        expect(line2).toBe(null);
        expect(city).toBe('Cupertino');
        expect(state).toBe('CA');
        expect(county).toBe(null);
        expect(zipcode).toBe('95014');
        expect(country).toBe('US');
    });

    test('model w/ no params', () => {
        const {
            line1,
            line2,
            city,
            state,
            county,
            zipcode,
            country,
        } = new Address();

        expect(line1).toBe(null);
        expect(line2).toBe(null);
        expect(city).toBe(null);
        expect(state).toBe(null);
        expect(county).toBe(null);
        expect(zipcode).toBe(null);
        expect(country).toBe(null);
    });

    test('model w/ another address model', () => {
        const {
            line1,
            line2,
            city,
            state,
            county,
            zipcode,
            country,
        } = new Address(fullMock);

        expect(line1).toBe('One Apple Park Way');
        expect(line2).toBe('Suite 100');
        expect(city).toBe('Cupertino');
        expect(state).toBe('CA');
        expect(county).toBe('Santa Clara');
        expect(zipcode).toBe('95014');
        expect(country).toBe('US');
    });

    test('print statement outputs correct formatting', () => {
        const address = fullMock.print();
        expect(address).toBe('One Apple Park Way, Cupertino, CA 95014 US');
    });

    test('print statement outputs nothing', () => {
        const address = (new Address()).print();
        expect(address).toBe('');
    });
});
