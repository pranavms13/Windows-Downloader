const inquirer = require('inquirer');
const ProgramsList = require('./Programs');

module.exports = async () => {
	const programs = await ProgramsList();

	const list = await Promise.all(programs.map(item => item.name));

	const response = await inquirer.prompt([
		{
			type: 'checkbox',
			message: 'Select Programs',
			name: 'programs',
			choices: [new inquirer.Separator('List'), ...list],
			validate: function (answer) {
				if (answer.length < 1) {
					return 'You must choose at least one program.';
				}

				return true;
			}
		}
	]);

	const selected = await Promise.all(
		programs.filter(progs => response.programs.some(answer => progs.name === answer))
	);

	return selected;
};
