require('dotenv').config();
const bot = require('./bot/bot.js');
const loader = require('./bot/commands_loader.js');
const refresher = require('./bot/application_commands_helper.js');
const currencies = require('./currencies.js');
const keepalive = require('./helpers/keepalive.js');
const file_helper = require('./helpers/file_helper.js');

file_helper.checkErrorsFile();
currencies.load_currencies();
loader.importCommands();
refresher.refresh();

bot.addEvents();
bot.login();

keepalive.startServer();