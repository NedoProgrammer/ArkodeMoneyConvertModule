const chalk = require('chalk');
const bot = require('./bot.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const {Collection} = require("discord.js");

if(process.env.TOKEN === undefined)
{
    console.error(chalk.red("process.env.TOKEN was not set before trying to update application (/) commands!"));
    process.exit(1);
}

if(process.env.CLIENT_ID === undefined)
{
    console.error(chalk.red("process.env.CLIENT_ID was not set before trying to update application (/) commands!"));
    process.exit(1);
}

if(process.env.GUILD_ID === undefined)
    console.error(chalk.red("process.env.GUILD_ID was not set before trying to update application (/) commands!"));

exports.rest = new REST({version: '9'}).setToken(process.env.TOKEN);
exports.refresh = () => {
    (async () => {
        try
        {
            console.log(chalk.yellow('Started refreshing application (/) commands.'));

            const commandsJSON = [];
            for(const command of bot.client.commands.values())
                commandsJSON.push(command.info.toJSON());

            await exports.rest.put(
              Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                {body: commandsJSON}
            );

            console.log(chalk.green('Successfully reloaded application (/) commands.'));
        }
        catch(error)
        {
            console.error(chalk.red(error));
            process.exit(1);
        }
    })();
};