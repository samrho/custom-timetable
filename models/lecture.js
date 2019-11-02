"use strict";
module.exports = (sequelize, DataTypes) => {
	const Lectures = sequelize.define(
		"Lectures",
		{
			code: DataTypes.STRING,
			lecture: DataTypes.STRING,
			professor: DataTypes.STRING,
			location: DataTypes.STRING,
			start_time: DataTypes.STRING,
			end_time: DataTypes.STRING,
			dayofweek: DataTypes.STRING,
			isPositioned: DataTypes.BOOLEAN,
		},
		{
			timestamps: false,
		},
	);

	Lectures.associate = function(models) {
		// associations can be defined here
	};
	return Lectures;
};
