"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("UserChats", {
			UserEmail: {
				type: Sequelize.STRING,
				primaryKey: true,
				references: {
					model: "User",
					key: "email",
				},
			},
			ChatId: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				references: {
					model: "Chats",
					key: "id",
				},
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("user-chats");
	},
};
