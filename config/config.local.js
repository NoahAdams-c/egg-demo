/**
 * @Description: 开发环境配置
 * @Author: chenchen
 * @Date: 2019-08-29 16:55:31
 * @LastEditors: chenchen
 * @LastEditTime: 2020-08-08 16:13:15
 */
const database = require("../database/config.json")
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
exports.sequelize = database.development

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
	init: {
		pingTimeout: 10000,
		pingInterval: 500
	},
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
