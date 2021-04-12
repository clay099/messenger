const onlineUsers = require("../../onlineUsers");

module.exports = (io, socket) => {
	socket.on("log in", (user, callback) => {
		if (user.email) {
			//store the email in the socket session for this client
			socket.email = user.email;

			// as we're using a set for onlineUsers there's no need to run a check if the use has already been added as it will only add if the user's email is not in the Set & adding is only O(1) time complexity.
			onlineUsers.add(user.email);

			// echo globally (all clients) that a person has connected
			socket.broadcast.emit("user joined", {
				username: socket.email,
				onlineUsers: [...onlineUsers],
			});

			// send list of online users back
			callback({ onlineUsers: [...onlineUsers] });
		}
	});

	// when the user disconnects.. perform this
	socket.on("disconnect", () => {
		if (socket.email) {
			onlineUsers.delete(socket.email);
			// echo globally that this client has left
			socket.broadcast.emit("user left", {
				username: socket.username,
				onlineUsers: [...onlineUsers],
			});
		}
	});
};
