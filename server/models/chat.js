"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Chat extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsToMany(models.User, {
				through: models.UserChat,
				foreignKey: "chatId",
			});
			this.hasMany(models.UserChat, { foreignKey: "chatId" });
			this.hasMany(models.Message, {
				foreignKey: "chatId",
			});
		}
	}
	Chat.init(
		{},
		{
			sequelize,
			modelName: "Chat",
		}
	);

	Chat.createChat = async function () {
		try {
			let chat = await this.create();
			return chat;
		} catch (error) {
			console.error({ error });
			throw error;
		}
	};
	return Chat;
};
