import edgeChromium from 'chrome-aws-lambda';

const TEST_URL =
	'https://buyee.jp/item/search/query/%E5%B2%A9%E5%B4%8E%E5%AE%8F%E7%BE%8E%20Me%20too/category/22260?translationType=1';

async function testBrower() {
	const browser = await edgeChromium.puppeteer.launch({
		args: edgeChromium.args,
		defaultViewport: edgeChromium.defaultViewport,
		executablePath: await edgeChromium.executablePath,
		headless: true,
		ignoreHTTPSErrors: true
	});

	const page = await browser.newPage();
	await page.goto(TEST_URL);
	const title = await page.title();
	await browser.close();
	return title;
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
