const Eris = require('eris');
const path = require('path');
const { supportChannel } = require('../config/message');
const { canRunCommandUsers } = require('../config/ids');

const label = 'init';

/**
 * Command response generator
 * @param {Eris.Message} msg
 * @param {Array<string>} args 
 */
async function generator (msg, args) {
	if (!canRunCommandUsers.includes(msg.author.id))
		return;
	/**
	 * @type {Eris.Guild}
	 */
	const guild = msg.channel.guild;
	const sender = msg.author;
	const cChannel = await guild.createChannel(supportChannel.channelName, 4, {
		reason: `Command by ${sender.mention}`});
	const channel = await guild.createChannel(supportChannel.createTicketChannelName, 0, {
		reason: `Command by ${sender.mention}`,
		parentID: cChannel.id});

	const message = await channel.createMessage({embed: {
		description: supportChannel.createTicketMsg,
		color: 5946042,
		fields: supportChannel.categories.map(category => ({
			name: `__${category.emoji} ${category.title}__`,
			value: category.description
		}))
	}});

	for (const category of supportChannel.categories) {
		await message.addReaction(category.emoji);
	}

	(await sender.getDMChannel()).createMessage(`\`\`\`JavaScript\n{\n\tmessageID: ${message.id},\n\tchannelID: ${channel.id}\n}\`\`\``);
};

const options = {};

module.exports = [label, generator, options];