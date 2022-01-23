const {SlashCommandBuilder} = require('@discordjs/builders');
const {BaseCommandInteraction, MessageEmbed} = require('discord.js');
const currencies = require('../currencies.js');
const {convert, exchangeRates} = require('exchange-rates-api');
const embeds = require('../helpers/simple_embeds.js');
module.exports = {
	info: new SlashCommandBuilder()
		.setName('money_convert')
		.setDescription('Convert one currency to another.')
		.addNumberOption(o =>
			o.setName('amount')
			.setDescription('The amount of money to convert.')
			.setRequired(true))
		.addStringOption(s =>
			s.setName('base_currency')
				.setDescription('The base (input) currency to convert.')
				.setRequired(true))
		.addStringOption(s =>
			s.setName('result_currency')
				.setDescription('The result currency.')
				.setRequired(true)),
	/**
	 * @param {BaseCommandInteraction} interaction
	 * @returns {Promise<void>}
	 */
	async callback(interaction)
	{
		const amount = interaction.options.getNumber('amount');
		const base = interaction.options.getString('base_currency');
		const result = interaction.options.getString('result_currency');

		if(!currencies.currencies.has(base) || !currencies.currencies.has(result))
		{
			const error = embeds.error('Entered currencies were invalid! Check `/money_list`.');
			await interaction.reply({embeds: [error], ephemeral: true});
			return;
		}

		const rate = await exchangeRates().setApiBaseUrl('https://api.exchangerate.host').latest().base(base).symbols(result).fetch();
		let converted = amount * rate;
		converted = +(Math.round(converted + "e+" + 2)  + "e-" + 2);
		const embed = new MessageEmbed();
		embed.setColor("GOLD");
		embed.setDescription(`**${amount}** of ${currencies.currencies.get(base)} (${base}) is **${converted}** of ${currencies.currencies.get(result)} (${result})`);
		await interaction.reply({embeds: [embed]});
	}
};