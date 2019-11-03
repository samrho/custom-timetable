const express = require("express");
const router = express.Router();
const {
	collisionCheck,
	successfullyAdded,
} = require("../middlewares/register.middle");

router.post("/add/:code", collisionCheck, successfullyAdded);

module.exports = router;
