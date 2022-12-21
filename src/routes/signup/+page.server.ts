import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

import { dev } from '$app/environment'
import { COOKIE_DOMAIN } from '$env/static/private'
import { formDataToJSON } from '$lib/utils/formData';
import { hashPassword } from '$lib/server/passwords';
import {createJwt} from "$lib/server/jwt";
import {dbConnection} from "$db/dbConnection";


import type { ActionData } from './$types';


interface FormData {
	username: string;
	email: string;
	password: string;
	inviteCode: string;
}

export const actions = {
	default: async function({ locals, request, cookies }: RequestEvent): Promise<ActionData> {
		try {
			const prisma = dbConnection();
			const data = await request.formData()
			const { username, email, password, inviteCode } = formDataToJSON<FormData>(data);

			const invite = await prisma.inviteCode.findUnique({
				where: {
					code: inviteCode
				}
			})

			if (!invite || invite.used) {
				return {
					errorMessage: 'Invalid invite code'
				}
			}

			locals.user = await prisma.user.create({
				data: {
					username: username.trim(),
					email: email.toLowerCase().trim(),
					password: await hashPassword(password),
				},
				select: {
					id: true,
					username: true,
					email: true,
					joined: true,
				}
			})

			const jwt = createJwt(locals.user)

			cookies.set('rarefy_token', jwt, {
				domain: process.env.VERCEL_URL || COOKIE_DOMAIN,
				path: '/',
				maxAge: 60 * 60 * 24 * 30, // 30 days
				sameSite: 'strict',
				secure: !dev,
				httpOnly: true
			})


			// Only set the invite code state to "used" if the user was created successfully
			await prisma.inviteCode.update({
				where: {
					code: inviteCode
				},
				data: {
					used: true
				}
			})

		} catch (e) {
			console.error(e)

			if (e instanceof Error && e.message.includes('Unique constraint failed')) {
				return {
					errorMessage: 'Username or email already in use'
				}
			}

			return {
				errorMessage: 'Something went wrong'
			}
		}

		throw redirect(302, '/app')
	}
};
