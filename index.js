require('dotenv').config();
const Eris = require('eris');
const bot = new Eris.CommandClient(process.env.BOT_TOKEN, {}, {
	prefix: 't!'
});
const commands = require('./commands');

bot.registerCommand(...commands.init)

bot.connect();