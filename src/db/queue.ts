import Queue from 'bull';
import { createClient } from '@redis/client';
import type { User, SavedSearch, SearchResult } from '@prisma/client';

import { REDIS_URL } from '$env/static/private';

interface CrawlerJob {
	jobType: 'crawler';
	query: SavedSearch;
}

export interface NotificationJob {
	jobType: 'notification';
	data: User & {SavedSearch: (SavedSearch & {SearchResult: SearchResult[]})[]};
}

export const redisClient = createClient({
	url: process.env.REDIS_URL
});

export const crawlerQueue = new Queue<CrawlerJob>('crawler queue', REDIS_URL);
export const notificationQueue = new Queue<NotificationJob>('notification queue', REDIS_URL);
