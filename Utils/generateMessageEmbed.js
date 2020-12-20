const { supportChannel } = require('../config/message');

module.exports = () => {
	return {
		embed: {
			description: supportChannel.createTicketMsg,
			color: 5946042,
			fields: supportChannel.categories.map(category => ({
				name: `__${category.emoji} ${category.title}__`,
				value: category.description
			}))
		}
	}
}