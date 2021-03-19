const fs = require("fs");
require("dotenv").config();

module.exports = {
	development: {
		username: process.env.DB_USERNAME || "root",
		password: process.env.DB_PASSWORD || null,
		database: process.env.DB_NAME || "hatchways-messenger",
		host: process.env.DB_HOSTNAME || "127.0.0.1",
		dialect: process.env.DIALECT || "postgres",
	},
	test: {
		username: process.env.DB_USERNAME || "root",
		password: process.env.DB_PASSWORD || null,
		database: process.env.DB_NAME || "hatchways-messenger-test",
		host: process.env.DB_HOSTNAME || "127.0.0.1",
		dialect: process.env.DIALECT || "postgres",
	},
	production: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOSTNAME,
		dialect: process.env.DIALECT || "postgres",
	},
};
