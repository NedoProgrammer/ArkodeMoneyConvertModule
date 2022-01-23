const {SlashCommandBuilder} = require('@discordjs/builders');
const {BaseCommandInteraction, MessageEmbed} = require('discord.js');
module.exports = {
  info: new SlashCommandBuilder()
      .setName('money_ping')
      .setDescription('See if the bot is online.'),
  /**
   * Check if the bot is online.
   * @param {BaseCommandInteraction} interaction
   * @returns {Promise<void>}
   */
  async callback(interaction)
  {
    const now = Date.now();
    await interaction.reply({content: this.wait_phrases[Math.floor(Math.random() * this.wait_phrases.length)], ephemeral: true});
    const difference = Date.now() - now;
    const embed = new MessageEmbed();
    for(let i = 0; i < this.colors.length; i++)
      if(difference >= 150 * i && difference <= 150 * (i + 1))
        embed.setColor(this.colors[i]);
    embed.setTitle('Ping report');
    embed.setDescription(`
    **${this.phrases[Math.floor(Math.random() * this.phrases.length)]}**
    Message Latency: \`${difference}ms\`
    Client Latency: \`${interaction.client.ws.ping}ms\`
    `);
    await interaction.followUp({embeds: [embed], ephemeral: true});
  },
  colors: ['GREEN', 'ORANGE', 'RED', 'DARK_RED'],
  phrases: ['I\'m here!', 'Beep boop', 'a', 'Don\'t scare me like this!', 'Jesus give me some sleep..'],
  wait_phrases: ['one sec', 'Calculating..', 'uuuh', 'Googling..', 'Generating a random number..', 'uwu', '*elevator music*']
};