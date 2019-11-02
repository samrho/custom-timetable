const Lectures = require("../models").Lectures;

const collisionCheck = (req, res, next) => {
	// res.status(200).json({
	// 	message: "failure",
	// });
	next();
};

const successfullyAdded = async function(req, res, next) {
	const { code } = req.params;
	const veryLecture = await Lectures.findOne({ where: { code }, raw: true });
	Lectures.update({ isPositioned: 1 }, { where: { code } });
	console.log(veryLecture);
	res.status(200).json({
		message: "done",
	});
};
module.exports = { collisionCheck, successfullyAdded };
