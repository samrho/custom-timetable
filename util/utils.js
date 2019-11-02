const getTimesArray = () => {
	const arr = ["09:00", "09:30"];
	for (let i = 10; i < 18; ++i) {
		arr.push(`${i}:00`);
		arr.push(`${i}:30`);
	}
	arr.push("18:00");
	return arr;
};

module.exports = { getTimesArray };
