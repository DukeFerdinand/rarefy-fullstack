import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { publicRoutes, routeStartsWithAnyOf } from '$lib/routes';
import { verifyJwt } from '$lib/server/jwt';

const logger: Handle = async ({ event, resolve }) => {
	const start = Date.now();
	const result = await resolve(event);

	console.log(
		`${event.request.method} [${result.status}] ${event.url.pathname} took ${Date.now() - start}ms`
	);

	return result;
};

const auth: Handle = async ({ event, resolve }) => {
	const authToken = event.cookies.get('rarefy_token')

	// If the route is public, don't worry about auth
	if (!authToken && routeStartsWithAnyOf(event.url.pathname, publicRoutes)) {
		return resolve(event)
	}

	// If the route is private, verify the JWT
	if (authToken) {
		try {
			// Success? Add the user to the locals!
			event.locals.user = verifyJwt(authToken || '');
			return resolve(event);
		} catch (e) {
			// If the JWT is invalid, clear it to avoid an infinite loop and, redirect to the login page
			event.cookies.set('rarefy_token', '', {maxAge: 0})
			throw redirect(302, '/login')
		}
	} else {
		// If there's no JWT, redirect to the login page
		throw redirect(302, '/login')
	}
}

export const handle = sequence(logger, auth);
