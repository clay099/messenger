"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const db = require(".");
const config = require("../helpers/getConfig");
const createToken = require("../helpers/createToken");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsToMany(models.Chat, {
				through: models.UserChat,
				foreignKey: "userEmail",
			});
			this.hasMany(models.UserChat, { foreignKey: "userEmail" });
			this.hasMany(models.Message, {
				foreignKey: "senderEmail",
			});
		}

		constructor({ username, email, password }) {
			super();
			this.username = username;
			this.email = email;
			this.password = password;
		}

		async authenticate(password) {
			if ((await bcrypt.compare(password, this.password)) !== true) {
				throw new Error("Invalid email/password");
			}
			let token = createToken(this.email);
			return token;
		}

		/** find a maximum of 20 users not including the current user order by email and username
		 *
		 * Optional to include a searchQuery which will filter results by username or email
		 */
		async getOtherUsers(searchQuery) {
			try {
				searchQuery = searchQuery ? searchQuery : "";
				let users = await User.findAll({
					attributes: ["username", "email"],
					where: {
						email: {
							[Op.not]: this.email,
						},
						[Op.or]: {
							email: {
								[Op.substring]: searchQuery,
							},
							username: { [Op.substring]: searchQuery },
						},
					},
					limit: 20,
					order: ["email", "username"],
				});
				return users;
			} catch (error) {
				console.error({ error });
			}
		}
	}

	User.init(
		{
			username: {
				type: Sequelize.STRING,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				// validations are checks which occur in the sequelize level in pure JS before entering the DB. If the DB needs to also be confined add a constraint
				validate: { isEmail: true },
				primaryKey: true,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: { len: [6, 20] },
			},
		},
		{
			hooks: {
				afterValidate: async (user, options) => {
					const hashedPW = await bcrypt.hash(
						user.password,
						config.BCRYPT_WORK_FACTOR
					);
					user.password = hashedPW;
				},
			},
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
			return user;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	User.login = async function ({ email, password }) {
		try {
			// creates a user. This will run any model validations & throw an error if they fail prior to querying the DB
			const user = await this.findOne({ where: { email } });
			if (!user) throw new Error("Invalid email/password");
			let token = await user.authenticate(password);
			return token;
		} catch (error) {
			throw error;
		}
	};

	// only to be used on routes which have auth middleware as that will provide the verification that our user is genuine
	User.getDetails = async function (email) {
		try {
			const user = await this.findOne({ where: { email } });
			if (!user) throw new Error("User could not be found");
			return user;
		} catch (error) {
			throw error;
		}
	};

	return User;
};
