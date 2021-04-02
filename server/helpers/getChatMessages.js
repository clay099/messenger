const db = require("../models/index");

/**Get all messages from a chat */
async function getChatMessages(chatId) {
	return await db.Message.findAll({
		where: { chatId },
		order: [["createdAt", "DESC"]],
	});
}

module.exports = getChatMessages;