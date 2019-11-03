const Lectures = require("../models").Lectures;
const { Op } = require("../models/index").Sequelize;
const { isDuplicated } = require("../util/utils");

const collisionCheck = async (req, res, next) => {
	const { code } = req.params;
	const veryLecture = await Lectures.findOne({ where: { code }, raw: true });
	const daysOfWeeks = veryLecture.dayofweek.split("");
	const { start_time, end_time } = veryLecture;
	const positionedLectures = await Lectures.findAll({
		where: {
			isPositioned: true,
			dayofweek: {
				[Op.or]: [
					{ [Op.like]: `%${daysOfWeeks[0]}%` },
					{ [Op.like]: `%${daysOfWeeks[1] || daysOfWeeks[0]}%` },
				],
			},
		},
		raw: true,
	});
	console.log("positionedLectures: ", positionedLectures);
	for await (let positioned of positionedLectures) {
		console.log(
			start_time,
			end_time,
			positioned.start_time,
			positioned.end_time,
		);
		if (
			isDuplicated(
				start_time,
				end_time,
				positioned.start_time,
				positioned.end_time,
			)
		) {
			console.log("duplicated!!");
			return res.status(200).send({
				message: `${veryLecture.lecture}는 ${positioned.lecture}와 겹칩니다.`,
			});
		}
	}
	next();
};

const successfullyAdded = async function(req, res, next) {
	const { code } = req.params;
	const veryLecture = await Lectures.findOne({ where: { code }, raw: true });
	Lectures.update({ isPositioned: 1 }, { where: { code } });
	console.log(veryLecture);
	res.status(200).json({
		message: `${veryLecture.lecture}가 정상적으로 등록되었습니다.`,
	});
};
module.exports = { collisionCheck, successfullyAdded };
