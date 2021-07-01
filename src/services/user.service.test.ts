import UserService from './user.service';

describe('User Service tests', () => {
    const service = new UserService();

    // TODO - mocks/spies/stubs

    test('API endpoint is correct', () => {
        expect(service.API_URL).toBe('');
    });

    // test('getAccountInfo returns correct response', () => {
    //     const response = service.getAccountInfo('');

    //     expect(response).toBe({});
    // });

    // test('updateAccountInfo returns correct response', () => {
    //     const response = service.updateAccountInfo('');

    //     expect(response).toBe({});
    // });

    // test('deleteAccount returns correct response', () => {
    //     const response = service.deleteAccount('');

    //     expect(response).toBe({});
    // });
});
