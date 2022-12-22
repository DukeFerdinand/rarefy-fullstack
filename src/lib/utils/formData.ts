export function formDataToJSON<T extends object>(formData: FormData): T {
	const obj = {} as T;
	for (const [key, value] of formData) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		obj[key] = value;
	}

	return obj;
}
