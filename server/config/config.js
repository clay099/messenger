const fs = require("fs");
require("dotenv").config();

module.exports = {
	development: {
		username: process.env.DB_USERNAME || "root",
		password: process.env.DB_PASSWORD || null,
		database: process.env.DB_NAME || "instant-messenger",
		host: process.env.DB_HOSTNAME || "127.0.0.1",
		dialect: process.env.DIALECT || "postgres",
		BCRYPT_WORK_FACTOR: 1,
		JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "secretKey",
	},
	test: {
		username: process.env.DB_USERNAME || "root",
		password: process.env.DB_PASSWORD || null,
		database: process.env.DB_TEST_NAME || "instant-messenger-test",
		host: process.env.DB_HOSTNAME || "127.0.0.1",
		dialect: process.env.DIALECT || "postgres",
		BCRYPT_WORK_FACTOR: 1,
		JWT_SECRET_KEY: "secretKey",
	},
	production: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOSTNAME,
		dialect: process.env.DIALECT || "postgres",
		BCRYPT_WORK_FACTOR: 12,
		JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
		use_env_variable: "DATABASE_URL",
	},
};
