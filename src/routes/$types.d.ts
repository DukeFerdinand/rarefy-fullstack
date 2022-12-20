import * as Kit from '@sveltejs/kit';

export interface LayoutParams {
	user: Object;
}

export type LayoutServerLoad = Kit.ServerLoad<LayoutParams>;
