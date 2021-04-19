const corsOptions = {
	origin: [
		"http://localhost:3000",
		"https://laughing-brown-e9e4f0.netlify.app",
	],
	methods: ["GET", "POST", "PATCH"],
	credentials: true,
};

module.exports = corsOptions;
