const express = require("express");
const router = express.Router();
const lectures = require("../models").Lectures;
const collisionCheck = require("../middlewares/collisionCheck");
router.post("/:id", async function(req, res, next) {
	res.status(200).json({
		message: "done",
	});
});
router.post("/add/:code", collisionCheck, async function(req, res, next) {
	const { code } = req.params;
	console.log(code);
	res.status(200).json({
		message: "done",
	});
});

module.exports = router;
