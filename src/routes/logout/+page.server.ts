import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { getCookieOptions } from '../../lib/server/cookies';

export const load = async function ({ locals, cookies, request }: RequestEvent) {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	locals.user = undefined;

	const cookieOptions = getCookieOptions(new URL(request.url).host, {
		path: '/',
		maxAge: 0
	});
	cookies.set('rarefy_token', '', cookieOptions);

	throw redirect(302, '/login');
};
