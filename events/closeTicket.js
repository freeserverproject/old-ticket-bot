const ids = require('../config/ids');
const Eris = require('eris');

/**
 * closeTicket
 * @param {Eris.Message} msg 
 */
module.exports = async function (msg) {
	if (msg.content !== '-close') return;
	const channel = msg.channel;
	if (channel.parentID !== ids.privateChannelCategolyId || ids.createTicketMessage.some(
		target => (target.channelID === channel.id)
	)) return;

	await channel.createMessage('チケットがクローズされました。\n5秒後にアーカイブ化されます。');
	
	setTimeout(async () => await channel.edit({
		parentID: ids.archiveCategory
	}), 5000);
}