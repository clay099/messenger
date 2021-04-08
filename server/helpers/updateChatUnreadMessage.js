const db = require("../models/index");

/** updated users unread message count to be data provided */
async function updateChatUnreadMessage(chatId, email, unread) {
	return await db.UserChat.update(
		{
			unread: unread,
		},
		{ where: { chatId: chatId, userEmail: email } }
	);
}

module.exports = updateChatUnreadMessage;
