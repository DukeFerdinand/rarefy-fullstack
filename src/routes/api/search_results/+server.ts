import type { RequestHandler } from './$types';
import { dbConnection } from '$db/dbConnection';

export interface BuyeeSearchResult {
	title: string;
	currentPrice: string;
	startingPrice: string;
	startDate: Date;
	endDate: Date;
	updatedAt: Date;
	url: string;
	bids: number;
	images: string[];
}

interface SearchResults {
	searchId: string;
	results: BuyeeSearchResult[];
}

export const POST: RequestHandler = async function ({ request }) {
	try {
		const contentType = request.headers.get('Content-Type');
		if (!contentType?.startsWith('application/json')) {
			return new Response(
				'Bad content type, expected application/json, received: ' + contentType
			);
		}

		const body: SearchResults = await request.json();

		const prisma = dbConnection();

		for (const result of body.results) {
			//sort through object keys and replace null values with undefined
			for (const key in result) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				if (result[key] === null) {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					result[key] = undefined;
				}
			}

			let buyoutPrice: string | null = null;
			// if result.currentPrice has multiple instances of 'yen', then you can do a buyout
			// the example string has a value of 100 yen and a buyout price of 200 yen
			// 100yen200yen
			if (result.currentPrice && (result.currentPrice.match(/yen/g)?.length || 0) > 1) {
				console.log('buyout price found');
				buyoutPrice = result.currentPrice.split(' yen')[1] + ' yen'
				result.currentPrice = result.currentPrice.split(' yen')[0] + ' yen'
			}

			await prisma.searchResult.upsert({
				where: {
					url: result.url
				},
				update: {
					// most important field
					updatedAt: result.updatedAt,

					currentPrice: result.currentPrice,
					...(buyoutPrice && { buyoutPrice }),
					endDate: result.endDate,
					bids: result.bids || 0,
					images: result.images
				},
				create: {
					...result,
					searchId: body.searchId
				}
			});
		}

		return new Response('OK');
	} catch (e) {
		console.error(e);
		return new Response('Something went wrong', {
			status: 500
		});
	}
};
