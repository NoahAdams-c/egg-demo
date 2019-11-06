/**
 * @Description: 默认配置
 * @Author: chenchen
 * @Date: 2019-08-29 14:59:58
 * @LastEditors: chenchen
 * @LastEditTime: 2019-10-30 14:29:20
 */
exports.keys = "chenchen9694"

exports.cluster = {
	listen: {
		port: "7003"
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

// socketio配置
exports.io = {
	namespace: {
		"/": {
			connectionMiddleware: ["auth"],
			packetMiddleware: ["filter"]
		}
	}
}
