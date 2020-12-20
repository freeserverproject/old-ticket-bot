const Eris = require('eris');
const ids = require('../config/ids');
const generateDefaultMessageEmbed = require('../Utils/generateMessageEmbed');

/**
 * create Ticket event
 * @param {Eris.Message} msg 
 * @param {Object} emoji 
 * @param {Eris.Member} reactor
 */
module.exports = function (msg, emoji, reactor) {
	if (!canRunCommandUsers.includes(msg.author.id))
		return;
	if (emoji.name != '🔄')
		return;
	if (!ids.createTicketMessage.some(
		target => (target.channelID === msg.channel.id && target.messageID === msg.id)
	))	return;

	(await this.getMessage(msg.channel.id, msg.id)).edit(generateDefaultMessageEmbed());

	await this.getDMChannel(reactor.id).createMessage('更新が完了しました');
}