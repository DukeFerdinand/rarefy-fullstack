import type {RequestHandler} from "@sveltejs/kit";
import {dbConnection} from "../../../db/dbConnection";

export const GET: RequestHandler = async ({request}) => {
	const prisma = dbConnection();

	const data = {
		searches: await prisma.savedSearch.findMany({})
	}

	return new Response(JSON.stringify(data), {
		headers: {
			"Content-Type": 'application/json'
		}
	})
}
