const {Collection} = require("discord.js");
const fs = require('fs');
const bot = require('./bot.js');
const chalk = require('chalk');

module.exports = {
  importCommands: function()
  {
      if (bot.client === undefined) {
          console.error(chalk.red('Discord client was not initialized! Please require bot.js before calling command_loader.js!'))
          process.exit(1);
      }

      bot.client.commands = new Collection();
      const files = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));
      console.log(`Found ${chalk.green(files.length)} command files.`);

      for (const file of files) {
          const command = require(`../commands/${file}`);
          if (command.info === undefined) {
              console.error(chalk.red(`Command file ${file} did not export info!`));
              process.exit(1);
          } else if (command.callback === undefined) {
              console.error(chalk.red(`Command file ${file} did not export a callback!`));
              process.exit(1);
          }
          bot.client.commands.set(command.info.name, command);
          console.log(`Loaded command ${chalk.green(`\"${command.info.name}\"`)} from ${chalk.yellow(`${file}`)}.`);
      }
  }
};