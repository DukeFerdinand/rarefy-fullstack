import { chromium as playwright } from 'playwright';

async function testBrower() {
	const browser = await playwright.launch();

	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto('https://example.com');
	const pageTitle = await page.title();
	await browser.close();

	return pageTitle;
}

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const { authorization } = req.headers;

			if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
				const title = await testBrower();
				res.status(200).json({ success: true, title });
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
