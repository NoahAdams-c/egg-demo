/**
 * @Description: 默认配置
 * @Author: chenchen
 * @Date: 2019-08-29 14:59:58
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-14 01:42:56
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

exports.middleware = ["errorHandle"]
