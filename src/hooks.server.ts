import type { Handle } from '@sveltejs/kit';
import {redirect} from "@sveltejs/kit";
import { sequence } from '@sveltejs/kit/hooks';

import {publicRoutes, routeStartsWithAnyOf} from "$lib/routes";
import {verifyJwt} from "$lib/server/jwt";


const logger: Handle = async ({ event, resolve }) => {
	const start = Date.now();
	const result = await resolve(event);

	console.log(`${event.request.method} [${result.status}] ${event.url.pathname} took ${Date.now() - start}ms`);

	return result;
};

const auth: Handle = async ({ event, resolve }) => {
	const { user } = event.locals;
	const authToken = event.cookies.get('rarefy_token')

	// No auth token, nothing to verify
	if (!authToken) {
		if (!routeStartsWithAnyOf(event.url.pathname, publicRoutes)) {
			throw redirect(302, '/login')
		}
	}

	const decoded = verifyJwt(authToken || '')

	if (!decoded) {
		throw redirect(302, '/login')
	}

	event.locals.user = decoded

	if (!user && !routeStartsWithAnyOf(event.url.pathname, publicRoutes)) {
		throw redirect(302, '/login');
	}

	return resolve(event);
}

export const handle = sequence(logger, auth);
