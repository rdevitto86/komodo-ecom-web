import SecurityService from './security.service';

describe('Security Service tests', () => {
    const service = new SecurityService();

    // TODO - mocks/spies/stubs

    test('API endpoint is correct', () => {
        expect(service.API_URL).toBe('');
    });

    // test('login returns correct response', () => {
    //     const response = service.login();

    //     expect(response).toBe({});
    // });

    // test('logout returns correct response', () => {
    //     const response = service.logout();

    //     expect(response).toBe({});
    // });

    // test('valididateSession returns correct response', () => {
    //     const response = service.valididateSession();

    //     expect(response).toBe({});
    // });
});
