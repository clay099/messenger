const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const { authenticateJWT } = require("../middleware/auth");
const checkChatInvolvement = require("../middleware/checkChatInvolvement");
const getUserChatIds = require("../helpers/getUserChatIds");
const getOtherChatUsers = require("../helpers/getOtherChatUsers");
const checkChatExists = require("../helpers/checkChatExists");
const getUser = require("../helpers/getUser");
const createChatRoom = require("../helpers/createChatRoom");
const getChatMessages = require("../helpers/getChatMessages");

/** GET / {} => {userEmail:<string>, chatId: <integer>, createdAt: <date>, updatedAt:<date>, User: {username: <string>}}[]}
 *
 * gets logged in users associated chats ordered by last created and includes other participant data
 */
router.get("/", authenticateJWT, async function (req, res, next) {
	try {
		const email = req.user.email;
		// data for other users involved with chats user is involved with
		const chatData = await getOtherChatUsers(email);

		return res.json(chatData);
	} catch (error) {
		console.error({ error });
		return next(createError(400, error.message));
	}
});

/** POST / {email:string} => {message: "created chat room <integer>"}
 *
 * create new chat between users
 */
router.post("/", authenticateJWT, async function (req, res, next) {
	try {
		const userEmail = req.user.email;
		// email of other user to connect with
		let { email: otherUserEmail } = req.body;
		if (!otherUserEmail) {
			throw new Error(`Please include email field`);
		}

		// check that other user actually exists in database. It will through an error if not found or return their object
		const otherUser = await getUser(otherUserEmail);
		const user = await getUser(userEmail);

		// throw an error if user chat room already exists
		await checkChatExists(userEmail, otherUserEmail);

		// actually create chat
		const chat = await createChatRoom([user, otherUser]);

		return res
			.status(201)
			.json({ message: `created chat room ${chat.id}` });
	} catch (error) {
		console.error({ error });
		return next(createError(400, error.message));
	}
});

/** GET / {} => {id: <integer>, content: <string>, senderEmail: <string>, chatId: <integer>, createdAt: <date>, updatedAt:<date>}[]}
 *
 * get all messages from a chat
 */
router.get(
	"/:chatId",
	authenticateJWT,
	checkChatInvolvement,
	async function (req, res, next) {
		try {
			const chatMessages = await getChatMessages(req.params.chatId);

			if (chatMessages.length < 1)
				return res.json({
					message: "No messages have been recorded for this chat",
				});

			return res.json({ messages: chatMessages });
		} catch (error) {
			console.error({ error });
			return next(createError(400, error.message));
		}
	}
);

module.exports = router;
