const db = require("../models/index");
const { Op } = require("sequelize");

/**Creates and returns a message*/
async function createMessage(content, senderEmail, chatId) {
	const createdMessage = await db.Message.create({
		content,
		senderEmail,
		chatId,
	});

	await db.UserChat.increment(
		{ unread: 1 },
		{
			where: {
				chatId: chatId,
				userEmail: { [Op.not]: senderEmail },
			},
		}
	);

	return createdMessage;
}

module.exports = createMessage;
