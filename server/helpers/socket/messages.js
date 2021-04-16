/**Chatroom event handlers*/
module.exports = (io, socket) => {
	socket.on("user typing", (chatId, email) => {
		io.in(chatId).emit("started typing", { email, chatId });
	});
	socket.on("user stopped typing", (chatId, email) => {
		io.in(chatId).emit("stopped typing", { email, chatId });
	});
};
