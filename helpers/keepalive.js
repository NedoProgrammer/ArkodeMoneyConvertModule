const express = require('express');
const chalk = require('chalk');
module.exports = {
	startServer: function()
	{
		const app = express();
		const port = 3000;

		app.get('/', (req, res) => {
			res.send(`<div style="text-align: center;"><h1>i dunno what you expect to see here 👀</h1></div>`);
		});

		app.listen(port, () => console.log(chalk.green(`Started server at http://localhost:${port}`)));
	}
};