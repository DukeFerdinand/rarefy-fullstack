import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

async function testBrower() {
	const browser = await puppeteer.launch({
		args: chromium.args,
		defaultViewport: chromium.defaultViewport,
		executablePath: await chromium.executablePath,
		headless: chromium.headless,
		ignoreHTTPSErrors: true
	});
	const page = await browser.newPage();
	await page.goto('https://example.com');
	const pageTitle = await page.title();
	await browser.close();
}

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const { authorization } = req.headers;

			if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
				await testBrower();
				res.status(200).json({ success: true });
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
