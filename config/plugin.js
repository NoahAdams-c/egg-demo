/**
 * @Description: 插件配置
 * @Author: chenchen
 * @Date: 2019-08-29 16:48:28
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-14 01:32:03
 */

// mysql插件
// exports.mysql = {
// 	enable: true,
// 	package: "egg-mysql"
// }

// egg-redis插件
exports.redis = {
	enable: true,
	package: "egg-redis"
}

// sequelize插件
exports.sequelize = {
	enable: true,
	package: "egg-sequelize"
}

// egg-socketio插件
exports.io = {
	enable: true,
	package: "egg-socket.io"
}

exports.cors = {
	enable: true,
	package: "egg-cors"
}
