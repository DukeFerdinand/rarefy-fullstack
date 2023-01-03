import type { RequestHandler } from './$types';

export const POST: RequestHandler = async function ({ request }) {
	try {
		const contentType = request.headers.get('Content-Type');
		if (!contentType?.startsWith('application/json')) {
			return new Response('Bad content type, expected application/json, received: ' + contentType);
		}

		console.log(await request.json());

		return new Response('OK');
	} catch (e) {
		console.error(e);
		return new Response('Something went wrong', {
			status: 500
		});
	}
};
