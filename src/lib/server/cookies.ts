import { dev } from '$app/environment'
import { VERCEL_URL } from '$env/static/private';

export const CookieOptions = {
    domain: VERCEL_URL,
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: true,
    secure: !dev,
    httpOnly: true
}