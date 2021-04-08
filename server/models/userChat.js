"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class UserChat extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.User, {
				as: "user",
				foreignKey: "userEmail",
			});
			this.belongsTo(models.Chat, { foreignKey: "chatId", as: "chat" });
		}
	}
	UserChat.init(
		{
			userEmail: { type: DataTypes.STRING, primaryKey: true },
			chatId: { type: DataTypes.INTEGER, primaryKey: true },
			unread: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "UserChat",
		}
	);
	return UserChat;
};
