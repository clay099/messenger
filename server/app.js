const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const { json, urlencoded } = express;

const app = express();

const corsOptions = {
	origin: ["http://localhost:3000"],
	methods: ["GET", "POST", "PATCH"],
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

const io = require("socket.io")({ cors: corsOptions });
app.io = io;

const registerSocketAuth = require("./helpers/socket/auth");
const registerSocketChatRooms = require("./helpers/socket/chatRooms");

//functions with registered event handlers
const onConnection = (socket) => {
	registerSocketAuth(io, socket);
	registerSocketChatRooms(io, socket);
};

const { socketAuth } = require("./middleware/auth");

io.use(socketAuth);
io.on("connection", onConnection);

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const chatRouter = require("./routes/chat")(io);
const MessageRouter = require("./routes/messages")(io);

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", MessageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({ error: err });
});

module.exports = app;
