/**
 * @Description: 开发环境配置
 * @Author: chenchen
 * @Date: 2019-08-29 16:55:31
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-05 21:12:20
 */
exports.keys = "chenchen9694"

exports.cluster = {
	listen: {
		port: 7003
	}
}

exports.cors = {
	origin: "*",
	exposeHeaders: "WWW-Authenticate,Server-Authorization,Date",
	maxAge: 100,
	credentials: true,
	allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS",
	allowHeaders: "Content-Type,Authorization,Accept,X-Custom-Header,anonymous"
}

exports.security = {
	csrf: {
		enable: false
	}
}

// sequelize配置
exports.sequelize = {
	dialect: "mysql",
	host: "127.0.0.1",
	port: 3306,
	database: "D_TEST",
	username: "root",
	password: "960904"
}

// redis配置
exports.redis = {
	client: {
		port: 6379,
		host: "127.0.0.1",
		password: "960904",
		db: 0
	}
}

// socketio配置
exports.io = {
	redis: {
		host: "127.0.0.1",
		port: 6379,
		auth_pass: "960904",
		db: 0
	},
	namespace: {
		"/": {
			connectionMiddleware: ["auth"],
			packetMiddleware: ["filter"]
		}
	}
}
