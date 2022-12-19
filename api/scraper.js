import playwright from 'playwright-aws-lambda';
import { fork } from 'child_process';

const maxThreads = 10;

const BUYEE_URL = 'https://buyee.jp/item/search/query/{{term}}/category/22260';

/**
 *
 * @param {import('playwright-core').Page} browser
 * @param {string} searchTerm
 * @returns
 */
async function scrapeSearchTerm(page, searchTerm) {
	await page.goto(BUYEE_URL.replace('{{term}}', searchTerm));
	const title = await page.title();
	return title;
}

/**
 *
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const { authorization } = req.headers;

			if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
				const browser = await playwright.launchChromium({
					headless: true,
					timeout: 60 * 1000 // 60 seconds, limit of Vercel functions
				});
				const page = await browser.newPage();

				const body = req.body;
				const titles = [];

				for (const term of body.terms) {
					const title = await scrapeSearchTerm(page, term.term);
					titles.push(title);
				}

				await browser.close();

				res.status(200).json({ success: true, titles });
			} else {
				res.status(401).json({ success: false });
			}
		} catch (err) {
			res.status(500).json({ statusCode: 500, message: err.message });
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
