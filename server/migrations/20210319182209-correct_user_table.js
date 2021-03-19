"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			username: {
				primaryKey: true,
				type: Sequelize.STRING,
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING,
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
		await queryInterface.dropTable("Users");
	},
};
