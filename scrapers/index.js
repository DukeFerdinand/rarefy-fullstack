import express from 'express';

import buyeeHandler from './functions/buyee.js';

if (process.env.NODE_ENV !== 'production') {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	import('dotenv').then((d) => d.config());
}

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello, World!');
});

app.get('/health', (req, res) => {
	res.send({ status: 'UP' });
});

app.post('/buyee', async function (req, res) {
	buyeeHandler(req, res);
});

app.listen(3000, () => {
	console.log('Server listening on port 3000');
});
