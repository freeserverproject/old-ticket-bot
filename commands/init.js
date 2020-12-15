const label = 'init';
const { ticketChannel } = require('../config/message');
const Eris = require('eris');

/**
 * 
 * @param {Eris.Message} msg
 * @param {Array<string>} args 
 */
async function generator (msg, args) {
	/**
	 * @type {Eris.Guild}
	 */
	const guild = msg.channel.guild;
	const bot = msg._client;
	const sender = msg.author;
	const channel = await guild.createChannel(ticketChannel.channelName, 0, `Command by ${sender.mention}`);
	const message = await bot.createMessage(channel.id, ticketChannel.createTicketMsg);
	await message.addReaction('📧');

	(await sender.getDMChannel()).createMessage(`\`\`\`JavaScript\n{\n\tmessageID: ${message.id},\n\tchannelID: ${channel.id}\n}\`\`\``);
};

const options = {};

module.exports = [label, generator, options];