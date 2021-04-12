const db = require("../models/index");
const { Op } = require("sequelize");

/**Creates a chat room with two users*/
async function createChatRoom(users) {
	// create chat room
	const chat = await db.Chat.create();
	chat.addUser([...users]);
	return chat;
}

module.exports = createChatRoom;
