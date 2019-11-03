const Lectures = require("../models").Lectures;
const { Op } = require("../models/index").Sequelize;
const { isDuplicated } = require("../util/utils");

const findLectureByName = async (req, res, next) => {
	const { lecture } = req.params;
	const veryLecture = await Lectures.findOne({ where: { lecture } });
	res.status(200).json({ message: "SUCCESS", data: veryLecture });
};
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

	for await (let positioned of positionedLectures) {
		if (
			isDuplicated(
				start_time,
				end_time,
				positioned.start_time,
				positioned.end_time,
			)
		) {
			return res.status(200).send({
				message: `${veryLecture.lecture}는 ${positioned.lecture}와 겹칩니다.`,
			});
		}
	}
	next();
};

const successfullyAdded = async (req, res, next) => {
	const { code } = req.params;
	const veryLecture = await Lectures.findOne({ where: { code }, raw: true });
	Lectures.update({ isPositioned: 1 }, { where: { code } });
	res.status(200).json({
		OK: true,
		message: `${veryLecture.lecture}가 정상적으로 등록되었습니다.`,
	});
};

const successfullyRemoved = async (req, res, next) => {
	const { code } = req.params;
	Lectures.update({ isPositioned: 0 }, { where: { code } });
	res.status(200).json({
		message: `강의가 정상적으로 삭제되었습니다..`,
	});
};
module.exports = {
	collisionCheck,
	successfullyAdded,
	findLectureByName,
	successfullyRemoved,
};
