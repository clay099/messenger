"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const db = require(".");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const createError = require("http-errors");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}

		constructor({ username, email, password }) {
			super();
			this.username = username;
			this.email = email;
			this.password = password;
		}
	}
	User.init(
		{
			username: {
				type: Sequelize.STRING,
				primaryKey: true,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				// validations are checks which occur in the sequelize level in pure JS before entering the DB. If the DB needs to also be confined add a constraint
				validate: { isEmail: true },
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: { min: 6 },
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);

	User.register = async function ({ username, email, password }) {
		try {
			// creates a user. This will run any model validations & throw an error if they fail prior to querying the DB
			const user = await this.create({
				email,
				username,
				password,
			});
			return new User(user);
		} catch (error) {
			throw error;
		}
	};

	User.afterValidate(async (user) => {
		console.dir({ user });
		const hashedPW = await bcrypt.hash(
			user.password,
			config.BCRYPT_WORK_FACTOR
		);
		user.password = hashedPW;
	});
	return User;
};
