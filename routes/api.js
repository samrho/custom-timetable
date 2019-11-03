const express = require("express");
const router = express.Router();
const {
	collisionCheck,
	successfullyAdded,
	findLectureByName,
	successfullyRemoved,
} = require("../middlewares/register.middle");

router.post("/add/:code", collisionCheck, successfullyAdded);
router.get("/find/:lecture", findLectureByName);
router.post("/delete/:code", successfullyRemoved);
module.exports = router;
