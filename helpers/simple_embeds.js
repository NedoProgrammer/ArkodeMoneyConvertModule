const {MessageEmbed} = require('discord.js');
module.exports = {
  /**
   * @param {string} description
   * @param {string} title
   * @param {string} footer
   * @returns {MessageEmbed}
   */
  createTemplate: function(description, title, footer)
  {
    const result = new MessageEmbed();
    result.setTitle(title);
    result.setDescription(description);
    result.setFooter({text: footer});
    return result;
  },
  error: function(description, title = "Error!", footer = "")
  {
    const embed = this.createTemplate(description, title, footer);
    embed.setColor('DARK_RED');
    return embed;
  },
  warning: function(description, title = "Warning!", footer = "")
  {
    const embed = this.createTemplate(description, title, footer);
    embed.setColor('ORANGE');
    return embed;
  },
  success: function(description, title = "Success!", footer = "")
  {
    const embed = this.createTemplate(description, title, footer);
    embed.setColor('GREEN');
    return embed;
  }
};