const db = require("../models/index");
const { Op } = require("sequelize");

/**Creates a chat room with two users*/
async function createChatRoom(user1, user2) {
	// create chat room
	const chat = await db.Chat.create();
	chat.addUsers([user1, user2]);
	return chat;
}

module.exports = createChatRoom;
