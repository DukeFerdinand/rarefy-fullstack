import type { RequestHandler } from './$types';

import { dbConnection } from '$db/dbConnection';
import { crawlerQueue } from '$db/queue';

enum JobType {
	GetAllSearchResults = 'GetAllSearchResults'
}

interface CronJobConfig {
	jobType: JobType;
}

export const POST: RequestHandler = async function ({ request }) {
	try {
		const body: CronJobConfig = await request.json();

		switch (body.jobType) {
			case JobType.GetAllSearchResults: {
				const prisma = dbConnection();
				const savedSearches = await prisma.savedSearch.findMany();

				const _createResult = await crawlerQueue.addBulk(
					savedSearches.map((search) => {
						return {
							opts: {
								attempts: 3
							},
							data: {
								jobType: 'crawler',
								query: search
							}
						};
					})
				);

				return new Response('Acknowledged');
			}
			default:
				return new Response(`Unexpected job type: ${body.jobType}`);
		}
	} catch (e) {
		const error = e as Error;
		if (error.message.includes('JSON input')) {
			return new Response('Bad JSON body', {
				status: 400
			});
		}

		console.error(e);
		return new Response('Something went wrong', {
			status: 500
		});
	}
};
