import BeeQueue from "bee-queue";

const SCRAPER_QUEUE = 'scraper'

export const jobCreator = new BeeQueue(SCRAPER_QUEUE, {
	// so we don't try to process a job here
	isWorker: false,
})
