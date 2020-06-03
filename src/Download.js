const axios = require('axios');
const fs = require('fs');
const ProgressBar = require('progress');

module.exports = async ({ link, path }) => {
	const { data, headers } = await axios.get(link, {
		responseType: 'stream'
	});

	const progress = new ProgressBar(`-> Downloading [:bar] :percent :etas`, {
		width: 40,
		complete: '=',
		incomplete: ' ',
		renderThrottle: 1,
		total: parseInt(headers['content-length'])
	});

	await new Promise((resolve, reject) => {
		const stream = fs.createWriteStream(path);

		data.on('data', chunk => progress.tick(chunk.length));

		data.pipe(stream);

		stream.on('finish', () => {
			resolve();
		});

		stream.on('error', err => {
			reject(err);
		});
	});
};
