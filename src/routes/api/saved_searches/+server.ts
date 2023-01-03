import type { RequestHandler } from './$types';

import { dbConnection } from '$db/dbConnection';

// auth is checked higher up
export const GET: RequestHandler = async ({ request }) => {
	try {
		const prisma = dbConnection();
		const data = {
			searches: await prisma.savedSearch.findMany({})
		};

		return new Response(JSON.stringify(data), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (e) {
		console.error(e);
		return new Response('Something went wrong', {
			status: 500
		});
	}
};
