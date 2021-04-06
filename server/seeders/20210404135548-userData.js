"use strict";
const config = require("../helpers/getConfig");
const bcrypt = require("bcrypt");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		const hashedPW = await bcrypt.hash(
			"password",
			config.BCRYPT_WORK_FACTOR
		);
		await queryInterface.bulkInsert("Users", [
			{
				email: "joeBlogs@gmail.com",
				username: "Joe Blogs",
				password: hashedPW,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				email: "tom@gmail.com",
				username: "Tom",
				password: hashedPW,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				email: "harry@gmail.com",
				username: "Harry Potter",
				password: hashedPW,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				email: "harrySmith@gmail.com",
				username: "Harry Smith",
				password: hashedPW,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				email: "tonyStart@gmail.com",
				username: "Tony Start",
				password: hashedPW,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				email: "steveRogers@gmail.com",
				username: "Steve Rogers",
				password: hashedPW,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				email: "peterParker@gmail.com",
				username: "Peter Parker",
				password: hashedPW,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				email: "wandaMaximoff@gmail.com",
				username: "Wanda Maximoff",
				password: hashedPW,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				email: "hulk@gmail.com",
				username: "Bruce Banner",
				password: hashedPW,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
		await queryInterface.bulkInsert("Chats", [
			{ id: 1, createdAt: new Date(), updatedAt: new Date() },
			{ id: 2, createdAt: new Date(), updatedAt: new Date() },
			{ id: 3, createdAt: new Date(), updatedAt: new Date() },
		]);
		await queryInterface.bulkInsert("UserChats", [
			{
				userEmail: "joeBlogs@gmail.com",
				chatId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userEmail: "tom@gmail.com",
				chatId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userEmail: "joeBlogs@gmail.com",
				chatId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userEmail: "harry@gmail.com",
				chatId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
		await queryInterface.bulkInsert("Messages", [
			{
				content: "first message",
				senderEmail: "joeBlogs@gmail.com",
				chatId: 1,
				createdAt: new Date(Date.now() - 60 * 60 * 60 * 100),
				updatedAt: new Date(Date.now() - 60 * 60 * 60 * 100),
			},
			{
				content: "second message",
				senderEmail: "joeBlogs@gmail.com",
				chatId: 1,
				createdAt: new Date(Date.now() - 60 * 59 * 60 * 100),
				updatedAt: new Date(Date.now() - 60 * 59 * 60 * 100),
			},
			{
				content: "toms first message",
				senderEmail: "tom@gmail.com",
				chatId: 1,
				createdAt: new Date(Date.now() - 60 * 50 * 60 * 100),
				updatedAt: new Date(Date.now() - 60 * 50 * 60 * 100),
			},
			{
				content: "Joes last message",
				senderEmail: "joeBlogs@gmail.com",
				chatId: 1,
				createdAt: new Date(Date.now() - 60 * 40 * 60 * 100),
				updatedAt: new Date(Date.now() - 60 * 40 * 60 * 100),
			},
			{
				content: "Last chat message",
				senderEmail: "tom@gmail.com",
				chatId: 1,
				createdAt: new Date(Date.now() - 60 * 30 * 60 * 100),
				updatedAt: new Date(Date.now() - 60 * 30 * 60 * 100),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("Messages", null, {});
		await queryInterface.bulkDelete("Chats", null, {});
		await queryInterface.bulkDelete("UserChats", null, {});
		await queryInterface.bulkDelete("Users", null, {});
	},
};
