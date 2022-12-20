import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async function (params) {
	const { user } = params.locals;
	return {
		user
	};
};
