/**
 * Validates a URL
 */
export const isValidURL = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Builds a URL
 */
export function buildURL(
  apiPath: string,
  pathParams: Record<string, string | number> = {},
  queryParams: Record<string, any> = {},
  omitBaseUrl = false,
) {
  const prefix = apiPath ? '/' + apiPath.replace(/^\/+|\/+$/g, '') : '';
  let base;

  // build base URL
  if (omitBaseUrl) {
    base = prefix || '/';
  } else {
    const baseUrl = process.env.BASE_API_URL;
    if (!baseUrl) {
      throw new Error('BASE_API_URL environment variable is not defined.');
    }
    base = `${baseUrl.replace(/\/+$/, '')}${prefix}`;
  }

  // appends path params to URL
  const urlWithPaths = Object.entries(pathParams).reduce((url, [key, value]) => {
    if (!value) {
      throw new Error(`Missing path parameter: ${key}`);
    }
    return url.replace(new RegExp(`:${key}\\b`, 'g'), encodeURIComponent(String(value)));
  }, base);

  // throw an error if any path params are missing
  const unresolvedParamMatch = urlWithPaths.match(/\/:([^/]+)/);
  if (unresolvedParamMatch) {
    throw new Error(`Missing path parameter: ${unresolvedParamMatch[1]}`);
  }

  let urlObjOrStr: string | URL = urlWithPaths;

  if (!omitBaseUrl) {
    urlObjOrStr = new URL(urlWithPaths);
  }

  const isRelative = typeof urlObjOrStr === 'string';
  const searchParams = new URLSearchParams();

  // appends query params to URL
  Object.entries(queryParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v != null) searchParams.append(key, String(v));
      });
    } else if (value != null) {
      searchParams.append(key, String(value));
    }
  });

  if (isRelative) {
    return searchParams.toString() ? `${urlWithPaths}?${searchParams.toString()}` : urlWithPaths;
  } else {
    (urlObjOrStr as URL).search = searchParams.toString();
    return (urlObjOrStr as URL).toString();
  }
}
