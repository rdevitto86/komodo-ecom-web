import { env } from '$env/dynamic/private';

interface SecretsResponse {
	ENV: string;
	PUBLIC_API_URL: string;
	[key: string]: string;
}

export async function getSecrets(): Promise<SecretsResponse> {
	try {
		return {
			ENV:  env.ENV || 'local',
			PUBLIC_API_URL: env.PUBLIC_API_URL || '',
			AWS_REGION: 'us-east-1',
			AWS_ACCESS_KEY_ID: 'test',
			AWS_SECRET_ACCESS_KEY: 'test'
		};
	} catch (error) {
		console.error('failed to fetch secrets from AWS Secrets Manager:', error);
		throw error;
	}
}
