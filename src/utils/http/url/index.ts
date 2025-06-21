/**
 * Builds a URL string by replacing :params with actual values.
 *
 * @template T - Object type containing path parameter values
 * @param baseURL - The URL string with colon-prefixed params (e.g. /users/:userId)
 * @param params - An object mapping parameter names to values
 * @returns A URL with replaced path parameters
 */
export function buildURLWithPathParams<T extends Record<string, string | number>>(baseURL: string, params: T) {
  return Object.entries(params)
    .reduce((url, [key, value]) => url.replace(new RegExp(`:${key}\\b`, 'g'), encodeURIComponent(String(value))), baseURL);
}

/**
 * Builds a URL string given query params.
 *
 * @template T - Object type containing query parameters
 * @param baseURL - The base URL to append parameters to
 * @param query - An optional object containing query parameters
 * @returns A fully composed URL with query parameters
 */
export function buildURLWithQuery<T extends Record<string, any>>(baseURL: string, query?: T) {
  const queryString = query
    ? new URLSearchParams(Object.entries(query)
      .filter(([, v]) => v != null)
      .map(([k, v]) => [k, String(v)])
    ).toString() : '';
  return queryString ? `${baseURL}?${queryString}` : baseURL;
}
