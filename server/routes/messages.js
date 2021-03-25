const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const db = require("../models/index");
const { authenticateJWT } = require("../middleware/auth");
const checkChatInvolvement = require("../middleware/checkChatInvolvement");
const createMessage = require("../helpers/createMessage");

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

			return res.status(201).json({ createdMessage });
		} catch (error) {
			console.error({ error });
			return next(createError(400, error.message));
		}
	}
);

module.exports = router;
