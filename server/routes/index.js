const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/auth");

router.get("/welcome", authenticateJWT, function (req, res, next) {
	res.status(200).send({ welcomeMessage: "Welcome!" });
});

module.exports = router;
