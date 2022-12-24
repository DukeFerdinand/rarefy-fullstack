import { dbConnection } from '$db/dbConnection';
import type { LoadFunc } from './$types';
import { verifyJwt } from '../../lib/server/jwt';
import {redirect} from '@sveltejs/kit';
import type {RequestEvent} from '@sveltejs/kit';
import {formDataToJSON} from "../../lib/utils/formData";

// Load

export const load: LoadFunc = async function ({ locals, cookies }) {
	const token = cookies.get('rarefy_token');
	const userId = verifyJwt(token || '').id;

	const prisma = dbConnection();

	const data = await prisma.user.findUnique({
		where: {
			id: userId
		},
		include: {
			SavedSearch: true
		}
	});

	if (!data) {
		throw redirect(302, '/login');
	}

	locals.user = {
		id: data.id,
		username: data.username,
		email: data.email,
		joined: data.joined
	};

	return data;
};

// / Load

// Actions

interface FormData {
	query: string;
	vinylOnly?: string;
}

export const actions = {
	newQuery: async({request, locals}: RequestEvent) => {
		const data = await request.formData()
		const jsonFormData = formDataToJSON<FormData>(data)

		const prisma = dbConnection()
		await prisma.savedSearch.create({
			data: {
				name: '',
				userId: locals.user.id,
				query: jsonFormData.query,
				vinylOnly: Boolean(jsonFormData.vinylOnly),
			}
		})

		return {
			message: `Query ${jsonFormData.query} saved!`
		}
	}
}
