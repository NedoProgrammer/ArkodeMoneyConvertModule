const fs = require('fs');
const uuid = require('uuid');
const chalk = require('chalk');
module.exports = {
  saveError: async function(error, additionalInformation = {})
  {
      try {
          const id = uuid.v4();
          console.log(`${chalk.red(`Creating new error report (to errors.json, not the database!)`)}\n${chalk.yellow(`Unique ID: ${id}`)}`);
          const fileData = fs.readFileSync('errors.json').toString();
          let json = JSON.parse(fileData);
          json.push({id: id, error: error.message, info: additionalInformation});
          fs.writeFileSync('errors.json', JSON.stringify(json));
          return id;
      }
      catch (e) {
            console.log(chalk.red(`i died ✌️(${e})`))
      }
  }
};