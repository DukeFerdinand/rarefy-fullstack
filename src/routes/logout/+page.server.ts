import type {RequestEvent} from "@sveltejs/kit";
import {redirect} from "@sveltejs/kit";

export const load = async function ({locals , cookies}: RequestEvent) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    locals.user = undefined;
    cookies.set('rarefy_token', '', {
        path: '/',
        maxAge: 0,
    });
    throw redirect(302, '/login');
}
