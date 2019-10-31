require("dotenv").config();
module.exports = {
	development: {
		username: process.env.MYSQL_USER,
		password: process.env.MYSQL_ROOT_PASSWORD,
		database: process.env.MYSQL_DATABASE,
		host: process.env.MYSQL_ROOT_HOST,
		dialect: "mysql",
		operatorsAliases: false,
	},
	test: {
		username: process.env.MYSQL_USER,
		password: process.env.MYSQL_ROOT_PASSWORD,
		database: process.env.MYSQL_DATABASE,
		host: process.env.MYSQL_ROOT_HOST,
		dialect: "mysql",
		operatorsAliases: false,
	},
	production: {
		username: "root",
		password: "password",
		database: "my_database",
		host: "mysql-server",
		dialect: "mysql",
		operatorsAliases: false,
	},
};
