require('dotenv').config();
const Eris = require('eris');
const bot = new Eris.CommandClient(process.env.BOT_TOKEN, {}, {
	prefix: 't!'
});

const commands = require('./commands');
const events   = require('./events');

bot.on('messageReactionAdd', events.createTicket);
bot.on('messageCreate',      events.closeTicket);

bot.registerCommand(...commands.init);

bot.connect();
