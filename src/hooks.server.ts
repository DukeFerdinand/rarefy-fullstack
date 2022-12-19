import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const logger: Handle = async ({ event, resolve }) => {
	const start = Date.now();
	const result = await resolve(event);

	console.log(`${event.request.method} ${event.url.pathname} took ${Date.now() - start}ms`);

	return result;
};

export const handle = sequence(logger);
