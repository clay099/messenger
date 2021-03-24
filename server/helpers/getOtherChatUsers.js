const db = require("../models/index");
const { Op } = require("sequelize");

/**gets the other party of a chat for all chat rooms the user is involved with order by last created
 */
async function getOtherChatUsers(chatRooms, email) {
	return await db.UserChat.findAll({
		where: {
			chatId: { [Op.or]: chatRooms },
			userEmail: { [Op.not]: email },
		},
		include: [
			{
				model: db.User,
				attributes: ["username"],
			},
		],
		order: [["createdAt", "DESC"]],
	});
}

module.exports = getOtherChatUsers;
