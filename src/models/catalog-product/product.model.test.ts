import CatalogItem from '../catalog-items/catalog-item.model';
import { UserReview } from '../user-reviews/user-review.model';
import CatalogProduct from './product.model';

describe('Address Model tests', () => {
    const mockItem = new CatalogItem({
        catalogID: '1234567890',
        categoryID: 'CI-001',
        classifcation: 'TEST',
        price: 99999.99,
        title: 'Some Title',
        description: 'Some Description',
    });

    // TODO
    const mockUserReview = new UserReview();

    const fullMock = new CatalogProduct({
        ...mockItem,
        sku: '11223344',
        quantity: 100,
        stock: 99999,
        features: 'Some features description',
        specifications: null,
        enableRatings: true,
        rating: 4.25,
        enableReviews: true,
        reviews: [],
        userReview: new UserReview(),
        documentsURL: '',
    });

    const partialMock = new CatalogProduct({
        ...mockItem,
        sku: '11223344',
        stock: 99999,
        features: 'Some features description',
        specifications: null,
        documentsURL: '',
    });

    // TODO - mocks/stubs/spies

    test('model with all properties', () => {
        const {
            sku,
            quantity,
            stock,
            features,
            specifications,
            enableRatings,
            rating,
            enableReviews,
            reviews,
            userReview,
            documentsURL,
        } = fullMock;

        expect(sku).toBe('11223344');
        expect(quantity).toBe(100);
        expect(stock).toBe(99999);
        expect(features).toBe('Some features description');
        expect(specifications).toBe(null);
        expect(enableRatings).toBe(true);
        expect(rating).toBe(4.25);
        expect(enableReviews).toBe(true);
        expect(reviews).toBe([]);
        expect(userReview).toBe(mockUserReview);
        expect(documentsURL).toBe('');
    });

    test('model with partial properties', () => {
        const {
            sku,
            quantity,
            stock,
            features,
            specifications,
            enableRatings,
            rating,
            enableReviews,
            reviews,
            userReview,
            documentsURL,
        } = partialMock;

        expect(sku).toBe('11223344');
        expect(quantity).toBe(null);
        expect(stock).toBe(99999);
        expect(features).toBe('Some features description');
        expect(specifications).toBe(null);
        expect(enableRatings).toBe(false);
        expect(rating).toBe(null);
        expect(enableReviews).toBe(false);
        expect(reviews).toBe([]);
        expect(userReview).toBe(null);
        expect(documentsURL).toBe(null);
    });

    test('properties inherited from CatalogItem', () => {
        const {
            catalogID,
            categoryID,
            classifcation,
            price,
            title,
            description,
        } = fullMock;

        expect(catalogID).toBe('1234567890');
        expect(categoryID).toBe('CI-001');
        expect(classifcation).toBe('TEST');
        expect(price).toBe(99999.99);
        expect(title).toBe('Some Title');
        expect(description).toBe('Some Description');
    });

    test('model w/ no params', () => {
        const {
            sku,
            quantity,
            stock,
            features,
            specifications,
            enableRatings,
            rating,
            enableReviews,
            reviews,
            userReview,
            documentsURL,
        } = new CatalogProduct();

        expect(sku).toBe(null);
        expect(quantity).toBe(null);
        expect(stock).toBe(null);
        expect(features).toBe(null);
        expect(specifications).toBe(null);
        expect(enableRatings).toBe(false);
        expect(rating).toBe(null);
        expect(enableReviews).toBe(false);
        expect(reviews).toBe([]);
        expect(userReview).toBe(null);
        expect(documentsURL).toBe(null);
    });

    test('model w/ another catalog item model', () => {
        const {
            sku,
            quantity,
            stock,
            features,
            specifications,
            enableRatings,
            rating,
            enableReviews,
            reviews,
            userReview,
            documentsURL,
        } = new CatalogProduct(fullMock);

        expect(sku).toBe('11223344');
        expect(quantity).toBe(100);
        expect(stock).toBe(99999);
        expect(features).toBe('Some features description');
        expect(specifications).toBe(null);
        expect(enableRatings).toBe(true);
        expect(rating).toBe(4.25);
        expect(enableReviews).toBe(true);
        expect(reviews).toBe([]);
        expect(userReview).toBe(mockUserReview);
        expect(documentsURL).toBe('');
    });
});
