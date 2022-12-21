import {User} from '@prisma/client';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	declare namespace App {
		// interface Error {}
		interface Locals {
			user: Omit<User, 'password' | 'joined'>;
		}
		// interface PageData {}
		// interface Platform {}
	}

}