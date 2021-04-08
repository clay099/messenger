"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("UserChats", "unread", {
			type: Sequelize.DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("UserChats", "unread");
	},
};
