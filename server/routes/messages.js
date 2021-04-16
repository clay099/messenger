const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const db = require("../models/index");
const { authenticateJWT } = require("../middleware/auth");
const checkChatInvolvement = require("../middleware/checkChatInvolvement");
const createMessage = require("../helpers/createMessage");
const getUser = require("../helpers/getUser");

module.exports = (io) => {
	const { newMessage } = require("../helpers/socket/messages")(io);
	/** POST / {message:string} => {id: <integer>, content: <string>, senderEmail: <string>, chatId: <integer>, createdAt: <date>, updatedAt:<date>}[]}
	 *
	 * post a message to chat
	 */
	router.post(
		"/:chatId",
		authenticateJWT,
		checkChatInvolvement,
		async function (req, res, next) {
			try {
				const { message } = req.body;
				if (!message) {
					throw new Error(`Please include message`);
				}
				const createdMessage = await createMessage(
					message,
					req.user.email,
					req.params.chatId
				);
				const user = await getUser(req.user.email);

				// spread the user onto the created message object
				const newMessageData = {
					...createdMessage.dataValues,
					user,
				};

				newMessage(newMessageData);

				return res.status(201).json({
					createdMessage: newMessageData,
				});
			} catch (error) {
				console.error({ error });
				return next(createError(400, error.message));
			}
		}
	);
	return router;
};
