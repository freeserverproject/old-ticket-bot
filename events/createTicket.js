const ids = require('../config/ids');
const { privateChannel, supportChannel } = require('../config/message');
const Eris = require('eris');
const getEmoji = require('../Utils/emoji');

/**
 * create Ticket event
 * @param {Eris.Message} msg 
 * @param {Object} emoji 
 * @param {Eris.Member} reactor
 */
module.exports = async function (msg, emoji, reactor) {
	if (!ids.createTicketMessage.some(
		target => (target.channelID === msg.channel.id && target.messageID === msg.id)
	))	return;
	if (!supportChannel.categories.some(category => (emoji.name == category.emoji))) {
		await this.removeMessageReaction(msg.channel.id, msg.id, getEmoji(emoji), reactor.id);
		return;
	}

	const supportCategory = supportChannel.categories.find(category => (category.emoji == emoji.name))

	this.removeMessageReaction(msg.channel.id, msg.id, getEmoji(emoji), reactor.id);

	const channnelNameFormat = privateChannel.nameFormat
		.replace(/\%user\.id\%/g, reactor.id)
		.replace(/\%user\.name\%/g, reactor.username)
		.replace(/\%user\.nick\%/g, reactor.nick || reactor.username)
		.replace(/\%category\.emoji\%/g, supportCategory.emoji);

	/**
	 * @type {Eris.TextChannel}
	 */
	const channel = await msg.channel.guild.createChannel(channnelNameFormat, 0, {
		parentID: ids.privateChannelCategolyId,
		permissionOverwrites: [
			{
				id: reactor.id,
				type: 1,
				allow: 1024,
				deny: 0
			},{
				id: msg.channel.guild.roles.find(role => role.name == '@everyone').id,
				type: 0,
				allow: 0,
				deny: 1024
			}
		]
	});

	if (ids.notification.channel) {
		this.createMessage(ids.notification.channel, `${channel.mention}\nチケットが発行されました。対応お願いします。\n${ids.notification.mentions.map(m => `<@${m}>`).join(' ')}`);
	}

	const message = await channel.createMessage({
		content: reactor.mention,
		embed: {
			author: {
				name: reactor.username,
				icon_url: reactor.user.avatarURL
			},
			description: `チケットを発行しました。\n対応できる運営がいしだい対応します。\nそれまでに内容を記入してくださると対応時間が短くなります。\nもしチケットを閉じたい場合は\`-close\`と打つとチケットが閉じられます`,
			fields: [
				{
					name: '🌟サポート内容🌟',
					value: supportCategory.emoji + supportCategory.title,
					inline: true
				}
			],
			color: 5946042
		}
	});
}
