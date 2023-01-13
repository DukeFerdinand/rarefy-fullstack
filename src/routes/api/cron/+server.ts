import type { RequestHandler } from './$types';

import { dbConnection } from '$db/dbConnection';
import { crawlerQueue, notificationQueue } from '$db/queue';

enum JobType {
	GetAllSearchResults = 'GetAllSearchResults',
	SendOutNotifications = 'SendOutNotifications'
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

				await crawlerQueue.addBulk(
					savedSearches.map((search) => {
						return {
							opts: {
								attempts: 1
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
			case JobType.SendOutNotifications: {
				const prisma = dbConnection()

				const userWithSearches = await prisma.user.findMany({
					include: {
						SavedSearch: {
							include: {
								SearchResult: {
									where: {
										notified: false
									}
								}
							}
						}
					}
				})

				const usersWithNewSearchResults = userWithSearches.map(user => {
					user.SavedSearch = user.SavedSearch.filter(search => {
						return search.SearchResult.length > 0
					})

					return user
				}).filter(user => user.SavedSearch.length > 0)

				const notifications = usersWithNewSearchResults.map((user) => {
					return {
						data: {
							jobType: 'notification' as const,
							data: user
						}
					}
				})

				await notificationQueue.addBulk(notifications)

				return new Response('Acknowledged');
			}
			default:
				return new Response(`Unexpected job type: ${body.jobType}`, {
					status: 400
				});
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
