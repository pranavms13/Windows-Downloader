const exec = require('child_process');

module.exports = async path => {
	return await new Promise((resolve, reject) => {
		const child = exec.execFile(path);

		child.on('error', err => reject());

		child.on('close', () => resolve());
	});
};
