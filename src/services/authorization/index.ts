import { buildURLWithQuery } from '@/utils/http/url';

interface QueryParams {
  rememberMe?: boolean;
  redirectPath?: string;
  [key: string]: any;
}

export default class AuthorizationService {
  private static version: string = '1';
  private static endpoint: string = `${process.env.BASE_URL}/login`;

  static async login(username: string, pass: string, query?: QueryParams) {
    const url = buildURLWithQuery(this.endpoint, query);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-version': this.version,
      },
      body: JSON.stringify({ username, password: pass }),
    });

    if (!response.ok) throw new Error('Login failed');

    const data = await response.json();
    return data;
  }
}
