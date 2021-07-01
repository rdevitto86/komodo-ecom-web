// import Promotion from '../promotions/promotion.model';
import CatalogItem from './catalog-item.model';

describe('Address Model tests', () => {
    const fullMock = new CatalogItem({
        catalogID: '1234567890',
        categoryID: 'CI-001',
        classifcation: 'TEST',
        price: 99999.99,
        tags: ['home', 'tech', 'new'],
        title: 'Some Product Title',
        description: 'Some product description that will help our testing',
        // enablePromotions: true,
        // promotion: new d Promotion(),
    });

    const partialMock = new CatalogItem({
        catalogID: '1234567890',
        categoryID: 'CI-001',
        classifcation: 'TEST',
        price: 99999.99,
        title: 'Some Product Title',
        description: 'Some product description that will help our testing',
    });

    // TODO - mocks/stubs/spies

    test('model w/ params fully instatiates model', () => {
        const {
            catalogID,
            categoryID,
            classifcation,
            price,
            tags,
            title,
            description,
            // enablePromotions,
            // promotion,
        } = fullMock;

        expect(catalogID).toBe('1234567890');
        expect(categoryID).toBe('CI-001');
        expect(classifcation).toBe('TEST');
        expect(price).toBe(99999.99);
        expect(tags).toBe(['home', 'tech', 'new']);
        expect(title).toBe('Some Product Title');
        expect(description).toBe('Some product description that will help our testing');
        // expect(enablePromotions).toBe(true);
        // expect(promotion).toBe({});
    });

    test('model w/ params partially instatiates model', () => {
        const {
            catalogID,
            categoryID,
            classifcation,
            price,
            tags,
            title,
            description,
            // enablePromotions,
            // promotion,
        } = partialMock;

        expect(catalogID).toBe('1234567890');
        expect(categoryID).toBe('CI-001');
        expect(classifcation).toBe('TEST');
        expect(price).toBe(99999.99);
        expect(tags).toBe([]);
        expect(title).toBe('Some Product Title');
        expect(description).toBe('Some product description that will help our testing');
        // expect(enablePromotions).toBe(true);
        // expect(promotion).toBe({});
    });

    test('model w/ no params', () => {
        const {
            catalogID,
            categoryID,
            classifcation,
            price,
            tags,
            title,
            description,
            // enablePromotions,
            // promotion,
        } = new CatalogItem();

        expect(catalogID).toBe(null);
        expect(categoryID).toBe(null);
        expect(classifcation).toBe(null);
        expect(price).toBe(null);
        expect(tags).toBe([]);
        expect(title).toBe(null);
        expect(description).toBe(null);
        // expect(enablePromotions).toBe(true);
        // expect(promotion).toBe({});
    });

    test('model w/ another catalog item model', () => {
        const {
            catalogID,
            categoryID,
            classifcation,
            price,
            tags,
            title,
            description,
            // enablePromotions,
            // promotion,
        } = new CatalogItem(fullMock);

        expect(catalogID).toBe('1234567890');
        expect(categoryID).toBe('CI-001');
        expect(classifcation).toBe('TEST');
        expect(price).toBe(99999.99);
        expect(tags).toBe(['home', 'tech', 'new']);
        expect(title).toBe('Some Product Title');
        expect(description).toBe('Some product description that will help our testing');
        // expect(enablePromotions).toBe(true);
        // expect(promotion).toBe({});
    });
});
