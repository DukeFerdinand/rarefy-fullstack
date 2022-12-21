import type { RequestEvent } from '@sveltejs/kit';
import {formDataToJSON} from "../../lib/utils/formData";

interface FormData {
	email: string;
	password: string;
}

export const actions = {
	default: async function({ locals, request }: RequestEvent) {
		console.log(locals );
		const data = await request.formData()
		const { email, password } = formDataToJSON<FormData>(data);
		console.log(email, password)




		locals.user = { name: 'John' };
	}
};
