const getTimesArray = () => {
	const arr = ["09:00", "09:30"];
	for (let i = 10; i < 18; ++i) {
		arr.push(`${i}:00`);
		arr.push(`${i}:30`);
	}
	arr.push("18:00");
	return arr;
};

const isDuplicated = (a_starttime, a_endtime, b_starttime, b_endtime) => {
	const a_start = parseInt(a_starttime);
	const a_end = parseInt(a_endtime);
	const b_start = parseInt(b_starttime);
	const b_end = parseInt(b_endtime);
	if (a_start <= b_start && a_end > b_start && a_end <= b_end) return true;
	if (a_start > b_start && a_start < b_end) return true;
	return false;
};
module.exports = { getTimesArray, isDuplicated };
