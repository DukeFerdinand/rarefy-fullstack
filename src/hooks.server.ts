import type { Handle } from '@sveltejs/kit';
import { redirect, error } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { machineRoutes, publicRoutes, routeStartsWithAnyOf } from '$lib/routes';
import { verifyJwt } from '$lib/server/jwt';
import { checkMachineUserToken } from '$lib/server/machineUser';

const logger: Handle = async ({ event, resolve }) => {
	const start = Date.now();
	const result = await resolve(event);

	console.log(
		`${event.request.method} [${result.status}] ${event.url.pathname} took ${Date.now() - start}ms`
	);

	return result;
};

const serverAuth: Handle = async ({ event, resolve }) => {
	// ignore if this is not an affected route
	if (!routeStartsWithAnyOf(event.url.pathname, machineRoutes)) {
		return resolve(event);
	}

	// add auth check here
	const authToken = event.request.headers.get('Authorization');
	const machineUser = await checkMachineUserToken(authToken || '');

	if (!machineUser) {
		throw error(403, 'Unauthorized');
	}

	return resolve(event);
};

const auth: Handle = async ({ event, resolve }) => {
	const authToken = event.cookies.get('rarefy_token');

	// If there's an auth token, try to verify it
	if (authToken) {
		try {
			// Success? Add the user to the locals!
			event.locals.user = verifyJwt(authToken || '');
			return resolve(event);
		} catch (e) {
			// If the JWT is invalid, clear it to avoid an infinite loop and, redirect to the login page
			event.cookies.set('rarefy_token', '', { maxAge: 0 });
			throw redirect(302, '/login');
		}
	} else {
		// If the route is or a machine route, ignore with this handler
		if (routeStartsWithAnyOf(event.url.pathname, [...publicRoutes, ...machineRoutes])) {
			return resolve(event);
		}
		// If there's no JWT, redirect to the login page
		throw redirect(302, '/login');
	}
};

export const handle = sequence(logger, auth, serverAuth);
