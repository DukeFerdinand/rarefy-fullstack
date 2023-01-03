import type {RequestHandler} from "./$types";
import type {SavedSearch} from "@prisma/client";


import {dbConnection} from "$db/dbConnection";
import {jobCreator} from "$db/queue";

enum JobType {
	GetAllSearchResults = "GetAllSearchResults"
}

interface CrawlerJob {
	jobType: 'crawler',
	query: SavedSearch,
}

interface CronJobConfig {
	jobType: JobType
}

export const POST: RequestHandler = async function({request}) {
	try {
		const body: CronJobConfig = await request.json()

		switch(body.jobType) {
			case JobType.GetAllSearchResults:{
				const prisma = dbConnection()
				const savedSearches = await prisma.savedSearch.findMany()

				for (const search of savedSearches) {
					const job: CrawlerJob = {
						jobType: 'crawler',
						query: search
					}

					await jobCreator.createJob(job).save()
				}

				return new Response("Acknowledged")
			}
			default:
				return new Response(`Unexpected job type: ${body.jobType}`)
		}
	} catch (e) {
		const error = e as Error
		if (error.message.includes("JSON input")) {
			return new Response("Bad JSON body", {
				status: 400
			})
		}

		console.error(e)
		return new Response("Something went wrong", {
			status: 500
		})
	}
}