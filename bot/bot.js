const {Client, Intents, Interaction} = require("discord.js");
const embeds = require('../helpers/simple_embeds.js');
const exception_handler = require('../helpers/exception_handler.js');

module.exports = {
  client: new Client({intents: [Intents.FLAGS.GUILDS]}),
  addEvents: function()
  {
      this.client.once('ready', () => {
          console.log('The MoneyConvert module is ready!');
      });

      this.client.on('interactionCreate', async interaction => {
          if(!interaction.isCommand()) return;

          const command = this.client.commands.get(interaction.commandName);
          if(!command) return;

          try
          { await command.callback(interaction); }
          catch(error)
          {
              const id = await exception_handler.saveError(error);
              const embed = embeds.error(`There was an error executing this command!\nWhat we know about the error: \`${error.message}\`\nPlease wait for further messages.`, "Oh no!", `Your unique error ID: ${id}`);
              await interaction.reply({embeds: [embed], ephemeral: true});
          }

      });
  },
    login: function()
    {
        const token = process.env.TOKEN;
        this.client.login(token);
    }
};