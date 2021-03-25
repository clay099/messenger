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
			this.belongsTo(models.User, { foreignKey: "userEmail" });
			this.belongsTo(models.Chat, { foreignKey: "chatId" });
		}
	}
	UserChat.init(
		{
			userEmail: { type: DataTypes.STRING, primaryKey: true },
			chatId: { type: DataTypes.INTEGER, primaryKey: true },
		},
		{
			sequelize,
			modelName: "UserChat",
		}
	);
	return UserChat;
};
