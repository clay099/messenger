const db = require("../models/index");
const { Op } = require("sequelize");
const getUserChatIds = require("./getUserChatIds");

/**checks if other user already has a chat with loggedIn user*/
async function checkChatExists(userEmail, otherUserEmail) {
	const chatRooms = await getUserChatIds(userEmail);

	if (chatRooms.length > 0) {
		const chatArray = await db.UserChat.findAll({
			where: {
				chatId: { [Op.or]: chatRooms },
				userEmail: otherUserEmail,
			},
		});

		if (chatArray.length > 0) {
			throw new Error("Chat between users has already been created");
		}
	}
}

module.exports = checkChatExists;
