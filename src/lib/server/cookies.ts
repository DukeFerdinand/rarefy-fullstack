import { dev } from '$app/environment';
import { RENDER_EXTERNAL_HOSTNAME	 } from '$env/static/private';

interface CookieOverrides {
	path?: string;
	maxAge?: number;
	sameSite?: boolean;
	secure?: boolean;
	httpOnly?: boolean;
}

export function getCookieOptions(cookieHost: string = RENDER_EXTERNAL_HOSTNAME, overrides: CookieOverrides = {}) {
	if (cookieHost.includes(':')) {
		// Assume that the : means a port number
		cookieHost = cookieHost.slice(0, cookieHost.indexOf(':') + 1);
	}

	return {
		domain: cookieHost,
		path: '/',
		maxAge: 60 * 60 * 24 * 30, // 30 days
		sameSite: true,
		secure: !dev,
		httpOnly: true,
		...overrides
	};
}
