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
	const start = Date.now();
	if (req.method === 'POST') {
		try {
			const { authorization } = req.headers;

			if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
				const browser = await playwright.launchChromium({
					headless: true,
					timeout: 60 * 1000 // 60 seconds, limit of Vercel functions
				});
				const page = await browser.newPage();

				console.log(`Browser launched in ${Date.now() - start}ms`);

				const body = req.body;
				const titles = [];

				for (const term of body.terms) {
					const title = await scrapeSearchTerm(page, term.term);
					titles.push(title);

					console.log(`Scraped ${term.term} in ${Date.now() - start}ms`);
				}

				await browser.close();

				console.log(`Browser closed in ${Date.now() - start}ms`);

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

	console.log(`Total scrape time: ${Date.now() - start}ms`);
}
