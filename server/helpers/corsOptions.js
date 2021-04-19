const corsOptions = {
	origin: ["http://localhost:3000", "https://messenger-front-end.vercel.app"],
	methods: ["GET", "POST", "PATCH"],
	credentials: true,
};

module.exports = corsOptions;
