import { dev } from '$app/environment';

interface CookieOverrides {
	path?: string;
	maxAge?: number;
	sameSite?: boolean;
	secure?: boolean;
	httpOnly?: boolean;
}

export function getCookieOptions(cookieHost: string, overrides: CookieOverrides = {}) {
	if (cookieHost.includes(':')) {
		// Assume that the : means a port number
		cookieHost = cookieHost.slice(0, cookieHost.indexOf(':'));
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
