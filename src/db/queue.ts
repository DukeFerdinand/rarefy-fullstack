import Queue from 'bull';
import { createClient } from '@redis/client';
import type { SavedSearch } from '@prisma/client';

import { REDIS_URL } from '$env/static/private';

interface CrawlerJob {
	jobType: 'crawler';
	query: SavedSearch;
}

export const redisClient = createClient({
	url: process.env.REDIS_URL
});

export const crawlerQueue = new Queue<CrawlerJob>('crawler queue', REDIS_URL);
