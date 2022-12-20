import * as Kit from '@sveltejs/kit';

interface LayoutParams {
	user: Object;
}

export type LayoutServerLoad = Kit.ServerLoad<LayoutParams>;
