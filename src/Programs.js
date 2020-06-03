const axios = require('axios');

module.exports = async () => {
	if (process.env.NODE_ENV !== 'development') {
		return require('../programs.json');
	} else {
		const { data } = await axios.get(
			'https://raw.githubusercontent.com/lpanjwani/Windows-Downloader/master/programs.json'
		);

		return data;
	}
};
