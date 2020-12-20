const ids = require('../config/ids');
const { Permissions } = require('eris/lib/Constants');
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

	const member = channel.permissionOverwrites.find(perm => perm.type === 'member');

	await channel.editPermission(member.id, 1024, Permissions.sendMessages, 'member');

	await channel.createMessage('チケットがクローズされました。\n5秒後にアーカイブ化されます。');
	
	setTimeout(async () => {
		await channel.edit({
			parentID: ids.archiveCategory
		});

		await channel.editPermission(member.id, 0, Permissions.sendMessages, 'member');
	}, 5000);
}