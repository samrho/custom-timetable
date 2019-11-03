"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Lectures", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			code: {
				type: Sequelize.STRING,
			},
			lecture: {
				type: Sequelize.STRING,
			},
			professor: {
				type: Sequelize.STRING,
			},
			location: {
				type: Sequelize.STRING,
			},
			start_time: {
				type: Sequelize.STRING,
			},
			end_time: {
				type: Sequelize.STRING,
			},
			dayofweek: {
				type: Sequelize.STRING,
			},
			isPositioned: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			description: {
				type: Sequelize.STRING,
				defaultValue: `본 강의에서는 ABC를 이용한 EFG 기반 프로그래밍 기초 및 응용기술에 대해 학습합니다. 특히 실습 위주의 수업으로 프로그래밍 스킬 향상 및 실무 능력을 갖출 수 있도록 합니다.`,
			},
			memo: {
				type: Sequelize.STRING,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("Lectures");
	},
};
