import type { LayoutServerLoad } from './$types';

console.log('api server layout!');

export const load: LayoutServerLoad = async ({ request }) => {
	const authHeader = request.headers.get('Authorization');

	console.log('auth', authHeader);
};
