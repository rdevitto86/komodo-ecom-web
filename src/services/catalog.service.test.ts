import CatalogService from './catalog.service';

describe('Catalog Service tests', () => {
    const service = new CatalogService();

    // TODO - mocks/spies/stubs

    test('API endpoint is correct', () => {
        expect(service.API_URL).toBe('');
    });

    test('getItem returns correct response', () => {
        const response = service.getItem('');

        expect(response).toBe({});
    });

    test('getCategoryItems returns correct response', () => {
        const response = service.getCategoryItems('');

        expect(response).toBe({});
    });

    test('search returns correct response', () => {
        // TODO
    });
});
