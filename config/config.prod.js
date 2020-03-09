/**
 * @Description: 生产环境配置
 * @Author: chenchen
 * @Date: 2019-08-30 11:09:06
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-09 15:27:16
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
	// host: "192.168.1.6",
	host: "192.168.1.219",
	port: 3306,
	database: "D_TEST",
	username: "root",
	password: "960904"
}

// redis配置
exports.redis = {
	client: {
		port: 6379,
		// host: "192.168.1.6",
		host: "192.168.1.219",
		password: "960904",
		db: 0
	}
}

// socketio配置
exports.io = {
	redis: {
		// host: "192.168.1.6",
		host: "192.168.1.219",
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
