const onlineUsers = require("../../onlineUsers");

/**Auth event handlers */
module.exports = (io, socket) => {
	socket.on("log in", ( callback) => {
		if (socket.user.email) {
			// as we're using a object for onlineUsers there's no need to run a check if the use has already been added as it will overwrite the value if the key already exists;
			onlineUsers[socket.user.email] = socket.id;

			// echo globally (all clients) that a person has connected
			socket.broadcast.emit("user joined", {
				username: socket.user.email,
				onlineUsers: Object.keys(onlineUsers),
			});

			// send list of online users back
			callback({ onlineUsers: Object.keys(onlineUsers) });
		}
	});

	socket.on("reconnect", (callback) => {
		if (socket.user.email) {
			onlineUsers.add(socket.user.email);

			// echo globally (all clients) that a person has connected
			socket.broadcast.emit("user joined", {
				username: socket.user.email,
				onlineUsers: Object.keys(onlineUsers),
			});

			// send list of online users back
			callback({ onlineUsers: Object.keys(onlineUsers) });
		} else {
			callback({ onlineUsers: undefined });
		}
	});

	// when the user disconnects.. perform this
	socket.on("disconnect", () => {
		if (socket.user.email) {
			delete onlineUsers[socket.user.email];
			// echo globally that this client has left
			socket.broadcast.emit("user left", {
				username: socket.username,
				onlineUsers: Object.keys(onlineUsers),
			});
		}
	});

	// when the user logs out
	socket.on("log out", () => {
		if (socket.user.email) {
			delete onlineUsers[socket.user.email];
			// echo globally that this client has left
			socket.broadcast.emit("user left", {
				username: socket.username,
				onlineUsers: Object.keys(onlineUsers),
			});
		}
	});
};
