const db = require("../models/index");
const { Op } = require("sequelize");

/**Creates and returns a message*/
async function createMessage(content, senderEmail, chatId) {
	const createdMessage = await db.Message.create({
		content,
		senderEmail,
		chatId,
	});

	// add for all incase it is a group message
	const userChats = await db.UserChat.findAll({
		where: {
			chatId: chatId,
			userEmail: { [Op.not]: senderEmail },
		},
	});

	if (userChats.length > 0) {
		userChats.forEach(async (userChat) => {
			await userChat.update({
				unread: userChat.unread + 1,
			});
		});
	}

	return createdMessage;
}

module.exports = createMessage;
