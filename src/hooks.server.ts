import { env } from '$env/dynamic/private';
import { error, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const requiredSecrets = ['ENV'] as const;
  
  for (const secret of requiredSecrets) {
    const value = (env as Record<string, string>)[secret];

    if (!value) {
      console.error(`❌ MISSING SECRET: ${secret} from AWS Secrets Manager`);
      error(500, `Internal Server Configuration Error`);
    }
  }

  return await resolve(event);
};
