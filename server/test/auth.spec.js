process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const db = require("../models/index");
const createToken = require("../helpers/createToken");

chai.should();
chai.use(chaiHttp);

describe("/POST /login", () => {
	const user = {
		email: "newTestUserRegister@test.com",
		password: "password",
		username: "newTestUserRegister",
	};

	beforeEach(async () => {
		await db.User.destroy({ truncate: true, cascade: true });
		await db.User.create({ ...user });
	});

	it("it should login a user", (done) => {
		chai.request(app)
			.post(`/login`)
			.send({ ...user })
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.have.eql({
					success: {
						message: "logged in",
						user: {
							username: user.username,
							email: user.email,
						},
					},
				});
				res.should.have.cookie("token");
				done();
			});
	});

	it("it should throw an error if it can't find required fields", (done) => {
		chai.request(app)
			.post(`/login`)
			.send()
			.end((err, res) => {
				res.should.have.status(400);
				res.body.should.have.eql({
					error: {
						message: "Please include all fields: email, password",
					},
				});
				done();
			});
	});

	it("it should throw an error if it can't match the username and password", (done) => {
		chai.request(app)
			.post(`/login`)
			.send({ ...user, password: "fake" })
			.end((err, res) => {
				res.should.have.status(400);
				res.body.should.have.eql({
					error: {
						message: "Invalid email/password",
					},
				});
				done();
			});
	});
});

describe("/POST /loginwithcookies", () => {
	const user = {
		email: "newTestUserRegister@test.com",
		password: "password",
		username: "newTestUserRegister",
	};
	const token = createToken(user.email);

	beforeEach(async () => {
		await db.User.destroy({ truncate: true, cascade: true });
		await db.User.create({ ...user });
	});

	it("it should login a user with token", (done) => {
		chai.request(app)
			.get(`/loginwithcookies`)
			.set("Cookie", `token=${token}`)
			.send({ ...user })
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.have.eql({
					success: {
						message: "logged in",
						user: {
							username: user.username,
							email: user.email,
						},
					},
				});
				done();
			});
	});

	it("it should throw an error if no token is not valid", (done) => {
		chai.request(app)
			.get(`/loginwithcookies`)
			.set("Cookie", `token=${token + "1"}`)
			.send()
			.end((err, res) => {
				res.should.have.status(500);
				res.body.should.have.eql({
					error: {
						message: "invalid signature",
						name: "JsonWebTokenError",
					},
				});
				done();
			});
	});
	it("it should throw an error if no token is provided", (done) => {
		chai.request(app)
			.get(`/loginwithcookies`)
			.send()
			.end((err, res) => {
				res.should.have.status(500);
				res.body.should.have.eql({
					error: {
						message: "jwt must be provided",
						name: "JsonWebTokenError",
					},
				});
				done();
			});
	});
});

describe("/POST /register", () => {
	before(async () => {
		await db.User.destroy({ truncate: true, cascade: true });
	});

	it("it should create a user", (done) => {
		const user = {
			email: "newTestUserRegister@test.com",
			password: "password",
			username: "newTestUserRegister",
		};
		chai.request(app)
			.post(`/register`)
			.send({ ...user })
			.end((err, res) => {
				res.should.have.status(201);
				res.body.should.have.eql({
					success: {
						message: "New user created",
						user: {
							username: user.username,
							email: user.email,
						},
					},
				});
				res.should.have.cookie("token");
				done();
			});
	});

	it("it should throw an error for duplicate user", (done) => {
		const user = {
			email: "newTestUserRegister@test.com",
			password: "password",
			username: "newTestUserRegister",
		};
		chai.request(app)
			.post(`/register`)
			.send({ ...user })
			.end((err, res) => {
				res.should.have.status(400);
				res.body.should.have.eql({
					error: {
						message: "email must be unique",
					},
				});
				done();
			});
	});

	it("it should return an error for missing details", (done) => {
		const user = {};
		chai.request(app)
			.post(`/register`)
			.send({ ...user })
			.end((err, res) => {
				res.should.have.status(400);
				res.body.should.have.eql({
					error: {
						message:
							"Please include all fields: username, email, password",
					},
				});
				done();
			});
	});

	it("it should return an error for short passwords", (done) => {
		const user = {
			email: "newTestUserRegister2@test.com",
			password: "pas",
			username: "newTestUserRegister2",
		};
		chai.request(app)
			.post(`/register`)
			.send({ ...user })
			.end((err, res) => {
				res.should.have.status(400);
				res.body.should.have.eql({
					error: {
						message: "Password is required to be 6 characters long",
					},
				});
				done();
			});
	});
});
