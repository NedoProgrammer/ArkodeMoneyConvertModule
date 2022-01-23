const fs = require('fs');
module.exports = {
	checkErrorsFile: function()
	{
		fs.open('errors.json', 'wx', (err, fd) => {
			if (err) {
				return;
			}
			try {
				fs.writeFileSync('errors.json', '[]');
			} finally {
				fs.close(fd, () => {});
			}
		});
	}
};