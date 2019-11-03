const express = require("express");
const router = express.Router();
const lectures = require("../models").Lectures;
const { getTimesArray } = require("../util/utils");

router.get("/", async function(req, res, next) {
	const data = await lectures.findAll({ raw: true });
	const times = getTimesArray();
	res.render("index", { lectures: data, times });
});

module.exports = router;
