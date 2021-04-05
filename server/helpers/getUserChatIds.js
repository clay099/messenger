const db = require("../models/index");

/** gets an array filled with the chatId the user is involved with */
async function getUserChatIds(email) {
	const userChat = await db.UserChat.findAll({
		attributes: ["chatId"],
		where: { userEmail: email },
		group: ["chatId"],
	});

	const chatRooms = userChat.map((chat) => chat.chatId);
	return chatRooms;
}

module.exports = getUserChatIds;
