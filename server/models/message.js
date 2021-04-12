"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Message extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.User, {
				foreignKey: "senderEmail",
				as: "user",
			});
			this.belongsTo(models.Chat, { foreignKey: "chatId", as: "chat" });
		}
	}
	Message.init(
		{
			content: {
				type: Sequelize.STRING,
			},
			senderEmail: {
				type: Sequelize.STRING,
			},
			chatId: {
				type: Sequelize.STRING,
			},
		},
		{
			sequelize,
			modelName: "Message",
		}
	);
	return Message;
};
