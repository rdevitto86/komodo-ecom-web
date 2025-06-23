import { store } from '@/redux/store';
import { APIClient } from '@/services/api/client';
import APIError from '@/models/errors/api/api.model';

export interface LoginPayload {
  defaultUsername: string;
  password: string;
  email?: string;
  phone?: string;
}

export interface LoginResponseBody {
  username: string;
  authToken: string;
  expiration: string;
}

export default class AuthorizationService {
  private static apiName = 'AuthorizationService';
  private static version = 1;

  static async login(data: LoginPayload) {
    let res: LoginResponseBody;

    try {
      if (!this.isValidLoginRequestBody(data)) {
        const validationErr = new APIError('Invalid login payload', this.apiName, data);
        validationErr.status = 400;
        // TODO audit logger
        throw validationErr;
      }

      const res = await store.dispatch(APIClient.endpoints.login.initiate(data)).unwrap();
      return res;
    } catch (err: any) {
      const error = new APIError('Login failed', this.apiName, res, err);
      // TODO runtime logger
      throw error;

    }
  }

  private static isValidLoginRequestBody(body: any): body is LoginPayload {
    return (typeof body === 'object' && body !== null && typeof body.username === 'string' &&
      typeof body.password === 'string' && typeof body.email === 'string' &&
      (body.phone === undefined || typeof body.phone === 'string')
    );
  }
}
