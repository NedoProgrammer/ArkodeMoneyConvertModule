const {SlashCommandBuilder} = require('@discordjs/builders');
const {BaseCommandInteraction, MessageEmbed} = require('discord.js');
const currencies = require('../currencies.js');
module.exports = {
 info: new SlashCommandBuilder()
	 .setName('money_list')
	 .setDescription('See currencies that you can convert.'),
	/**
	 * @param {BaseCommandInteraction} interaction
	 * @returns {Promise<void>}
	 */
	async callback(interaction)
	{
		let description = "```Here are some currencies that you can convert. To convert the currency, use /money_popular (or /money_convert) with either the short or the long name of the currency.```\n";
		currencies.currencies.forEach((value, key) => {
			description += `• ${value} (**${key}**)\n`;
		});
		const embed = new MessageEmbed();
		embed.setColor("GOLD");
		embed.setTitle("List of currencies");
		embed.setDescription(description);
		await interaction.reply({embeds: [embed], ephemeral: true});
	}
}