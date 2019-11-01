"use strict";
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
module.exports = {
	up: (queryInterface, Sequelize) => {
		const datas = [];
		fs.createReadStream(path.join(__dirname, "../data/courses.csv"))
			.pipe(csv())
			.on("data", (data) => {
				datas.push(data);
			})
			.on("end", () => {
				return queryInterface.bulkInsert("Lectures", datas, {});
			});

		//dummy query to return a promise
		return queryInterface.showAllSchemas();
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Lectures", null, {});
	},
};
