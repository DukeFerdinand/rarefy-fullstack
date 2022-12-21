import { dev } from '$app/environment'
import { COOKIE_DOMAIN } from '$env/static/private';

export const CookieOptions = {
    domain: process.env.VERCEL_URL || COOKIE_DOMAIN,
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: true,
    secure: !dev,
    httpOnly: true
}