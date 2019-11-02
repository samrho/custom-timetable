"use strict";
module.exports = (sequelize, DataTypes) => {
	const Lectures = sequelize.define(
		"Lectures",
		{
			name: DataTypes.STRING,
			quantity: DataTypes.INTEGER,
			test: DataTypes.INTEGER,
		},
		{},
	);
	Lectures.associate = function(models) {
		// associations can be defined here
	};
	return Lectures;
};
