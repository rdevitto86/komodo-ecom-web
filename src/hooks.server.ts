import { error, type Handle } from '@sveltejs/kit';
import { getSecrets } from '$lib/server/secrets';

let secrets: Record<string, string> | null = null;

export const handle: Handle = async ({ event, resolve }) => {
  try {
    console.log('☁️  Fetching secrets from AWS Secrets Manager');
    secrets = await getSecrets();
    console.log('✅ Secrets loaded successfully');
    event.locals.secrets = secrets;
  } catch (err) {
    console.error('❌ Failed to load secrets:', err);
    error(500, 'Internal Server Configuration Error');
  } finally {
    return await resolve(event);
  }
};
