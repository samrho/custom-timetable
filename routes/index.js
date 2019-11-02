const express = require("express");
const router = express.Router();
const lectures = require("../models").Lectures;

router.get("/", async function(req, res, next) {
	const data = await lectures.findAll({ raw: true });
	console.log(data);
	res.render("index", { lectures: data });
});

module.exports = router;
