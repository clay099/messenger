const db = require("../models/index");
const { Op } = require("sequelize");

/**Creates and returns a message*/
async function createMessage(content, senderEmail, chatId) {
	return await db.Message.create({
		content,
		senderEmail,
		chatId,
	});
}

module.exports = createMessage;
