const fs = require('fs');
const os = require('os');

module.exports = async path => {
	if (os.type() !== 'Windows_NT') throw new Error('Please run on Windows Computers Only!');

	return await fs.mkdirSync(path, { recursive: true });
};
