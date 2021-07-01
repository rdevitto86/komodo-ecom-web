import OrderService from './order.service';

describe('Order Service tests', () => {
    const service = new OrderService();

    // TODO - mocks/spies/stubs

    test('API endpoint is correct', () => {
        expect(service.API_URL).toBe('');
    });

    // test('getOrder returns correct response', () => {
    //     const response = service.getOrder('');

    //     expect(response).toBe({});
    // });
});
