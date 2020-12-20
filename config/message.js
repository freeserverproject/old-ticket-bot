module.exports = {
	supportChannel: {
		channelName: 'Support',
		createTicketChannelName: 'create-ticket',
		createTicketMsg: 'こちらからサポートを受けれます。\nそれぞれのリアクションを押してチケットを発行してください',
		color: 5946042,
		categories: [
			{
				emoji: '➕',
				title: '4チャンク以上の保護',
				description: '4チャンク以上の保護には申請が必要です。\n4チャンク以上の保護が必要な場合はこちらから申請をしてください'
			}, {
				emoji: '📣',
				title: '宣伝申請チャンネル',
				description: '鯖内で宣伝をしたいときはこちらからお願いします'
			}, {
				emoji: '🔧',
				title: '許可されてないmodの申請',
				description: '許可されてないmodを使用するためには申請をしてからでないと\nBANの対象になるので必ず申請をしてから使用してください。'
			}, {
				emoji: '🧳',
				title: 'インベントリ回復',
				description: 'バグなどでインベントリが消えたときは、運営がもとにもどすため\nこちらからお願いします。'
			}, {
				emoji: '🚋',
				title: '私鉄建設に関する申請',
				description: '私鉄建設に関する申請はこちらからお願いします。'
			}, {
				emoji: '🇴',
				title: 'その他',
				description: 'その他の申請やサポートが必要な場合はこちらからどうぞ'
			}
		]
	},
	privateChannel: {
		// can you use variables: %user.name% %user.id% %user.nick%
		nameFormat: '%category.emoji%ticket-%user.nick%'
	}
}