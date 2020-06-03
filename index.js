const Prerequisites = require('./src/Prerequisites');
const SelectPrograms = require('./src/Select');
const DownloadFile = require('./src/Download');
const InstallFile = require('./src/Install');

const openLink = require('openurl');

const DownloadDir = 'downloads';

async function Controller() {
	await Prerequisites(DownloadDir);

	const selected = await SelectPrograms();

	await Promise.all(
		selected.map(async item => {
			if (item.download) {
				const path = `${DownloadDir}/${item.path}`;

				console.log(`Downloading ${item.name}`);

				await DownloadFile({
					link: item.download,
					path: path
				});

				console.log(`Installing ${item.name}`);

				await InstallFile(path);

				return path;
			} else {
				openLink.open(item.link);

				return item.link;
			}
		})
	);
}

Controller();
