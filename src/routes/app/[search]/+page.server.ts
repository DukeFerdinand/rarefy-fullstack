import type { ServerLoad } from '@sveltejs/kit';
import { dbConnection } from '$db/dbConnection';

export const load: ServerLoad = async ({ params }) => {
	const prisma = dbConnection();

	return await prisma.savedSearch.findUnique({
		where: {
			id: params.search
		},
		include: {
			SearchResult: true
		}
	});
};
