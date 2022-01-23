const {SlashCommandBuilder} = require('@discordjs/builders');
const {BaseCommandInteraction, MessageEmbed} = require('discord.js');
const { exchangeRates } = require('exchange-rates-api');
const embeds = require('../helpers/simple_embeds.js');
const currencies = require('../currencies.js');
const symbolMap = require('currency-symbol-map/map');
module.exports = {
	info: new SlashCommandBuilder()
		.setName('money_popular')
		.setDescription('Convert money from one currency to multiple different ones!')
		.addNumberOption(o =>
		o.setName('amount')
			.setDescription('The amount of money to convert.')
			.setRequired(true))
		.addStringOption(s =>
		s.setName('currency')
			.setDescription('The currency to convert. Check /money_list to see available currencies.')
			.setRequired(true)),
	convert_to: ['TRY', 'USD', 'RUB', 'EUR', 'GBP', 'KRW', 'INR'],
	/**
	 * @param {BaseCommandInteraction} interaction
	 * @returns {Promise<void>}
	 */
	async callback(interaction)
	{
		const amount = interaction.options.getNumber('amount');
		const base = interaction.options.getString('currency');
		if(!currencies.currencies.has(base)) {
			const errorEmbed = embeds.error('Invalid base currency! Check `/money_list`.')
			await interaction.reply({embeds: [errorEmbed], ephemeral: true});
			return;
		}
		const exchange_rates = await exchangeRates().setApiBaseUrl('https://api.exchangerate.host').latest().base(base).symbols(this.convert_to).fetch();
		const embed = new MessageEmbed();
		embed.setDescription(`**${symbolMap[base]}${amount} ${base} is:**`);
		embed.setColor("GOLD");
		embed.setTimestamp(new Date());
		for(const c of this.convert_to)
		{
			const number = exchange_rates[c] * amount;
			const rounded = +(Math.round(number + "e+" + 2)  + "e-" + 2)
			if(c === base) continue;
			embed.addField(`${c}`, `${symbolMap[c]}${rounded.toString()}`, true)
		}
		await interaction.reply({embeds: [embed]})
	}
};