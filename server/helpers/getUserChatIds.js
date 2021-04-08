const db = require("../models/index");

/** returns an object {<chatId>: <unread>} where then chatID are chats the user is involved with */
async function getUserChatIds(email) {
	const userChat = await db.UserChat.findAll({
		attributes: ["chatId", "unread"],
		where: { userEmail: email },
		group: ["chatId", "unread"],
	});

	const chatRooms = {};
	userChat.forEach((chat) => (chatRooms[chat.chatId] = chat.unread));

	return chatRooms;
}

module.exports = getUserChatIds;
