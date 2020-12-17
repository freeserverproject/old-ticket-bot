module.exports = function (emoji) {
	return emoji.id == null ? emoji.name : emoji.name+emoji.id;
}