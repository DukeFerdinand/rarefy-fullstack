import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

import { formDataToJSON } from '$lib/utils/formData';
import { comparePassword } from '$lib/server/passwords';
import { createJwt } from '$lib/server/jwt';
import { getCookieOptions } from '$lib/server/cookies';
import { dbConnection } from '$db/dbConnection';

interface FormData {
	email: string;
	password: string;
}

export const actions = {
	default: async function ({ locals, request, cookies }: RequestEvent) {
		try {
			const prisma = dbConnection();
			const data = await request.formData();
			// Turn the iterable into a JSON object
			const { email, password } = formDataToJSON<FormData>(data);

			// Find the user in the database
			const user = await prisma.user.findUnique({
				where: {
					email: email.toLowerCase().trim()
				}
			});

			// If the user doesn't exist, return an error
			// TODO: Consider combining these two if statements
			if (!user) {
				return {
					errorMessage: 'Invalid email or password'
				};
			}

			// Compare the password to the hashed password
			const valid = await comparePassword(password, user.password);

			if (!valid) {
				return {
					errorMessage: 'Invalid email or password'
				};
			}

			// Create a JWT/Add to svelte kit locals
			// Strip the password from the user object in a TS friendly way
			locals.user = {
				id: user.id,
				username: user.username,
				email: user.email,
				joined: user.joined
			};

			const jwt = createJwt(locals.user);
			const cookieOptions = getCookieOptions(new URL(request.url).host);

			cookies.set('rarefy_token', jwt, cookieOptions);
		} catch (e) {
			console.error(e);

			return {
				errorMessage: 'Something went wrong'
			};
		}

		// Redirect to the home page
		throw redirect(302, '/app');
	}
};
