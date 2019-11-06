/**
 * @Description: 插件配置
 * @Author: chenchen
 * @Date: 2019-08-29 16:48:28
 * @LastEditors: chenchen
 * @LastEditTime: 2019-10-30 14:30:13
 */

// mysql插件
// exports.mysql = {
// 	enable: true,
// 	package: "egg-mysql"
// }

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

// 参数验证插件
exports.validate = {
	enable: true,
	package: "egg-validate"
}

exports.cors = {
	enable: true,
	package: "egg-cors"
}
